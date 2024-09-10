import React from "react"
import { IssueCard } from "./IssueCard"
import { Record } from "../types"

interface IssueListProps {
  records: Record[]
  onUpdateRecord: (record: Record) => Promise<void>
  onDeleteRecord: (id: string) => Promise<void>
}

export const IssueList: React.FC<IssueListProps> = ({ records, onUpdateRecord, onDeleteRecord }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {records.length > 0 ? (
        records.map((record) => <IssueCard key={record._id} record={record} onUpdate={onUpdateRecord} onDelete={onDeleteRecord} />)
      ) : (
        <p className='text-2xl'>No records found</p>
      )}
    </div>
  )
}
