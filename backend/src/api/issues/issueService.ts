import { IIssue, Issue } from './issueModel'

export const findAll = async (): Promise<IIssue[]> => {
  return Issue.find({})
}

export const findById = async (id: string): Promise<IIssue | null | undefined> => {
  return Issue.findById(id)
}

export const createIssue = async (issue: IIssue): Promise<IIssue> => {
  return Issue.create(issue)
}

export const updateIssue = async (id: string, issue: Partial<IIssue>): Promise<IIssue | null | undefined> => {
  return Issue.findByIdAndUpdate(id, issue, { new: true })
}

export const deleteIssue = async (id: string): Promise<IIssue | null | undefined> => {
  return Issue.findByIdAndDelete(id)
}
