import React, { useEffect, useState } from "react"
import { Pencil, PlusCircle, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
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

      {/* Create Record Dialog */}
      <div className='flex justify-start mb-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className='mr-2 h-4 w-4' />
              Create Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Title
                </Label>
                <Input id='title' value={newRecord.title} onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Input id='description' value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} className='col-span-3' />
              </div>
            </div>
            <Button onClick={handleCreateRecord}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Issues List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {records.length > 0 ? (
          records.map((record) => (
            <Card key={record._id}>
              <CardHeader>
                <CardTitle>{record.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{record.description}</p>
              </CardContent>

              {/* EDIT AND DELETE BUTTONS */}
              <CardFooter className='gap-3'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingRecord(record)}>
                      <Pencil className='mr-2 h-4 w-4' />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Record</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='edit-title' className='text-right'>
                          Title
                        </Label>
                        <Input id='edit-title' value={editingRecord?.title || ""} onChange={(e) => setEditingRecord((prev) => (prev ? { ...prev, title: e.target.value } : null))} className='col-span-3' />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='edit-description' className='text-right'>
                          Description
                        </Label>
                        <Input id='edit-description' value={editingRecord?.description || ""} onChange={(e) => setEditingRecord((prev) => (prev ? { ...prev, description: e.target.value } : null))} className='col-span-3' />
                      </div>
                    </div>
                    <Button onClick={handleUpdateRecord}>Update</Button>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='destructive' onClick={() => setDeletingRecord(record)}>
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>Are you sure you want to delete this record? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant='outline' onClick={() => setDeletingRecord(null)}>
                        Cancel
                      </Button>
                      <Button variant='destructive' onClick={handleDeleteRecord}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className='text-2xl'>No records found</p>
        )}
      </div>
    </div>
  )
}

export default App
