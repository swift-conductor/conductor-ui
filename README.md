## Notice

> As of **December 13, 2023**, Netflix has discontinued maintenance of Netflix Conductor OSS on GitHub. This is a fork of the [original](https://github.com/Netflix/conductor-ui) project maintained by [Swift Software Group](https://www.swiftsoftwaregroup.com).

## Conductor UI

The UI is a standard `create-react-app` React Single Page Application (SPA). To get started, with Node 14 and `npm` installed, first run `npm install` to retrieve package dependencies. For more information regarding the `create-react-app` configuration and usage, see the official [doc site](https://create-react-app.dev/).

```sh
npm install
```

### Development Server

To run the UI on the bundled development server, run `npm run start`. Navigate your browser to `http://localhost:5000`.

```sh
npm run start
```

#### Reverse Proxy configuration

The default setup expects that the Conductor Server API will be available at `localhost:8080/api`. You may select an alternate port and hostname, or rewrite the API path by editing `setupProxy.js`. Note that `setupProxy.js` is used ONLY by the development server.

### Hosting for Production

There is no need to "build" the project unless you require compiled assets to host on a production web server. In this case, the project can be built with the command `npm run build`. The assets will be produced to `/build`.

```sh
npm run build
```

Your hosting environment should make the Conductor Server API available on the same domain. This avoids complexities regarding cross-origin data fetching. The default path prefix is `/api`. If a different prefix is desired, `src/components/context/DefaultAppContextProvider.jsx` can be modified to customize the API fetch behavior.

#### Different host path

The static UI would work when rendered from any host route. The default is `/`. You can customize this by setting the `homepage` field in `package.json`
Refer https://create-react-app.dev/docs/deployment/#building-for-relative-paths

### Authentication

We recommend that authentication & authorization be de-coupled from the UI and handled at the web server/access gateway.

#### Possible Solutions Include

- Basic Auth (username / password) with `nginx`
- Commercial IAM Vendor
- Node `express` server with `passport.js`
