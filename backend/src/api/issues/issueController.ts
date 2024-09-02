import type { Request, Response } from 'express'
import * as issueService from './issueService'
import { StatusCodes } from 'http-status-codes'

export const getIssues = async (_req: Request, res: Response) => {
  try {
    const issues = await issueService.findAll()
    res.json(issues)
  } catch (err) {
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

export const getIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.findById(req.params.id as string)
    if (!issue) return res.status(StatusCodes.NOT_FOUND).json({ error: 'No issue found' })
    res.json(issue)
  } catch (err) {
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

export const createIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.createIssue(req.body)
    res.status(StatusCodes.CREATED).json(issue)
  } catch (err) {
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.updateIssue(req.params.id as string, req.body)
    if (!issue) return res.status(StatusCodes.NOT_FOUND).json({ error: 'No issue found' })
    res.json(issue)
  } catch (err) {
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.deleteIssue(req.params.id as string)
    if (!issue) return res.status(StatusCodes.NOT_FOUND).json({ error: 'No issue found' })
    res.json(issue)
  } catch (err) {
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
  }
}
