import { config } from './config';
import express from 'express'
import YAML from 'yaml'
import cors from 'cors'
import { ControllerRegisterFn } from "./types";
import helmet from 'helmet';
import morgan from 'morgan'
import path from 'path';
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import { notFoundHandler } from './lib/middleware/notFoundHandler';
import { logger } from './setup/logger';
import { errorHandler } from './lib/middleware/errorHandler';
import createHttpError from 'http-errors';

export function makeApp(registerFns: ControllerRegisterFn[]) {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    //log to console in development
    if (config.NODE_ENV == 'development') {
        app.use(
            morgan('dev', {
                stream: {
                    write: (message) => {
                        logger.debug(message.trim())
                    },
                },
            })
        )
    }
    // in production also log to a file
    if (config.NODE_ENV == 'production') {
        app.use(
            morgan('common', {
                stream: fs.createWriteStream(path.join(config.LOG_DIR, 'access.log')),
            })
        )
    }

    app.get("/", (req, res, next) => {
        res.json({
            status: 'ok',
        })
    })

    app.get("/healthcheck", (req, res, next) => {
        res.json({
            status: 'ok',
        })
    })

    app.get("/info", (req, res, next) => {
        res.json({
            name: config.application.name,
            version: config.application.version
        })
    })

    app.get("/error", () => {
        throw createHttpError.BadRequest("bad cred")
    })

    const OPENAPI_YAML_DOC_PATH = path.join(config.ROOT_DIR, "openapi.yaml")
    const file = fs.readFileSync(OPENAPI_YAML_DOC_PATH, 'utf8')
    const swaggerDocument = YAML.parse(file)
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    registerFns.forEach(fn => {
        fn(app)
    })

    app.use(notFoundHandler())
    let errorLogger: express.ErrorRequestHandler = function (err, req, res, next) {
        logger.error(err)
        next(err)
    }
    app.use(errorLogger)
    app.use(errorHandler())

    return app;
}