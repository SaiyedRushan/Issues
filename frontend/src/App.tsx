import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { CreateIssueDialog } from "./components/CreateIssueDialog"
import { IssueList } from "./components/IssueList"
axios.defaults.baseURL = "http://localhost:8080/api/v1"

interface Record {
  _id: string
  title: string
  description: string
}

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([])

  const getIssues = useCallback(async () => {
    try {
      const { data } = await axios.get("/issue")
      if (data) setRecords(data)
    } catch (error) {
      console.error("Error fetching issues:", error)
    }
  }, [])

  useEffect(() => {
    getIssues()
  }, [getIssues])

  const handleCreateRecord = useCallback(async (newRecord: Omit<Record, "_id">) => {
    try {
      const { status, data } = await axios.post("/issue", newRecord)
      if (status === 201 && data) {
        setRecords((prevRecords) => [...prevRecords, data])
      }
    } catch (error) {
      console.error("Error creating record:", error)
    }
  }, [])

  const handleUpdateRecord = useCallback(async (updatedRecord: Record) => {
    try {
      const { status, data } = await axios.put(`/issue/${updatedRecord._id}`, updatedRecord)
      if (status === 200 && data) {
        setRecords((prevRecords) => prevRecords.map((r) => (r._id === updatedRecord._id ? data : r)))
      }
    } catch (error) {
      console.error("Error updating record:", error)
    }
  }, [])

  const handleDeleteRecord = useCallback(async (id: string) => {
    try {
      const { status } = await axios.delete(`/issue/${id}`)
      if (status === 200) {
        setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id))
      }
    } catch (error) {
      console.error("Error deleting record:", error)
    }
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Issue Tracker</h1>
      <CreateIssueDialog onCreateRecord={handleCreateRecord} />
      <IssueList records={records} onUpdateRecord={handleUpdateRecord} onDeleteRecord={handleDeleteRecord} />
    </div>
  )
}

export default App
