import Koa, { Middleware } from 'koa'
import compress from 'koa-compress'
import serve from 'koa-static'
import { constants } from 'zlib'

export async function startServer(port = 8000, rootDir = 'dist') {
  const app = new Koa()
  app.use(
    compress({
      gzip: {
        flush: constants.Z_SYNC_FLUSH,
      },
      deflate: {
        flush: constants.Z_SYNC_FLUSH,
      },
      br: false, // disable brotli
    }) as unknown as Middleware,
  )
  app.use(serve(rootDir))

  const server = app.listen(port)

  return server
}
