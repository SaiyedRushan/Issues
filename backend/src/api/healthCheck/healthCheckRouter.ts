import express, { type Request, type Response, type Router } from 'express'
export const healthCheckRouter: Router = express.Router()
/**
 * @swagger
 * /health-check:
 *   get:
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Success
 */
healthCheckRouter.get('/', (_req: Request, res: Response) => {
  res.send('Service is healthy')
})
