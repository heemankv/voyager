import { useGetEthprice } from '@/hooks/useGetEthPrice';
import { getCurrentTime, priceCalculator, timeAgo } from '@/utils/helpers'
import { ActualFee, TransactionDetails, TransactionDeveloperInfo } from '@/utils/types'
import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';

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
    <div>
    <div className="border-t border-gray-700 pt-6">
      <h2 className="text-lg font-bold mb-4">Developer</h2>
      <div className="mb-4">
        <h3 className="text-sm font-medium">BLOCK NUMBER:</h3>
        <p className="text-gray-400">{props.transactionDetails.blockNumber}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium">TIMESTAMP:</h3>
        <p className="text-gray-400">{timeAgo(getCurrentTime(),props.transactionDetails.timestamp)} ago </p>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium">ACTUAL FEE:</h3>
        <p className="text-gray-400">{Number(Number(calculatedFees)/ (10**18))} USD</p>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium">MAX FEE:</h3>
        <p className="text-gray-400">{BigNumber.from(props.transactionDetails.maxFee).toNumber()}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium">GAS CONSUMED:</h3>
        <p className="text-gray-400">{props.transactionDetails.gasConsumed}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium">SENDER ADDRESS:</h3>
        <p className="text-gray-400">{props.transactionDetails.senderAddress}</p>
      </div>
      </div>
        <div className="border-t border-gray-700 pt-6">
        <h2 className="text-lg font-bold mb-4">Developer Info</h2>
        <div className="mb-4">
          <h3 className="text-sm font-medium">UNIX TIMESTAMP:</h3>
          <p className="text-gray-400">{props.developerInfo.unixTimestamp}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium">NONCE:</h3>
          <p className="text-gray-400">{props.developerInfo.nonce} ago </p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium">POSITION:</h3>
          <p className="text-gray-400">{props.developerInfo.position}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium">VERSION:</h3>
          <p className="text-gray-400">{props.developerInfo.version}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium">EXECUTION RESOURCES</h3>
          <p className="text-gray-400">{JSON.stringify(props.developerInfo.ExecutionResources)}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium">SIGNATURE(S):</h3>
          <p className="text-gray-400">{props.developerInfo.Signatures}</p>
        </div>
      </div>
    </div>
  )
}
