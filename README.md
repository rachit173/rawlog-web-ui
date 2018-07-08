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

### Instructions for running the app:
1. Build the [mrpt-web-js](https://github.com/rachit173/mrpt-web-js) library.
2. cd mrpt-web-js
3. npm link<br>
### For running rawlog-web-ui
1. cd rawlog-web-ui
2. npm link mrpt-web-js
3. npm run serve

### The app requires the C++ rawlog-viewer app runnning, the app is part of the [mrpt-web](https://github.com/rachit173/mrpt-web).
1. Build mrpt-web library.
2. cd mrpt-web/build
3. cd apps/rawlog-viewer
4. ./rawlog-viewer 127.0.0.1 5000
<br>
The server should be started before running the web-app.<br>
A green button, on the app depicts an established connection with the server.<br>
If the connection is not established, try refreshing the page.<br>
## Currently implemented features
1. Load rawlog. (File/Open)
2. Selecting a log from the navbar. The text details can be viewed.
3. Set Motion model.

## For the latest implemented features use the dev branches.
