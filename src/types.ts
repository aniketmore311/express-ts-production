import { Request, Response, NextFunction, Application } from 'express'

export type ControllerRegisterFn = (app: Application) => void