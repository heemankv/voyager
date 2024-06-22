import { useGetEthprice } from '@/hooks/useGetEthPrice';
import { getCurrentTime, priceCalculator, timeAgo } from '@/utils/helpers'
import { ActualFee, TransactionDetails, TransactionDeveloperInfo } from '@/utils/types'
import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import Copy from '@/components/Copy';


export default function TransactionOverView(props : {
  transactionDetails : TransactionDetails, 
  developerInfo : TransactionDeveloperInfo
}) {
  const {isLoading, error, data, isFetching} = useGetEthprice();
  const [calculatedFees, setCalculatedFees] = useState<number | string>('0');

  console.log(calculatedFees,"vsd")

  useEffect(()=>{
    if(data){
      const value = priceCalculator(props.transactionDetails.actualFee, data); 
     setCalculatedFees(value);
    }
  }, [data]);

  return (
    <div className="px-6 py-4">
    <h2 className="text-2xl font-semibold">Transaction Details</h2>
    <br />

    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Block Number</p>
      <p className="text-white">{props.transactionDetails.blockNumber}</p>
    </div>

    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Timestamp</p>
      <p className="text-white">{timeAgo(getCurrentTime(),props.transactionDetails.timestamp)} ago </p>
    </div>
    <div id="block-number" className='flex flex-rows gap-4'>
      <p className="text-gray-400">Actual Fee</p>
      <p className="text-white">{Number(Number(calculatedFees)/ (10**18))} USD</p>
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
