import { truncateHash } from '@/utils/helpers';
import TimeAgo from '@/utils/TimeAgo';
import { TransactionMetaData } from '@/utils/types';
import React from 'react';

const EventsRow: React.FC<any> = ({ id, blockNumber, timestamp }) => (
  <div className="flex items-center py-2 border-b border-gray-700">
    <div className="w-4/12 text-left text-blue-400 truncate">{(id)}</div>
    <div className="w-4/12 text-center text-blue-400 truncate">{truncateHash(id)}</div>
    <div className="w-4/12 text-right text-gray-400"><TimeAgo unixTime={timestamp} /></div>
  </div>
);

export default EventsRow;