import winston from 'winston'
import path from 'path'
import config from 'config'

const NODE_ENV = config.get<string>('env.NODE_ENV')
const LOG_DIR = config.get<string>('application.logDir')

const logger = winston.createLogger({
  level: NODE_ENV == 'development' ? 'debug' : 'info',
  format: winston.format.json(),
  silent: NODE_ENV == 'test' ? true : false,
})

if (NODE_ENV == 'production') {
  logger.add(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'general.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: 'info',
    })
  )

  logger.add(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: 'error',
    })
  )
}

if (NODE_ENV == 'development' || NODE_ENV == 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.cli(),
    })
  )
}

export default logger
