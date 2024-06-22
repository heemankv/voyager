// @ts-ignore
import React from 'react';

function DeveloperInfo({ data }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-xl font-bold text-white mb-4">Developer Info</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Unix Timestamp:</span>
          <span className="font-medium text-white">{data.unixTimestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Nonce:</span>
          <span className="font-medium text-white">{data.nonce}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Position:</span>
          <span className="font-medium text-white">{data.position}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Version:</span>
          <span className="font-medium text-white">{data.version}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">L1 Txn Hash:</span>
          <span className="font-medium text-white">{data.l1TxnHash}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Execution Resources:</span>
          <span className="font-medium text-white">{data.executionResources}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Signature(s):</span>
          <span className="font-medium text-white">{data.signatures.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

export default DeveloperInfo;