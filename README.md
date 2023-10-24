# express-ts-production

## Production ready express API starter

## Requirements

- node ^18.18.1
- npm ^9.8.1

## This starter includes

- `dotenv` for config management
- `helmet`, `cors` for security
- `http-errors` and error handling and logging middleware for error handling
- `express-validator` and a custom validation middleware for validation
- `pino` and `morgan` for logging
- `jest` and `supertest` for testing
- `pm2` as a production runtime
- `typescript` with jsdoc comments for static type checking your javascript code
- `Dockerfile` for building the docker container

## how to use this starter locally

- run `npx degit aniketmore311/express-js-production <your project name>`
- run `cd <your project name>`
- run `npm install`
- run `cp .env.example .env` and fill values of env variables in `.env` file
- run `npm run start:dev` to run in development or
- run `npm run start:prod` to run in production

## how to deploy this starter

1. using the docker-image
- use the dockerfile to build the docker image, this can be run anywhere, look at the .env.example file to understand which env variables are required

2. on the server
- install node.js 18.18.0 on the server
- clone the repo on the server
- run cp .env.example .env
- setup log rotation by first modifying the files in infra/logrotate directory for your own application
- run the setup script in that directory
- run "npm run start:prod" to start the server
- use a reverse proxy or load balancer in front of the server to do load balancing and ssl termination, some examples are nginx, haproxy, aws elastic load balancer etc