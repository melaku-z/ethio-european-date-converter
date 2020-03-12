async function startDevServer() {
  const { createConfig, startServer } = require('es-dev-server');
  const config = createConfig({
    rootDir: 'dist',
    port: 8000,
    compatibility: 'none',
    // http2 : true, // todo: enable
  });
  const server = await startServer(config);
  return server;
}

startDevServer();

module.exports.startDevServer = startDevServer;
