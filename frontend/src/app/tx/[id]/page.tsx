"use client";
import Copy from '@/components/Copy';
import TransactionEvents from '@/components/TransactionEvents';
import TransactionOverView from '@/components/TransactionOverView';
import { useTransaction } from '@/hooks/useTransaction';
import { TransactionDetails, TransactionDetailsData, TransactionDeveloperInfo, TransactionEventsData, TransactionTabs } from '@/utils/types';
import { BigNumber } from 'ethers';
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
    <div className='bg-bgSecondary rounded-lg p-6 text-white m-24 pt-20 px-12'>
      Loading Transaction Data...
    </div>
  )
}

function IndividualTxnPageError() {
  return (
    <div className='bg-bgSecondary rounded-lg p-6 text-white m-24 pt-20 px-12'>
      There Was An Error.
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
      maxFee : BigNumber.from(transactionDetails.transactionMetaInformation.maxFee || 0).toNumber() / (10**18),
      senderAddress : transactionDetails.transactionMetaInformation.senderAddress,
      gasConsumed : BigNumber.from(transactionDetails.actualFee.amount).div(BigNumber.from(transactionDetails.blockInformation.l1GasPrice.priceInWei)).toString(),
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
    <div className='bg-bgSecondary rounded-lg p-6 text-white m-24 pt-20 px-12'>
          <h1 className="text-4xl font-bold mb-4">Transaction</h1>
          <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xs font-medium text-gray-400">HASH</h2>
                <div className='flex items-center'>
                <span className="">{transactionDetails.transactionHash}</span>
                <Copy text={transactionDetails.transactionHash} className='pl-2 w-6 h-6' />
                </div>
              </div>
            </div>
          <div className="py-6 rounded-lg">
            <div className="flex items-start gap-64 mb-6">
              <div>
                <h2 className="text-xs font-medium text-gray-400 pb-1">TYPE</h2>
                <div className='flex items-center'>
                <span className="bg-green-900  text-green-400 px-2 py-1 rounded">{transactionDetails.type}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-medium text-gray-400 pb-1">TIMESTAMP</h2>
                <p className="">{new Date(transactionDetails.blockInformation.timestamp * 1000).toUTCString()}</p>
              </div>
            </div>
              <h2 className="text-xs font-medium text-gray-400 pb-1">STATUS</h2>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="bg-green-800 text-xs px-3 py-2 rounded-3xl  mr-2">Received</span>
                <span className="bg-green-800 text-xs px-3 py-2 rounded-3xl ">Accepted on L2</span>
              </div>
            </div>
            <div className="flex gap-4 ">
              <button className="cursor-pointer border-b border-gray-700 hover:border-white text-lg py-2 text-gray-400 hover:text-white"
                 onClick={(e) =>{
                  e.preventDefault();
                  setShowCaseTab(TransactionTabs.Overview)
                }}
              >Overview</button>
                <button  className="cursor-pointertext-lg border-b border-gray-700 hover:border-white px-4 py-2 text-gray-400 hover:text-white"
                 onClick={(e) =>{
                  e.preventDefault();
                  setShowCaseTab(TransactionTabs.Events)
                }}
              ><p className=' flex items-center '>Events <p className='rounded-2xl ml-1 text-sm px-[4px] py-[2px] bg-black'>{txnEventData.length}</p></p></button>
            </div>

            {showCaseTab === TransactionTabs.Overview ? <TransactionOverView 
              transactionDetails = {txnOverViewData.transactionDetails}
              developerInfo={txnOverViewData.developerInfo}
            /> : <TransactionEvents transactionEventsData={txnEventData} />}
        </div>
    </div>
  )
}