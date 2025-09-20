---
title: Deploying Node applications in a Centos server (II)
slug: deploying-node-applications-in-a-centos-server-ii
description: >-
  Finishing the CentOS 7 server setup. Securing Nginx with SSL certificates,
  installing Node.js, and setting up automatic service startup.
tags: []
added: 2018-10-13T23:00:00.000Z
---

In the second and final chapter of this journey, we'll see how to secure Nginx and add SSH, install Node and discover how to have our application start automatically even if the server restarts.

In the [first part of this journey](https://alejandronapoles.com/blog/deploying-node-applications-in-a-centos-server-i) of configuring a Centos Server to deploy the blog and other Node applications, we did all the things we needed to do to have the server up and running in a secure way. Among other things, we configured the firewall, SSH and we modified the sshd\_config to disable password authentication, we set up Nginx with the h5bp config as a template for our own configuration. The last things we need to do are:

* Secure Nginx and SSH.
* Install Node.
* Have a service for our application to make it start automatically even if the server restarts.

We should already have in our Nginx server a configuration file for our application. In my case, I created a ghost.conf file, using `example.com` in the h5bp Github page as a template, in which the server, listening in the port 80 and after redirecting everything that comes with www to the url without www, will pass the requests to my internal Ghost server. In this configuration, we're still using http, not https. To make our server use https we first need to get the SSL certificates. The following guide explains how to generate this certificate with no cost (at least for now) with the CA Let's Encrypt: [How To Secure Nginx with Let's Encrypt on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-centos-7).

If you've been following along or used the h5bp configuration you may want to do some things differently:

* There's no need to allow access to `.well-known` creating le-well-known.conf, since it is already allowed if you're including the h5bp's `basic.conf` in your server block (`basic.conf` includes `protect-system-files.conf`).
* Add the root to your server block, in my case is the default one: `root /usr/share/nginx/html`
* After generating the certificates you can add them directly to your server block, as the guide shows, or in the h5bp's `ssl.conf`. I added them to the `ssl.conf` and included the few ssl options that weren't in the file, including the h5bp's `ssl-stapling.conf` to the `ssl.conf` for the ssl stapling.
* I used `ssl.example.conf` in the h5bp repository to modify the application's server block I previously created. The `ssl.example.conf` file includes `ssl.conf`, making your application use the certificates.
* There's no need to create `ssl-redirect.conf`, since (if you used `ssl.example.conf`) we're already redirecting the requests on port 80 to HTTPS on port 443.

You should end up with a configuration like this:

```
#example.conf

server {
  listen [::]:80;
  listen 80;

  server_name example.com www.example.com;

  return 301 https://example.com$request_uri;
}

server {
  listen [::]:443 ssl spdy;
  listen 443 ssl spdy;

  server_name www.example.com;

  include h5bp/directive-only/ssl.conf;

  return 301 https://example.com$request_uri;
}

server {
  listen [::]:443 ssl spdy;
  listen 443 ssl spdy;

  server_name example.com;

  include h5bp/directive-only/ssl.conf;

  root /usr/share/nginx/html;

  charset utf-8;

  error_page 404 /404.html;

  location / {
        proxy_pass http://localhost:YOURPORT;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
   }

  include h5bp/basic.conf;
}

#ssl.conf

ssl_protocols   TLSv1 TLSv1.1 TLSv1.2;

ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';

ssl_prefer_server_ciphers  on;

ssl_dhparam /etc/ssl/certs/dhparam.pem;

ssl_session_cache shared:SSL:10m;

ssl_session_timeout  24h;

ssl_session_tickets off;

keepalive_timeout 300s;

add_header Strict-Transport-Security "max-age=15768000;";

ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

include /etc/nginx/h5bp/directive-only/ssl-stapling.conf;
```

This [Guide to Deploying Diffie-Hellman for TLS](https://weakdh.org/sysadmin.html) shows us how to configure a properly deploy Diffie-Hellman on our server. The values you see on the previous `ssl.conf` (`ssl_ciphers, ssl_prefer_server_ciphers`  and `ssl_dhparam`) are the recommended ones. Another interesting resource is [Mozilla's SSL Generator](https://ssl-config.mozilla.org/). After reading the OpenSSH section in the Diffie-Hellman guide, I wanted to make SSH a little more secure. It seems that:

> Many SSH implementations, including OpenSSH use fixed primes, including the 1024-bit Oakley Group 2.

To fix this, the easier option is to force users to use Curve 25519. We accomplish this by adding the following line to our `sshd\_config` (`/etc/ssh/sshd\_config`) file:

`KexAlgorithms curve25519-sha256@libssh.org`

The current stable version of Putty (beta 0.67) doesn't support that KexAlgorithm, so if you try to connect to your server you'll receive an error. The solution is to use Putty's latest development snapshot, which includes Curve 25519. To verify this in Putty go to SSH->Kex and make sure that the ECDH key exchange policy is in the list. Analyzing your server with the [SSL Server Test](https://www.ssllabs.com/ssltest/) should give you now an A.

## Deploying our application

If you haven't done it yet, move your application to the server, you probably will want to use some version control system like git to do it. If you're using git, install it with `yum install git` and clone your repository to some file. I cloned my web apps to /var/www/, so, for example, the Ghost application would be in /var/www/ghost. This DigitalOcean's guide: [How To Deploy Node.js Applications Using Systemd and Nginx](https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx) has all the information we need to deploy our app. We've already done most of the steps in it. We need to create the user that will have control of our application, install Node.js and add the service, to make sure the app will start even when the server restarts.

### Creating the user

Create the users with `useradd -mrU youruser`. This command will do several things: youruser will be a system user with a home directory (which we need to install node for the user) and a group with the same name (youruser). If you want to add a password to it use:

`passwd youruser`

Then we need to give the user ownership of our app folder with the chown command. For example, to make the Ghost user own the ghost folder we would write: `sudo chown -R ghost:ghost /var/www/ghost/`. Once we've done this, log in as your app user with `su - youruser` and install Node.

### Node.js

Node.js

Installing Node.js was a little more involved than I thought after not having used Linux for a long while, but after a couple of hours of trying different approaches I decided to use [NVM](https://github.com/creationix/nvm), which allows me to have different versions of Node per user, so I can have a specific version for Ghost and newer versions for the rest of my applications. Installing and using NVM is quite simple, follow the instructions on the Github page or use the last section of this DigitalOcean tutorial:

[How To Install Node.js on a CentOS 7 server](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)

The idea is to install Node for each user that needs it, hence each of them will have its own NVM and Node versions installed in its home directory.

### Adding a service for the application

Finally, we need to create a service file in `/etc/systemd/system/`. I created the `ghost.service` file for the Ghost blog, which you can see below:

```
[Service]
ExecStart=/home/ghost/.nvm/v0.10.40/bin/node /var/www/ghost/index.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ghost
User=ghost
Group=ghost
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

In this service, I execute the `index.js` with the 0.10.40 version of node (which I installed using NVM) and pass the production environment. You can also see the ghost user and group. If you want to pass other parameters to your application, add them to the environment, e.g:

`Environment=NODE_ENV=production PORT=19005`

Once the service is enabled, the application should be accessible using the domain we previously configured in Nginx.

***

That's all we need to do to configure our server and deploy our applications. For each application you'd have:

* A user, which owns the application directory, with its own version of Node.
* A configuration file in Nginx with several server blocks, specifying the port Nginx will use to proxy the requests.
* A service file, in which you execute your app with the corresponding version of Node and the environment parameters.
