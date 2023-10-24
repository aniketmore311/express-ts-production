//initialization
import { syncInit, asyncInit } from './init'
syncInit()

//imports 
import { createServer } from 'http'
import { makeApp } from './makeApp'
import { logger } from './setup/logger'
import { config } from './config'

async function main() {
    await asyncInit()
    const app = makeApp([])
    const server = createServer(app)
    server.listen("8080", () => {
        logger.info(`${config.application.name} started on http://localhost:${config.server.port}`)
    })

    //graceful shutdown
    function onClose() {
        logger.info('graceful shutdown started')
        server.close((err) => {
            if (err) {
                logger.error(err)
                process.exit(1)
            } else {
                logger.info('graceful shutdown complete')
                process.exit(0)
            }
        })
    }

    process.on('SIGINT', onClose)
    process.on('SIGTERM', onClose)


    // Handle uncaught exceptions gracefully
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        process.exit(1);
    });

    // Handle unhandled promise rejections gracefully
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Promise Rejection:', reason);
        process.exit(1);
    });
}
main().catch((err) => {
    logger.error(err)
})
