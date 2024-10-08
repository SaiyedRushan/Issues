import express, { type Router } from 'express'
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter'
import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from './docs/swaggerJsDoc'
import { issueRouter } from './issues/issueRouter'

const router: Router = express.Router()

router.get('/', (_req, res) => {
  res.send('Hello World!')
})

router.use('/health-check', healthCheckRouter)
router.use('/issue', issueRouter)
router.use('/docs', serve, setup(swaggerSpec))

export default router
