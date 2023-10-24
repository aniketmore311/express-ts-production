import { notFoundHandler } from "../../../../src/lib/middleware/notFoundHandler"
import express from 'express'
import request from 'supertest'

describe('notFoundHandler', () => {
    //setup
    let app: express.Application;
    beforeAll(() => {
        app = express()
        app.get('/hello', (req, res) => {
            res.send("hello")
        })
        app.use(notFoundHandler())
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message
            })
        })
    })

    it('should propogate error when route not found', async () => {
        //action
        let resp = await request(app).get('/none')
        //assert
        expect(resp.status).toEqual(404)
        expect(resp.body).toEqual({
            statusCode: 404,
            message: 'resource not found'
        })

    })

})