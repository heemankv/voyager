import { TransactionEventsData } from '@/utils/types'
import React from 'react'

export default function TransactionEvents(props : {
  transactionEventsData: TransactionEventsData[], 
}) {
  console.log(props.transactionEventsData, "transactionEventsData")
  return (
    <div>TransactionEvents</div>
  )
}
