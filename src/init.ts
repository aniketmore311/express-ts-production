import fs from 'fs'
import { config } from './config'
import { logger } from './setup/logger'


//this function does all the synchronous initlialization
export function syncInit() {
    if (!fs.existsSync(config.LOG_DIR)) {
        fs.mkdirSync(config.LOG_DIR)
        logger.debug("created logs directory " + config.LOG_DIR)
    }
}

// this function has to be called inside the async main function 
export async function asyncInit() {

}

