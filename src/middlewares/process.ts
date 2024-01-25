import { errorRes } from '../response/error'
import { Request, Response } from 'express'

import * as express from 'express'

process.on('uncaughtException', (error: Error) => {
  express.response.statusCode = 500
  express.response.send(errorRes(500, false, 'Server error', error))

  console.log(`Uncaught Exception: ${error}`)
})
