//@ts-check
import { validate } from "../../../../src/lib/middleware/validate"
import express from 'express'
import { body } from 'express-validator'
import request from 'supertest'

describe('validate', () => {
    it('should forward proper error when validation fails', async () => {
        //setup
        let app = express()
        app.post('/test', [
            body('email').notEmpty().withMessage('email is required'),
            body('password').notEmpty().withMessage('password is required'),
            validate()
        ], (req: express.Request, res: express.Response, next: express.NextFunction) => {
            return res.json(req.body)
        })
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

            return res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message
            })
        })
        //action
        let resp = await request(app).post('/test').send({
            password: "pass"
        })
        //assert
        expect(resp.status).toEqual(400)
        expect(resp.body.statusCode).toEqual(400)
        expect(resp.body.message).toEqual("email is required")

    })
})