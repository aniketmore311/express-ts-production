import pino from 'pino'
import { config } from '../config'
import path from 'path'

export let logger: pino.Logger;

if (config.NODE_ENV === 'development') {
    logger = pino({
        transport: {
            targets: [
                {
                    target: "pino-pretty",
                    level: "debug",
                    options: {}
                }
            ]
        },
        level: "debug"
    })
}

if (config.NODE_ENV === 'production') {
    logger = pino({
        transport: {
            targets: [
                {
                    target: "pino-pretty",
                    level: "info",
                    options: {}
                },
                {
                    target: "pino/file",
                    level: "info",
                    options: {
                        destination: path.join(config.LOG_DIR, "info.ndjson.log")
                    }
                },
                {
                    target: "pino/file",
                    level: "error",
                    options: {
                        destination: path.join(config.LOG_DIR, "error.ndjson.log")
                    }
                }
            ]
        },
        level: "info"

    })
}
