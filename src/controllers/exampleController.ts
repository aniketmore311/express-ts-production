import express, { Application, Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import validate from '../lib/middleware/validate'

let exampleController = {
  register(app: Application) {
    let router = express.Router()

    router.post(
      '/login',
      [
        body('email').notEmpty().withMessage('email is required'),
        body('password').notEmpty().withMessage('password is required'),
        validate(),
      ],
      this.login.bind(this)
    )

    app.use('/example', router)
  },

  login(req: Request, res: Response, next: NextFunction) {
    res.json(req.body)
  },
}

export default exampleController
