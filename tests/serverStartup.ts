import { startDevServer } from '@web/dev-server'

export async function startServer(port = 8000, rootDir = 'dist') {
  const server = await startDevServer({
    config: {
      rootDir,
      port,
    },
  })

  return server
}
