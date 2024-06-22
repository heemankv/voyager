"use client";
import TransactionEvents from '@/components/TransactionEvents';
import TransactionOverView from '@/components/TransactionOverView';
import { useTransaction } from '@/hooks/useTransaction';
import { TransactionDetails, TransactionDetailsData, TransactionDeveloperInfo, TransactionTabs } from '@/utils/types';
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
      tokensTransferred : undefined,
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
      l1TxnHash : transactionDetails.blockInformation.parentHash
    }
  }

  return (
    <div className='rounded-lg'>
      <div className="bg-bgSecondary text-white">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <br />
        <div id="hash">
          <p className="text-gray-400">Hash</p>
          <p className="text-white">{transactionDetails.transactionHash} Copy</p>
        </div>
        <div id="type-timestamp" className='grid grid-cols-2'>
          <div>
            <p className="text-gray-400">Type</p>
            <p className="text-white">{transactionDetails.type} Copy</p>
          </div>
          <div>
            <p className="text-gray-400">Type</p>
            <p className="text-white">{transactionDetails.type} Copy</p>

          </div>
        </div>
        <div id="status">
          <p className="text-gray-400">Status</p>
          <div> Received and Accepted on <span className='text-white'>L2</span></div>
        </div> 
      </div>
      <br />
      <div className="flex justify-left ml-8">
        <button
          onClick={() => setShowCaseTab(TransactionTabs.Overview)}
          className={`px-4 py-2 border border-gray-600 ${
            showCaseTab === TransactionTabs.Overview ? 'bg-gray-700' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setShowCaseTab(TransactionTabs.Events)}
          className={`px-4 py-2 border border-gray-600 ${
            showCaseTab === TransactionTabs.Events ? 'bg-gray-700' : ''
          }`}
        >
          Events
        </button>
      </div>
      {showCaseTab === TransactionTabs.Overview ? <TransactionOverView 
        transactionDetails = {txnOverViewData.transactionDetails}
        developerInfo={txnOverViewData.developerInfo}
      /> : <TransactionEvents data={data} />}
      
    </div>
    </div>
      
  )
}
