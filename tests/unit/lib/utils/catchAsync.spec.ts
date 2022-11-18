import catchAsync from '../../../../src/lib/utils/catchAsync'
import express, { NextFunction, Request, Response } from 'express'
import request from 'supertest'

describe('catchAsync', () => {
  it('should forward error when thrown inside async handler', async () => {
    //setup
    let app = express()
    app.get(
      '/test',
      catchAsync(async () => {
        throw new Error('test error')
      })
    )
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      return res.status(500).json({
        message: err.message,
      })
    })
    //action
    let resp = await request(app).get('/test')
    //assert
    expect(resp.status).toEqual(500)
    expect(resp.body).toEqual({
      message: 'test error',
    })
  })
})
