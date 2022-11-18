import errorLogger from '../../../../src/lib/middleware/errorLogger'
import express, { Application } from 'express'
import request from 'supertest'
import createHttpError from 'http-errors'
import { Logger, loggers } from 'winston'
import { HttpError } from 'http-errors'

// logger.error(err.message, {
//     error: {
//         message: err.message,
//         stack: err.stack,
//         statusCode: err.statusCode || 500,
//     },
// })
// logger.debug(err.stack)

describe('errorHandler', () => {
  //setup
  let app: Application
  let mockLogger: Partial<Logger>
  let err: HttpError

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
      debug: jest.fn(),
    }
    err = new createHttpError.BadRequest('bad request')
    app = express()
    app.get('/expected', () => {
      throw err
    })
    app.use(errorLogger({ logger: mockLogger as Logger }))
  })

  it('should call log.info with error message', async () => {
    //action
    let resp = await request(app).get('/expected')
    //assert
    let mockError = mockLogger.error as jest.Mock
    expect(mockError.mock.calls.length).toEqual(1)
    expect(mockError.mock.calls[0][0]).toEqual(err.message)
  })

  it('should pass error object as 2nd argument to log.info', async () => {
    //action
    let resp = await request(app).get('/expected')
    //assert
    let mockError = mockLogger.error as jest.Mock
    expect(mockError.mock.calls.length).toEqual(1)
    expect(mockError.mock.calls[0][1]).toEqual({
      error: {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
      },
    })
  })

  it('should logger.debug with error stack', async () => {
    //action
    let resp = await request(app).get('/expected')
    //assert
    let mockdebug = mockLogger.debug as jest.Mock
    expect(mockdebug.mock.calls.length).toEqual(1)
    expect(mockdebug.mock.calls[0][0]).toEqual(err.stack)
  })
})
