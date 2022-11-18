import express, { Application, Request, Response, NextFunction } from 'express'

const healthController = {
  register(app: Application) {
    const router = express.Router()
    router.get('/', this.healthHandler.bind(this))
    router.get('/health', this.healthHandler.bind(this))
    app.use('/', router)
  },

  healthHandler(req: Request, res: Response, next: NextFunction) {
    const resp = {
      status: 'ok',
    }
    res.json(resp)
    return
  },
}

export default healthController
