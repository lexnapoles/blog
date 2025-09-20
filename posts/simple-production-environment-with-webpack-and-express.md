---
title: Simple production environment with Webpack and Express
slug: simple-production-environment-with-webpack-and-express
description: Setting up a production build with Webpack and Express.
tags: []
added: 2016-03-12T00:00:00.000Z
---

*This post is rather old, most likely some or most of the code shown and libraries are out of date*

Programming in development mode gives us a lot of helpful features, like hot reloading. At the same time, it consumes much more memory and space, the application is not optimized. The final product will be downloaded and executed in the browser, which has limited resources. If our app is not optimized, e.g. the app is slow to respond, it takes too many seconds to load… we’ll give a bad user experience and probably lose the user. How many times we’ve closed a web page to never come back because it makes us wait a few seconds too many?

Let’s create a simple production environment, continuing from one of my previous post: Webpack Middleware and Hot Module Replacement.

The goals in this post are:

* Configure the server to use Webpack Middleware and HMR for development and just Express in production.
* Create scripts that allow us to automatically build the project for production.

## Configuring the Node server

Remembering how we deployed a Node application in CentOS , it’s clear the CentOS server (or any other server you have) will start the program in production. At the same time, we need to have a way to run our development environment. To accomplish this is we have [environment variables](https://en.wikipedia.org/wiki/Environment_variable), which will allow us to tell our node server to run in production or development, as well as in what port and some other important things (for example, confidential data, like API keys, should not be saved inside the program, pass them as environmental variables instead).

Node.js provides the [process.env property](https://nodejs.org/api/process.html#process_process_env) that returns an object with the node environmental variables. This property has a NODE\_ENV variable, which is the one used to specify the environment.

```javascript
const isDevelopment = process.env.NODE_ENV !== "production";

// or with Express

const isDevelopment  = app.get('env') !== "production";  
```

Since we’re already reading the variables, let’s set the port too. If there’s one specified we’ll use that, otherwise, we’ll set a default one:

```javascript
const DEFAULT_PORT = 3000;

app.set("port", process.env.PORT || DEFAULT_PORT); 
```

Once the environment is determined, the server can be run in different ways. We already know how to run it for development. For production, Express will serve the static files from the distribution directory Webpack creates, and to respond to any GET HTTP method with index.html, which gives control to the client application. Below is the complete file:

```javascript
//server.js

import path from "path";  
import express from "express";  
import webpack from "webpack";  
import webpackDevMiddleware from "webpack-dev-middleware";  
import webpackHotMiddleware from "webpack-hot-middleware";  
import * as config from "./webpack.dev.config.js";

const app           = express(),  
      DIST_DIR      = path.join(__dirname, "dist"),
      HTML_FILE     = path.join(DIST_DIR, "index.html"),
      isDevelopment = process.env.NODE_ENV !== "production",
      DEFAULT_PORT  = 3000,
      compiler      = webpack(config);

app.set("port", process.env.PORT || DEFAULT_PORT);

if (isDevelopment) {  
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    app.get("*", (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}

else {  
    app.use(express.static(DIST_DIR));

    app.get("*", (req, res) => res.sendFile(HTML_FILE));
}

app.listen(app.get("port"));
```

Running the server in production not only means Express will serve from the distribution file and pass `index.html`, but it also tells Express to apply [optimizations on its own](https://expressjs.com/en/advanced/best-practice-performance.html).

## The build scripts

### Server

In the Webpack Middleware and Hot Module Replacement article we had just one script:

```json
"scripts": {
    "start": "babel-node server.js"
}
```

Since at the time of writing Node.js doesn’t support ES6 modules, I’m using babel-node of the Babel’s CLI for development.

```
[babel-node] works exactly the same as Node.js’s CLI, only it will compile ES6 code before running it.
```

For production, the files have to be transpiled beforehand. In order to do that we’ll write a new script in package.json:

```json
"scripts": {
    "start": "babel-node server.js"
    "build:server": "babel server-es6.js --out-file server.js"
}
```

I renamed the previous server.js to server-es6.js, to imply that the server is written in ES6 and we have the intention to transpile it.

This new script, `build:server`, use Babel to transpile server-es6.js and write the output in a server.js file. In this case, the server-es6 and package.json are in the same directory.

### Client

Hot reloading won’t be necessary in production. The client files need to be bundled and [minified](https://en.wikipedia.org/wiki/Minification_\(programming\)). Other optimizations can also be applied.

If you remember the Webpack Middleware and Hot Module Replacement article, we extracted the base webpack configuration from the development one. Let’s do the same for the production configuration, which in this case will be minimal, since we’ll only change the source map to a production-ready one: [cheap-module-source-map](https://webpack.github.io/docs/configuration.html#devtool).

```
//webpack.prod.config.js

var baseConfig = require("./webpack.base.config.js");

baseConfig.devtool = "cheap-module-source-map";

module.exports = baseConfig;  

Now it’s time to create the client script:

"script": {
    "start": "babel-node server-es6.js"
    "build:server": "babel server-es6.js --out-file server.js"
    "build:client": "webpack -p --config webpack.prod.config.js --progress"
}
```

`build:client` executes Webpack with several options:

* `--config webpack.prod.config.js`: the production configuration Webpack will use.
* `-p`: the production shortcut, which will minify our files. We could’ve also used --optimize-minimize with the same result.
* `--progress`: this option displays a compilation progress.

You may have noticed that even with these new scripts we’re not yet saying anywhere that we want the production environment when building. In fact, since Webpack has the `-p` option, the files will be minified, but the libraries could still be in development mode, which means we’re minifying a copy of the libraries’ development build, instead of the faster production ones. For example, React yields this warning when running the application:

```
    Warning: It looks like you're using a minified copy of the
    development build of React.

    When deploying React apps to production, make sure to use the
    production build which skips development warnings and is faster.
```

There are several ways to solve this, we could add a custom plugin in Webpack to pass the production environment to the client files:

```javascript
//webpack.prod.config.js

var baseConfig = require("./webpack.base.config.js");

baseConfig.devtool = "cheap-module-source-map";

baseConfig.plugins = [  
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
];
```

Or we could use the [EnvironmentPlugin](https://github.com/webpack/docs/wiki/list-of-plugins#environmentplugin), which allows us to reference environment variables through process.env. I rather use this plugin, since I want the npm scripts to be the ones to define the environment, not Webpack. Also, implementing this plugin is a bit simpler than adding a custom one.

To configure it, we’ll add it to the base config, this way the environment is present in all configurations:

```javascript
//webpack.base.config.js

    var webpack = require("webpack");

    //…

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
```

Now, we can finally pass the production variable modifying the scripts:

```json
"script": {
    "start": "babel-node server-es6.js"
    "build:server": "babel server-es6.js --out-file server.js"
    "build:client": "NODE_ENV=production webpack -p --config webpack.prod.config.js --progress"
}
```

Now when we build the client files we have the libraries’ production build.

You may have noticed we’re not adding `NODE_ENV=production` to `build:server`, that’s because our CentOS server will be the one executing server.js (we can run it locally with `NODE_ENV=production node server.js` in the console).

### Automating the production build

There’s just one problem with the previous scripts: `build:client` is not cross-compatible. Using `NODE_ENV=production` works in Unix systems, but not in Windows. Although there are several ways to tackle this, one of the simplest is to use [better-npm-run](https://github.com/benoror/better-npm-run) or some similar libraries like [cross-env](https://github.com/kentcdodds/cross-env) that allow us to pass environment variables in a cross-compatible way. For this article, we’ll use the former:

```json
//package.json

 "scripts": {
    "start": "babel-node server-es6.js",
    "build:server": "babel server-es6.js --out-file server.js",
    "build:client": "webpack -p --config webpack.prod.config.js --progress",
    "build": "better-npm-run build"
  },

  "betterScripts": {
    "build": {
      "command": "npm run build:server && npm run build:client",
      "env": {
        "NODE_ENV": "production"
      }
    }
  },

  //…
```

We’re creating an additional build script, to automate the production build, instead of having to call `build:server` and `build:client` individually. Notice the `NODE_ENV production` variable being passed.

Additionally, it’s not a bad idea to delete the generated files (files inside the dist directory and server.js) every time we build the project for production. A new script: clean, will accomplish this using [rimraf](https://github.com/isaacs/rimraf):

```json
//package.json

 "scripts": {
    "start": "babel-node server-es6.js",
    "build:server": "babel server-es6.js -o server.js",
    "build:client": "webpack -p --config webpack.prod.config.js --progress",
    "build": "better-npm-run build",
    "clean": "rimraf dist/* && rimraf server.js"
  },
  "betterScripts": {
    "build": {
      "command": "npm run clean && npm run build:server && npm run build:client",
      "env": {
        "NODE_ENV": "production"
      }
    }
  },

  //…
```

And that’s it, we have an automated production environment. But, wouldn’t be nice if the first time we install the project with npm install, we could have the production files ready? If you want this, use the [postinstall](https://docs.npmjs.com/misc/scripts) npm script. As the name suggests, npm will automatically execute `postinstall` after `npm install`. These are the final scripts in package.json:

```json
"scripts": {
    "postinstall": "npm run build",
    "start": "babel-node server-es6.js",
    "build:server": "babel server-es6.js -o server.js",
    "build:client": "webpack -p --config webpack.prod.config.js --progress",
    "build": "better-npm-run build",
    "clean": "rimraf dist/* && rimraf server.js"
  },

  "betterScripts": {
    "build": {
      "command": "npm run clean && npm run build:server && npm run build:client",
      "env": {
        "NODE_ENV": "production"
      }
    }
  },

  //…
```
