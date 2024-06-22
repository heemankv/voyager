import { getCurrentTime, timeAgo } from '@/utils/helpers'
import { TransactionDetails, TransactionDeveloperInfo } from '@/utils/types'
import React from 'react'

export default function TransactionOverView(props : {
  transactionDetails : TransactionDetails, 
  developerInfo : TransactionDeveloperInfo
}) {
  return (
    <div className="px-6 py-4">
    <h2 className="text-2xl font-semibold">Transaction Details</h2>
    <br />

    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Block Number</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>

    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Timestamp</p>
      <p className="text-white">{timeAgo(getCurrentTime(),props.transactionDetails.timestamp)} ago </p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Actual Fee</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Max Fee</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Block Number</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Block Number</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Block Number</p>
      <p className="text-white">{props.transactionDetails.blockNumber} Copy</p>
    </div>
    
  </div>
  )
}
