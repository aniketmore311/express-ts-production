import { Request, Response, NextFunction } from 'express'
import { AsyncHandler } from '../../types'

function catchAsync(fn: AsyncHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
