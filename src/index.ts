import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

dotenv.config()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

const auth = require('./auth/auth')
const user = require('./dashboard/dashboard')

const app: Express = express()
app.use(
  cors({
    origin: ['*'],
  }),
)
app.use(limiter)
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/dashboard', user)

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error}`)
})

const hostname = process.env.HOSTNAME || 'localhost'
const port = process.env.PORT || 5000

console.log(`App is listening on ${hostname}: ${port}`)

app.use(express.json())
app.listen(port)
