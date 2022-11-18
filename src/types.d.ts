import { Application } from 'express'

export type AsyncHandler<TReq = {}, TRes = {}, TRet = any> = (
  req: Request<TReq>,
  res: Response<TRes>,
  next?: NextFunction
) => Promise<TRet>
export interface IController {
  register: (app: Application) => void
}
export interface IAPIError extends Error {
  statusCode
}
