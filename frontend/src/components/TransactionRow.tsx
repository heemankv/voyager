import { TransactionRowProps } from '@/utils/types';
import React from 'react';

const TransactionRow: React.FC<TransactionRowProps> = ({ status, hash, type,  block, age }) => (
  <div className="flex items-center py-2 border-b border-gray-700">
    <div className="w-1/12 text-center">
      <div className="inline-block w-4 h-4 bg-green-500 rounded-full"></div>
    </div>
    <div className="w-3/12 text-blue-400 truncate">{hash}</div>
    <div className="w-2/12 text-center">
      <span className="bg-green-900 text-green-400 px-2 py-1 rounded">{type}</span>
    </div>
    <div className="w-3/12 text-center">
      <span className="bg-yellow-800 text-yellow-400 px-2 py-1 rounded">{block}</span>
    </div>
    <div className="w-2/12 text-right text-gray-400">{age}</div>
  </div>
);

export default TransactionRow;