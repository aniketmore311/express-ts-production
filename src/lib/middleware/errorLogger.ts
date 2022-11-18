import { Request, Response, NextFunction } from 'express'
import { Logger } from 'winston'

function errorLogger({ logger }: { logger: Logger }) {
  return function (err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(err.message, {
      error: {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
      },
    })
    logger.debug(err.stack)
    next(err)
  }
}

export default errorLogger
