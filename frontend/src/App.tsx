import React, { useEffect, useState } from "react"
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
  const [newRecord, setNewRecord] = useState({ title: "", description: "" })

  const [editingRecord, setEditingRecord] = useState<Record | null>(null)
  const [deletingRecord, setDeletingRecord] = useState<Record | null>(null)

  const handleCreateRecord = async () => {
    const { status, data } = await axios.post("/issue", newRecord)
    if (status == 201 && data) {
      setRecords([...records, data])
      setNewRecord({ title: "", description: "" })
    }
  }

  const getIssues = async () => {
    const { data } = await axios.get("/issue")
    if (data) setRecords(data)
  }

  const handleDeleteRecord = async () => {
    if (!deletingRecord) return
    const { status, data } = await axios.delete(`/issue/${deletingRecord?._id}`)
    if (status == 200 && data) {
      setRecords(records.filter((record) => record._id !== deletingRecord?._id))
      setDeletingRecord(null)
    }
  }

  const handleUpdateRecord = async () => {
    if (!editingRecord) return
    const { status, data } = await axios.put(`/issue/${editingRecord?._id}`, editingRecord)
    if (status == 200 && data) {
      setRecords(records.map((r) => (r._id === editingRecord?._id ? data : r)))
      setEditingRecord(null)
    }
  }

  useEffect(() => {
    getIssues()
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
