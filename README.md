# Rawlog Web UI

The backend of the app is part of [mrpt-web](https://github.com/rachit173/mrpt-web/tree/dev-rpc-pubsub) library.

The app depends on mrpt-web-js node package. So, for building the app.

```
cd <mrpt-web-js root directory>
(sudo) npm link
cd <rawlog-web-ui root directory>
(sudo) npm link mrpt-web-js
```

This creates a symbolic link between the two packages.
