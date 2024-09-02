import { env } from '@/config/envConfig'
import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import errorHandler from '@/middleware/errorHandler'
import rateLimiter from '@/middleware/rateLimiter'
import router from '@/api/routes'
const app: Express = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(helmet())
app.use(rateLimiter)

// Request logging
morgan.token('server-tz', () => {
  return new Date().toLocaleString()
})
app.use(morgan(':server-tz - :remote-user - :method :url :status - :response-time ms'))

// Routes
app.use('/api/v1', router)

// Error handlers
app.use(errorHandler())

export { app }
