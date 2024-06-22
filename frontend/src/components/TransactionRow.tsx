import { truncateHash } from '@/utils/helpers';
import TimeAgo from '@/utils/TimeAgo';
import { TransactionMetaData } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Copy from '@/components/Copy';

const TransactionRow: React.FC<TransactionMetaData> = ({ transactionHash, type, blockNumber, timestamp }) => (
  <div className="flex items-center py-2 border-b border-gray-700">
    <div className="w-1/12 text-left pl-2">
      <Image 
        className='inline-block w-6 h-6'
        src="/status.svg"
        alt="Transaction status"
        width={40}
        height={40}
        />
    </div>
    <div className="w-3/12 flex items-center text-blue-400 truncate">
      <Link 
        href={`/tx/${transactionHash}`}
      >
        {truncateHash(transactionHash)}
      </Link>
      <Copy text={transactionHash} className='flex pl-2 w-6 h-6 items-center'/>
    </div>
    <div className="w-2/12 text-center">
      <span className="bg-green-900 text-green-400 px-2 py-1 rounded">{type}</span>
    </div>
    <div className="w-3/12 text-center">
      <span className=" bg-yellow-800 text-yellow-400 px-2 py-1 rounded">{blockNumber}</span>
      <Copy text={blockNumber.toString()} className='pl-2 w-6 h-6'/>
    </div>
    <div className="w-2/12 text-right text-gray-400"><TimeAgo unixTime={timestamp} /></div>
  </div>
);

export default TransactionRow;