# express-ts-production

## Production ready express-ts starter

## Requirements

- node ^16.15.1
- npm ^8.12.1

## This starter includes

- `dotenv` and `config` for config management
- `helmet`, `cors` for security
- `http-errors` and error handling and logging middleware for error handling
- `express-validator` and a custom validation middleware for validation
- `winston`and `morgan` for logging
- `jest` and `supertest` for testing
- `pm2` as a production runtime

## how to use this starter

- run `npx degit aniketmore311/express-js-production <your project name>`
- run `cd <your project name>`
- run `npm install`
- run `cp .env.example .env` and fill values of env variables in `.env` file
- run `npm run build` to compile typescript to javascript
- run `npm start` to start a single process or
- run `npm run prod` to run in pm2
- run `npm run dev` to run in development or
