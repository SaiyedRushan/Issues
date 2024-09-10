import React, { useCallback, useEffect, useState } from "react"
import { CreateIssueDialog } from "./components/CreateIssueDialog"
import { IssueList } from "./components/IssueList"
import api from "@/lib/api"
import { Record } from "./types"
import { ThemeProvider } from "next-themes"
import { DarkModeToggle } from "./components/DarkModeToggle"

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([])

  const getIssues = useCallback(async () => {
    try {
      const { data } = await api.get("/issue")
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
      const { status, data } = await api.post("/issue", newRecord)
      if (status === 201 && data) {
        setRecords((prevRecords) => [...prevRecords, data])
      }
    } catch (error) {
      console.error("Error creating record:", error)
    }
  }, [])

  const handleUpdateRecord = useCallback(async (updatedRecord: Record) => {
    try {
      const { status, data } = await api.put(`/issue/${updatedRecord._id}`, updatedRecord)
      if (status === 200 && data) {
        setRecords((prevRecords) => prevRecords.map((r) => (r._id === updatedRecord._id ? data : r)))
      }
    } catch (error) {
      console.error("Error updating record:", error)
    }
  }, [])

  const handleDeleteRecord = useCallback(async (id: string) => {
    try {
      const { status } = await api.delete(`/issue/${id}`)
      if (status === 200) {
        setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id))
      }
    } catch (error) {
      console.error("Error deleting record:", error)
    }
  }, [])

  return (
    <ThemeProvider attribute='class'>
      <div className='container mx-auto p-4 min-h-screen flex flex-col gap-3'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold'>Issue Tracker</h1>
          <DarkModeToggle />
        </div>
        <CreateIssueDialog onCreateRecord={handleCreateRecord} />
        <IssueList records={records} onUpdateRecord={handleUpdateRecord} onDeleteRecord={handleDeleteRecord} />
      </div>
    </ThemeProvider>
  )
}

export default App
