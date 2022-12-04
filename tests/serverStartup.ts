const stoppableServer = require('stoppable');
const { createConfig, createServer } = require('es-dev-server');

function startDevServer() {
  const config = createConfig({
    rootDir: 'dist',
    compatibility: 'none',
    // http2 : true, // todo: enable
  });
  let { server } = createServer(config);
  server = stoppableServer(server, 0);
  server.listen(8000);
  return server;
}

module.exports.startDevServer = startDevServer;
