// @ts-ignore
import React from 'react';

function TransactionDetails({ data }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-white mb-4">Transaction Details</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Block Number:</span>
          <span className="font-medium text-white">{data.blockNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Timestamp:</span>
          <span className="font-medium text-white">{data.timestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Actual Fee:</span>
          <span className="font-medium text-white">{data.actualFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Max Fee:</span>
          <span className="font-medium text-white">{data.maxFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Gas Consumed:</span>
          <span className="font-medium text-white">{data.gasConsumed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Tokens Transferred:</span>
          <span className="font-medium text-white">{data.tokensTransferred}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Sender Address:</span>
          <span className="font-medium text-white">{data.senderAddress}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Class Hash:</span>
          <span className="font-medium text-white">{data.classHash}</span>
        </div>
      </div>
    </div>
  );
}


export default TransactionDetails;