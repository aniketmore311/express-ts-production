import dotenv from 'dotenv'
dotenv.config()
//setup
// require('./setup/index')()
// import setup from './setup/index';
// setup()

import config from 'config'
import http from 'http'

import makeApp from './makeApp'
import healthController from './controllers/healthController'
import exampleController from './controllers/exampleController'
import logger from './setup/logger'

async function main() {
  const NODE_ENV = config.get('env.NODE_ENV')
  const PORT = config.get('application.port')

  const app = makeApp({
    controllers: [healthController, exampleController],
  })
  const server = http.createServer(app)

  server.listen(PORT, () => {
    logger.info(
      `server(mode: ${NODE_ENV}) started on: http://localhost:${PORT}`
    )
    logger.debug(`pid: ${process.pid}`)
  })

  function onClose() {
    logger.debug('graceful shutdown started')
    server.close(() => {
      logger.debug('graceful shutdown complete')
      process.exit(1)
    })
  }

  process.on('SIGINT', onClose)
  process.on('SIGTERM', onClose)

  process.on('unhandledRejection', function (err) {
    console.error(err)
    process.exit(1)
  })
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
