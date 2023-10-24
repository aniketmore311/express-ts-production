//initialization
import { syncInit, asyncInit } from './init'
syncInit()

//imports 
import { createServer } from 'http'
import { makeApp } from './makeApp'
import { logger } from './setup/logger'

async function main() {
    await asyncInit()
    const app = makeApp([])
    const server = createServer(app)
    server.listen("8080", () => {
        logger.info("server started on http://localhost:8080")
    })
    logger.debug('test debug msg')
}
main().catch((err) => {
    console.error(err)
})
