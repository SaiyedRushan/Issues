import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '@/server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { IIssue, Issue } from '../issueModel'
import mongoose from 'mongoose'

let mongoServer: MongoMemoryServer
let issueIds: mongoose.Types.ObjectId[] = []
const issues: IIssue[] = [
  { title: 'Issue 1', description: 'Description 1' },
  { title: 'Issue 2', description: 'Description 2' },
  { title: 'Issue 3', description: 'Description 3' },
]

describe('Issues integration test', () => {
  beforeAll(async () => {
    // Set up an in-memory MongoDB instance and connect to it
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  })

  beforeEach(async () => {
    // Clean the database before each test
    await Issue.deleteMany({})
    // Insert the issues into the database and store their IDs
    const createdIssues = await Issue.insertMany(issues)
    issueIds = createdIssues.map((issue) => issue._id)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })

  describe('GET /api/v1/issue', () => {
    it('should return an issue by ID from the database', async () => {
      // Act: Make a request to the API
      const response = await request(app).get(`/api/v1/issue/${issueIds[0]}`)

      // Assert: Verify the response
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(issues[0])
    })

    it('should return all issues by ID from the database', async () => {
      // Act: Make a request to the API
      const response = await request(app).get(`/api/v1/issue`)

      // Assert: Verify the response
      expect(response.status).toBe(200)
      issues.forEach((issue, index) => {
        expect(response.body[index]).toMatchObject({
          title: issue.title,
          description: issue.description,
        })
      })
    })
  })
})
