import { TransactionEventsData } from '@/utils/types'
import React from 'react'
import EventsRow from '@/components/EventsRow'

export default function TransactionEvents(props : {
  transactionEventsData: TransactionEventsData[], 
}) {
  console.log(props.transactionEventsData, "transactionEventsData")
  return (
    <div className="px-6 py-4">
          <div className="flex items-center py-2 border-b border-gray-700">
            <div className="w-4/12 text-left">ID</div>
            <div className="w-4/12 text-center">BLOCK</div>
            <div className="w-4/12 text-right">AGE</div>
          </div>
          {props.transactionEventsData.map((txn, index) => (
            <EventsRow key={index} {...txn} />
          ))}
        </div>
  )
}
