import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

function validate() {
  return function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let errArr = errors.array()
      let message = errArr[0].msg
      let err = new createHttpError.BadRequest(message)
      next(err)
    }
    next()
  }
}

export default validate
