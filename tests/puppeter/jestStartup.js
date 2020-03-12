async function startDevServer() {
  const { createConfig, createServer } = require('es-dev-server');
  const config = createConfig({
    rootDir: 'dist',
    port: 8000,
    compatibility: 'none',
    // http2 : true, // todo: enable
  });
  const { server } = await createServer(config);
  await server.listen(8000);
  return server;
}

startDevServer();

module.exports.startDevServer = startDevServer;
