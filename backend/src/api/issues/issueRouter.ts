import express, { type Router } from 'express'
import * as issueController from './issueController'
import { validateRequest } from '@/middleware/requestValidator'
import { z } from 'zod'

export const issueRouter: Router = express.Router()

/**
 * @swagger
 * /issue:
 *  get:
 *    tags: [Issue]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      500:
 *        description: Internal server error
 */
issueRouter.get('/', issueController.getIssues)

const GetDeleteIssueSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

/**
 * @swagger
 * /issue/{id}:
 *  get:
 *    tags: [Issue]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Issue ID
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      404:
 *        description: Issue not found
 *      400:
 *        description: Invalid input
 */
issueRouter.get('/:id', validateRequest(GetDeleteIssueSchema), issueController.getIssue)

/**
 * @swagger
 * /issue:
 *  post:
 *    tags: [Issue]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Issue'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
issueRouter.post('/', issueController.createIssue)

const UpdateIssueSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})

/**
 * @swagger
 * /issue/{id}:
 *  put:
 *    tags: [Issue]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Issue ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Issue'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Issue not found
 *      500:
 *        description: Internal server error
 */
issueRouter.put('/:id', validateRequest(UpdateIssueSchema), issueController.updateIssue)

/**
 * @swagger
 * /issue/{id}:
 *  delete:
 *    tags: [Issue]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Issue ID
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Issue not found
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
issueRouter.delete('/:id', validateRequest(GetDeleteIssueSchema), issueController.deleteIssue)
