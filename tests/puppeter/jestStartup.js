async function startDevServer() {
  const { createConfig, startServer } = require('es-dev-server');
  const config = createConfig({
    rootDir: 'dist',
    port: 8000,
    compatibility: 'none',
  });
  const server = await startServer(config);
  return server;
}

startDevServer();

module.exports = async () => {
  process.localDevServer = await startDevServer();
};
