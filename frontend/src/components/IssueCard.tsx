import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import { Record } from "../types"

interface IssueCardProps {
  record: Record
  onUpdate: (record: Record) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export const IssueCard: React.FC<IssueCardProps> = ({ record, onUpdate, onDelete }) => {
  const [editingRecord, setEditingRecord] = useState<Record | null>(null)

  const handleUpdate = () => {
    if (editingRecord) {
      onUpdate(editingRecord)
      setEditingRecord(null)
    }
  }

  return (
    <Card className='dark:bg-gray-800'>
      <CardHeader>
        <CardTitle>{record.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{record.description}</p>
      </CardContent>
      <CardFooter className='gap-3'>
        {/* Edit Dialog */}
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
                <Input
                  id='edit-title'
                  value={editingRecord?.title || ""}
                  onChange={(e) => setEditingRecord((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='edit-description' className='text-right'>
                  Description
                </Label>
                <Input
                  id='edit-description'
                  value={editingRecord?.description || ""}
                  onChange={(e) => setEditingRecord((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                  className='col-span-3'
                />
              </div>
            </div>{" "}
            <Button onClick={handleUpdate}>Update</Button>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='destructive'>
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
              <Button variant='outline'>Cancel</Button>
              <Button variant='destructive' onClick={() => onDelete(record._id)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
