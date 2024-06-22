import { useGetEthprice } from '@/hooks/useGetEthPrice';
import { getCurrentTime, priceCalculator, timeAgo } from '@/utils/helpers'
import TimeAgo from '@/utils/TimeAgo';
import { ActualFee, TransactionDetails, TransactionDeveloperInfo } from '@/utils/types'
import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';

export default function TransactionOverView(props : {
  transactionDetails : TransactionDetails, 
  developerInfo : TransactionDeveloperInfo
}) {
  const {isLoading, error, data, isFetching} = useGetEthprice();
  const [calculatedFees, setCalculatedFees] = useState<{ eth : string , usd : string} | undefined>(undefined);

  console.log(calculatedFees,"vsd")

  useEffect(()=>{
    if(data){
      const value = priceCalculator(props.transactionDetails.actualFee, data); 
     setCalculatedFees(value);
    }
  }, [data]);

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
      <div className='grid gap-y-2 px-4'>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2  w-3/12">BLOCK NUMBER:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{props.transactionDetails.blockNumber}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">TIMESTAMP:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600"><span className='flex'> <TimeAgo unixTime={props.transactionDetails.timestamp} /> &nbsp; ({new Date(props.transactionDetails.timestamp * 1000).toUTCString()}) </span></p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">ACTUAL FEE:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{calculatedFees?.eth} ETH ({calculatedFees?.usd} USD)</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">MAX FEE:</h3>
          <p className="text-sm border-b w-9/12 pb-2  border-gray-600">{props.transactionDetails.maxFee} ETH</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">GAS CONSUMED:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{props.transactionDetails.gasConsumed}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">SENDER ADDRESS:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{props.transactionDetails.senderAddress}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-12">Developer Info</h1>
      <div className='grid gap-y-2 px-4'>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2  w-3/12">UNIX TIMESTAMP:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{props.transactionDetails.timestamp}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">NONCE:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{BigNumber.from(props.developerInfo.nonce).toString()}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">POSITION:</h3>
          <p className="text-sm border-b w-9/12 pb-2 border-gray-600">{props.developerInfo.position}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">VERSION:</h3>
          <p className="text-sm border-b w-9/12 pb-2  border-gray-600">{BigNumber.from(props.developerInfo.version).toString()}</p>
        </div>
        <div className=" flex flex-row gap-44 ">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">EXECUTION RESOURCES:</h3>
          <div className="text-xs border-b w-9/12 pb-2 border-gray-600">
            <div className='flex gap-x-4'>
              <ul className='py-1 px-1 rounded-lg bg-green-800 text-green-400'>{props.developerInfo.ExecutionResources.steps || 0} steps</ul>
              <ul className='py-1 px-1 rounded-lg bg-orange-800 text-orange-400'>{props.developerInfo.ExecutionResources.ecOpBuiltinApplications || 0} EC_OP_BUILTIN</ul>
              <ul className='py-1 px-1 rounded-lg bg-orange-800 text-orange-400'>{props.developerInfo.ExecutionResources.pedersenBuiltinApplications || 0} PEDERSEN_BUILTIN</ul>
              <ul className='py-1 px-1 rounded-lg bg-orange-800 text-orange-400'>{props.developerInfo.ExecutionResources.rangeCheckBuiltinApplications || 0} RANGE_CHECK_BUILTIN</ul>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-44">
          <h3 className="text-sm text-gray-400 pb-2 w-3/12">SIGNATURE(S):</h3>
          <div className='flex flex-col w-9/12'>
          {props.developerInfo.Signatures.map((val, idx) => {
            return <p key={idx} className="text-sm text-yellow-500 border-b  pb-2 border-gray-600">{val}</p>
          })}   
          </div>
        </div>
      </div>
    </div>
  )
}
