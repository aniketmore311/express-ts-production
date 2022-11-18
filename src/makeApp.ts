/**
 * @typedef {import('./types').Controller} Controller
 * @typedef {import('./types').Application} Application
 * @typedef {import('./types').RequestHandler} RequestHandler
 * @typedef {import('./types').ErrorRequestHandler} ErrorRequestHandler
 */
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import fs from 'fs'
import config from 'config'
import logger from './setup/logger'
import path from 'path'
import notFoundHandler from './lib/middleware/notFoundHandler'
import errorHandler from './lib/middleware/errorHandler'
import errorLogger from './lib/middleware/errorLogger'
import { IController } from './types'

//constants
const NODE_ENV = config.get<string>('env.NODE_ENV')
const LOG_DIR = config.get<string>('application.logDir')

function makeApp({ controllers }: { controllers: IController[] }) {
  const app = express()

  app.use(cors())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  //log to console
  app.use(
    morgan('common', {
      stream: {
        write: (message) => {
          logger.info(message.trim())
        },
      },
    })
  )
  // in production also log to a file
  if (NODE_ENV == 'production') {
    app.use(
      morgan('common', {
        stream: fs.createWriteStream(path.join(LOG_DIR, 'access.log')),
      })
    )
  }

  controllers.forEach((controller) => {
    controller.register(app)
  })

  app.use(notFoundHandler())
  app.use(errorLogger({ logger }))
  app.use(errorHandler())

  return app
}

export default makeApp
