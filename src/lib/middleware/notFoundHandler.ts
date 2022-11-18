import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

function notFoundHandler() {
  return function (req: Request, res: Response, next: NextFunction) {
    let newErr = new createHttpError.NotFound('resource not found')
    next(newErr)
  }
}

export default notFoundHandler
