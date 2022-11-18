import request from 'supertest'
import express, { Application } from 'express'
import healthController from '../../../src/controllers/healthController'

describe('exampleController', () => {
  //setup
  let app: Application

  beforeAll(() => {
    app = express()
    healthController.register(app)
  })

  it('should return status 200 when GET /', async () => {
    //action
    let resp = await request(app).get('/')
    //assert
    expect(resp.statusCode).toEqual(200)
  })

  it('should return status 200 when GET /health', async () => {
    //action
    let resp = await request(app).get('/health')
    //assert
    expect(resp.statusCode).toEqual(200)
  })
})
