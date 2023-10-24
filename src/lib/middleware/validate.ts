import express from 'express'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'

export function validate(): express.RequestHandler {
    return function (req, res, next) {
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
