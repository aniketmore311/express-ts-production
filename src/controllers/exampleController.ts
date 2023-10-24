import createHttpError from "http-errors"
import { body } from 'express-validator'
import express from "express"
import { validate } from "../lib/middleware/validate"

export function registerExampleController(app: express.Application) {
    let router = express.Router()

    router.post(
        '/login',
        [
            body('email').notEmpty().withMessage('email is required'),
            body('password').notEmpty().withMessage('password is required'),
            validate(),
        ],
        login
    )

    app.use('/example', router)
}

let login: express.RequestHandler = function (req, res, next) {

    if (req.body.email == 'user@gmail.com' && req.body.password == 'pass123') {
        return res.json({
            message: 'login successful',
        })
    } else {
        throw new createHttpError.BadRequest('invalid credentials')
    }
}

