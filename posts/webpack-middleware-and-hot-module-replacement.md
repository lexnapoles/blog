---
title: Webpack Middleware and Hot Module Replacement
slug: webpack-middleware-and-hot-module-replacement
description: >-
  Improving development experience with Webpack middleware and hot module
  replacement. My setup for avoiding server restarts during development.
tags: []
added: 2018-10-12T23:00:00.000Z
---

*This post is rather old, most likely most of the code shown and libraries are out of date*

Let's make the DevEx easier by not avoiding restarting the server every time we want to see our changes.
Webpack Middleware and Hot Module Replacement

In [the last article](https://alejandronapoles.com/posts/simple-production-environment-with-webpack-and-express), we configured a simple Express server, Webpack and also automated the build. To make the development workflow easier, we can use [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [HMR](https://github.com/glenjamin/webpack-hot-middleware). As it is explained on the webpack-dev-middleware Github's page, this middleware has a few advantages over our initial approach, in which we were executing a script to generate the bundled files with Webpack and then initiate the server:

* No files are written to disk, it handles the files in memory.
* If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling have finished. You don't have to wait before refreshing the page after a file modification.

Moreover, HMR (Hot Module Replacement) will provide the hot reloading functionality, so we don't have to restart the server every time we want to see our changes.

First things first, install both webpack-dev-middleware and HMR:

```
npm i webpack-dev-middleware -D
npm i webpack-hot-middleware -D
```

## Webpack configuration

Since `webpack-dev-middleware` handles the files in memory, there's no need to configure a specific path, use any path you deem appropriate. The only option required by the middleware is `publicPath`, which will be the root "/". In the webpack.config.js, we'll add `publicPath` to the output, that way we can reference it in the middleware later.

```
output: {
  path: DIST_DIR,
  publicPath: "/",
  filename: "bundle.js"
},
```

## Adding webpack-dev-middleware

In the server file we'll need to pass the webpack configuration to the middleware and then tell Express to use it:

```javascript
import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import * as config from "./webpack.config.js";

const app = express();
const DIST_DIR = path.join(__dirname, "dist");
const PORT = 3000;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get("*", (req, res, next) => {
  const filename = path.join(DIST_DIR, "index.html");

  compiler
    .outputFileSystem
    .readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
});

app.listen(PORT);
```

`webpack(config)` will create a compiler object that we'll pass to the middleware, as well as an options object, in which we refer to the publicPath of our webpack configuration. Then, we have to tell Express to send the index.html file to the user. The problem here is that if we would've used something like:

```javascript
app.get("*", (req, res) => {
	res.sendFile(path.join(DIST_DIR, "index.html"));
});
```

The index.html file wouldn't have been found, since it is not in the DIST\_DIR folder anymore, **because webpack-dev-server handles the files in memory, not in disk**.

I looked into this problem quite a bit since I myself have stumbled upon it. I found some information about it on the [HTML Webpack Plugin Github's page](https://github.com/ampedandwired/html-webpack-plugin/issues/145), and on [here as well](https://github.com/webpack/webpack/issues/728). The solution, from what I can gather from reading those links, is to manually tell Webpack to read the file and send it with the response.

We only need to start the server using a script similar to the one below:

```json
"scripts": {
	"start": "babel-node server.js"
}
```

## Hot Module Replacement

Now that the dev middleware is integrated, adding HMR is pretty straightforward. Looking at the [documentation](https://github.com/glenjamin/webpack-hot-middleware), you'll need to modify the webpack.config.js file, adding the webpack-hot-middleware to the entry file and the plugins, leaving the rest of the configuration as it was before:

```javascript
module.exports = {

  context: //...,

  entry: ["webpack-hot-middleware/client", "./main"],

  output: {
    //...
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
```

Then, as we did with the middleware, we'll tell Express to use it:

```javascript
import webpackHotMiddleware from "webpack-hot-middleware";

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res, next) =>
	//...
);
```

If you start the server now and try to change something in the entry file, e.g. changing some element on the DOM, you'll see the browser doesn't refresh automatically. That's because the HMR will only reload the files that you accept, straight from the [documentation](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html):

> A module can only be updated if you “accept” it. So you need to module.hot.accept the module in the parents or the parents of the parents. For example, a router or a subview would be a good place.

Therefore, you will need to accept the reloading in the entry point (main.js):

```javascript
if (module.hot) {
 module.hot.accept();
}
```

Now, if you try to change again something in the entry point, the browser should reload automatically.

## Bonus: Refactoring the Webpack configuration

After modifying the Webpack config file to integrate HMR and webpack-dev-middleware the config is bloated (if you use loaders and plugins) and if a production config is written in the future, we'll end up creating another file, probably repeating the same code. To allow the Webpack configuration to adapt to our needs, it could be a good idea to have a base file with all the general configuration: entry points, output, plugins, loaders… and to create other config files extending or modifying the base one. In our case, we only require the base and the dev config, with the latter including the HMR plugins and the public path.

Since the config file we've written in this article is not too big, I will show you a more complete base config, with some common loaders:

```javascript
var path = require("path");

const DIST_DIR = path.join(__dirname, "dist");
const CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
  context: CLIENT_DIR,

  entry: "./main",

  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },

  devtool: "inline-source-map",

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!autoprefixer-loader"
      },

      {
        test: /\.(png|jpg|ttf|eot)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=10000"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
```

With this base config file you can create another one called webpack.dev.config.js to include the webpack-dev-middleware and HMR configuration:

```javascript
const webpack = require("webpack");
const baseConfig = require("./webpack.base.config.js");

baseConfig.entry = [
  "webpack-hot-middleware/client",
  "./main"
];

baseConfig.output.publicPath = "/";

baseConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

module.exports = baseConfig;
```

Finally, don't forget to import the correct config file into the server as well.
