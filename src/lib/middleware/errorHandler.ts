import { Request, Response, NextFunction } from 'express'

function errorHandler() {
  return function (err: any, req: Request, res: Response, next: NextFunction) {
    let status = 500
    let message = 'Something went wrong'

    if (err.statusCode) {
      status = err.statusCode
      message = err.message
    }
    const resp = {
      statusCode: status,
      message,
    }
    res.status(status).json(resp)
    return
  }
}

export default errorHandler
