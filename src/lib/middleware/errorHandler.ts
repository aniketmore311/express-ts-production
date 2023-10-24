import express from 'express'

export function errorHandler(): express.ErrorRequestHandler {
    return function (err, req, res, next) {
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