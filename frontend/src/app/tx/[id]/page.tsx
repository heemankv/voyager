"use client";
import Copy from '@/components/Copy';
import TransactionEvents from '@/components/TransactionEvents';
import TransactionOverView from '@/components/TransactionOverView';
import { useTransaction } from '@/hooks/useTransaction';
import { TransactionDetails, TransactionDetailsData, TransactionDeveloperInfo, TransactionEventsData, TransactionTabs } from '@/utils/types';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

function isValid(value : string | undefined) {
  // TODO: make better validations
  return value !== undefined;
}

export default function IndividualTxnPageIDWrapper() {
  const params = useParams<{ id: string;}>();

  console.log("id", params);

  if(isValid(params.id)){
    return <IndividualTxnPageWrapper 
      id={params.id}
    />;
  }
  else {
    return <IndividualTxnPageError />;
  }
}

function IndividualTxnPageWrapper(params : {id : string}) {
  const {isLoading, error, data, isFetching} = useTransaction(params.id);

  console.log("data", isLoading, error, data, isFetching );

  if (isLoading || isFetching) {
    return <IndividualTxnPagePending />;
  }
  if (error || data === undefined || data.message === "Transaction not found") {
    return <IndividualTxnPageError />;
  }
  return <IndividualTxnPageView transactionDetails={data.data} />

}
function IndividualTxnPagePending() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

function IndividualTxnPageError() {
  return (
    <div>
      <p>There was an error</p>
    </div>
  )
}

const IndividualTxnPageView: React.FC<{ transactionDetails: TransactionDetailsData }> = ({ transactionDetails }) => {
  const [showCaseTab, setShowCaseTab] = useState<TransactionTabs>(TransactionTabs.Overview);

  const txnOverViewData : {
    transactionDetails : TransactionDetails, 
    developerInfo : TransactionDeveloperInfo
  } = { 
    transactionDetails : {
      blockNumber : transactionDetails.blockNumber,
      timestamp : transactionDetails.blockInformation.timestamp,
      actualFee : transactionDetails.actualFee,
      maxFee : transactionDetails.transactionMetaInformation.maxFee,
      senderAddress : transactionDetails.transactionMetaInformation.senderAddress,
      //TODO: dummy value
      gasConsumed : undefined,
      classHash : transactionDetails.blockInformation.blockHash
    },
    developerInfo : {
      unixTimestamp : transactionDetails.blockInformation.timestamp,
      nonce : transactionDetails.transactionMetaInformation.nonce,
      version : transactionDetails.transactionMetaInformation.version,
      ExecutionResources : transactionDetails.executionResources,
      Signatures : transactionDetails.transactionMetaInformation.signature,
      //TODO: dummy value
      position : 325,
    }
  }

  const txnEventData : TransactionEventsData[] = transactionDetails.events.map((event, index)=>{
    return {
      id : `${transactionDetails.blockNumber}_${transactionDetails.transactionIndex}_${index}`,
      blockNumber : transactionDetails.blockNumber,
      timestamp : transactionDetails.blockInformation.timestamp
    }
  })

  return (
    <div className='rounded-lg'>
      <div className=" text-white p-6 min-h-screen">
        <div className=" bg-bgSecondary max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Transaction</h1>
          <div className="p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-sm font-medium">HASH</h2>
                <p className="text-gray-400">0x1522c786f0fded0450c298c45549045b2b905ad7242190e9bca8b19dbf31cc9</p>
              </div>
              <div>
                <h2 className="text-sm font-medium">TIMESTAMP</h2>
                <p className="text-gray-400">Jun 22 2024 19:40:30</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="bg-green-600 text-xs px-2 py-1 rounded mr-2">Received</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">Accepted on L2</span>
              </div>
            </div>
            <div className="flex border-b border-gray-700">
              <button className="cursor-pointer text-sm  py-2 text-gray-400 hover:text-white"
                 onClick={(e) =>{
                  e.preventDefault();
                  setShowCaseTab(TransactionTabs.Overview)
                }}
              >Overview</button>
                <button  className="cursor-pointer text-sm px-4 py-2 text-gray-400 hover:text-white"
                 onClick={(e) =>{
                  e.preventDefault();
                  setShowCaseTab(TransactionTabs.Events)
                }}
              >Events</button>
            </div>

            {showCaseTab === TransactionTabs.Overview ? <TransactionOverView 
              transactionDetails = {txnOverViewData.transactionDetails}
              developerInfo={txnOverViewData.developerInfo}
            /> : <TransactionEvents transactionEventsData={txnEventData} />}
          </div>
        </div>
      </div>
    </div>
  )
}