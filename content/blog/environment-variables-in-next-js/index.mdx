---
title: "Environment Variables in Next.js"
date: "2020-03-06"
description: "A guide to working with Environment Variables in Next.js"
banner: "./banner.png"
---

Often we need to use certain variables like the database path or authentication secrets without committing them to the repo.

Since [Next.js](https://nextjs.org/ "Next.js") uses [Webpack](https://webpack.js.org/ "Webpack") we can use the [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) dependency to load variable from a _.env_ file to our Next.js application.

Let's start by installing dotenv-webpack as a dev dependency.

```shell
npm install dotenv-webpack -D
```

Next we need to modify the Webpack configuration in Next.js. This is done through the _next.config.js_ file.

First import the dotenv-file dependency.

```javascript
const Dotenv = require("dotenv-webpack");
```

Next export the config object with the default Webpack config function.

```javascript
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};
```

All we need to do now is add the dotenv-plugin into the Webpack plugins array.

```javascript
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};
```

Finally the _next.config.js_ should look like this.

```javascript
// next.config.js
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};
```

Now you can use environment variables in the application. For example, if your _.env_ file is like this,

```
AUTH_SECRET=verysecret
```

You can use the variable like this, `process.env.AUTH_SECRET`.

> Never commit the _.env_ file. Add it to the _.gitignore_ file.

## Deploying to [Zeit NOW](https://zeit.co/home)

If you are using a Git provider like Github to deploy the Application in Now, you can't use _.env_ file. This is the reason we set the _silent_ property when adding dotenv-webpack plugin, to prevent any errors because of the missing _.env_ file.

```javascript
config.plugins.push(new Dotenv({ silent: true }));
```

Instead of the _.env_ file we will use the [secrets](https://zeit.co/docs/v2/build-step#using-environment-variables-and-secrets) available in Now.

Once you have downloaded, installed and logged into the [Now CLI](https://zeit.co/download), use the following template to add a new secret.

```shell
now secrets add <secret-name> <secret-value>
```

In our example, we can add the **AUTH_SECRET** like this.

```shell
now secrets add now-auth-secret verysecret
```

Next we need to tell Now to map the _now-auth-secret_ to the **AUTH_SECRET** environment variable. This done through the Now config file, _now.json_. To be make sure the secret is ued properly in both build time and runtime, set both the _env_ and _build_ properties in the _now.json_ file.

```json
{
  "version": 2,
  "env": {
    "AUTH_SECRET": "@now-auth-secret"
  },
  "build": {
    "env": {
      "AUTH_SECRET": "@now-auth-secret"
    }
  }
}
```

## Wrapping up

I hope you found this guide helpful. Please be sure to share it and leave a comment below! 😊
