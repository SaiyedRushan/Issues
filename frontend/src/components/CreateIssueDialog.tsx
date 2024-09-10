import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { Record } from "../types"

interface CreateIssueDialogProps {
  onCreateRecord: (newRecord: Omit<Record, "_id">) => Promise<void>
}

export const CreateIssueDialog: React.FC<CreateIssueDialogProps> = ({ onCreateRecord }) => {
  const [newRecord, setNewRecord] = useState({ title: "", description: "" })

  const handleCreate = () => {
    onCreateRecord(newRecord)
    setNewRecord({ title: "", description: "" })
  }

  return (
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
        <Button onClick={handleCreate}>Create</Button>
      </DialogContent>
    </Dialog>
  )
}
