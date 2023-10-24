//init
import { config as loadEnv } from "dotenv"
loadEnv()

//imports
import path from "path"
import { getEnvVar } from "./lib/utils/getEnvVar"


const ROOT_DIR = path.join(__dirname, "..")
const NODE_ENV = getEnvVar("NODE_ENV", "development")
const NAME = "you-app-name"
const VERSION = "0.1.0"

export const config = {
    application: {
        name: NAME,
        version: VERSION
    },
    ROOT_DIR: ROOT_DIR,
    NODE_ENV: NODE_ENV,
    LOG_DIR: (() => {
        switch (NODE_ENV) {
            case "production":
                return `/var/log/${NAME}`
            default:
                return path.join(ROOT_DIR, "logs")
        }
    })()

}