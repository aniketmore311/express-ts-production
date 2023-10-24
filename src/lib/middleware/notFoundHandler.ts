import express from 'express'
import createHttpError from "http-errors"

export function notFoundHandler(): express.RequestHandler {
    return function (req, res, next) {
        const err = new createHttpError.NotFound('resource not found')
        next(err)
    }
}