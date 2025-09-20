---
title: Deploying Node applications in a Centos server (I)
slug: deploying-node-applications-in-a-centos-server-i
description: >-
  Learning to deploy Node.js apps on CentOS 7. My experience with DigitalOcean
  server setup, basic security configuration, and Nginx reverse proxy setup.
tags: []
added: 2018-10-13T23:00:00.000Z
---

For a while, I've been wanting to brush Linux up. In this article, I get a cloud server and learn how to deploy a Node application from scratch.

Last week I was going to deploy, in Heroku, an application I started building a couple of weeks ago for the purpose of learning. After a while I realized the trial for this blog was about to expire and that I was going to need someplace to host my applications, that's when the idea of using a server in the cloud appeared on my mind. On top of that, I've been wanting to brush Linux up, it has been a while since I've used it, so I had the perfect excuse. After doing some research DigitalOcean was the winner, the web interface and configuring and maintaining the servers seem quite simple and intuitive (and, after all, you'll be using the console more than the web interface), the most basic server is quite cheap, perfect to play a bit with it and have some services running, and the community provides you with lots of good tutorials that I myself used to set up the server. I decided to install Centos 7.2 just to try it since I've never used this distro before.

## Basic configuration

The first step is to update the system with yum -y update, then I followed these tutorials:

* [Initial Server Setup with Centos 7](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-centos-7)
* [Additional recommended steps for Centos 7](https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-centos-7-servers)
* [How to create SSH keys with putty](https://www.digitalocean.com/community/tutorials/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps)

These three go through the most essential configuration, especially creating a user in the wheel group, disabling the root account, setting a basic firewall and accessing the server with SSH keys (if you're on Windows use the last tutorial to create the keys and set a profile in Putty). Also, basic information on how to create, delete users can be found here: [How to add and delete users on a Centos 7 Server](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-a-centos-7-server).

This server will potentially host several node apps, and each one will have its own user with full rights to the app directory. I wanted to disallow login to the server using passwords (since we already access with our key) and block access from the outside to the app users. To do this, we need to make sure that in our /etc/ssh/sshd\_config file we have:

`PasswordAuthentication noChallengeResponseAuthentication no`

Effectively disabling password authentication. Finally, to apply the change, restart the sshd daemon with: `systemctl restart sshd.service`.

## Configuring Nginx

Once we have this basic configuration, it's time to install a web server. Nginx seems to be a really used, popular and good web server, so I decided to go with it. Nginx can also act as a reverse proxy server, which is what we need here to have several applications running at the same time, it will proxy the requests to the applications' ports. I would recommend, if you don't have experience with Nginx and even if you do, to back up the Nginx directory and/or use a version control system like Git, so you can go back to a good state at any time. To install and configure the webserver I followed these guides:

* [How To Install Nginx on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7)
* [How to configure the Nginx server on a Virtual Private Server](https://www.digitalocean.com/community/tutorials/how-to-configure-the-nginx-web-server-on-a-virtual-private-server)
* [Nginx official docs](http://nginx.org/en/docs/) (especially Beginner's Guide)

If you have installed it following the first tutorial and read the other two guides, you should have an idea of how to configure Nginx, but I was still a little confused about what the best way to configure it was, and reading the server-configs-nginx in the h5bp Github's page showed me the light. The first thing to do after installing Nginx, if you're using Centos, is to create two directories: sites-available and sites-enabled. This is a really useful convention from Apache. Its purpose is to have the specific application configuration in sites-available and make a symbolic link to the conf file in sites-enabled, that way it's easier to enable and disable configurations, just create or delete the symbolic link. Of course, to make Nginx read this configuration in sites-enabled you'll need to modify nginx.conf to include those files with something like:

`include /etc/nginx/sites-enabled/*.conf`

Looking at the nginx.conf of the `server-configs-nginx` page you can see that it's best to have the general configuration (with no server block at all) in there and include the application's config from sites-enabled, that way you can have a clean and neat configuration. I really recommend taking a look at the repository and using those files as a template, it helped me a lot to understand how to configure Nginx.
Reverse proxy with Nginx

If you have used the `server-configs-nginx` files, you should have a well organized Nginx configuration. Now to make the webserver proxy the requests to your application's server, you would need to add to your application config file in sites-enabled something like the following (I'm guessing you already have seen the example in the repository, so I'm not including the rest of the options, like server\_name or the port):

```
location / {
  proxy_pass http://localhost:2368;
  proxy_set_header Host $host;
  proxy_set_header X - Forwarded - For $proxy_add_x_forwarded_for;
}
```

The most important part of this is the `proxy_pass directive`, with it we're saying Nginx to redirect the requests to the 2368 port, where our application is listening. The rest of the directives are not as important as proxy\_pass, you can read about them at the Nginx Reverse Proxy official docs to know more and configure them as you want.

* `proxy_set_header Host $host;`. With this directive, we're saying to Nginx to use the server name ($host) in the Host request header.
* `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`. This appends the IP address of the remote user to the header. Don't forget to make a symlink in sites-enabled to the app's conf file in sites-available.

In the next post, we'll secure the Nginx server using an SSL certificate and finally deploy the Node application.
