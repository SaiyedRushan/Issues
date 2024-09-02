import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *  schemas:
 *    Issue:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *      required:
 *        - title
 *        - description
 *      example:
 *        title: Create button on landing page
 *        description: The button should route the user to the create issue page
 */

export interface IIssue {
  title: string
  description: string
}

const issueSchema = new Schema<IIssue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

export const Issue = model<IIssue>('Issue', issueSchema)
