"use client";
import React, { useState } from 'react'
import { useTransactionList } from '@/hooks/useTransactionsList'
import TransactionRow from '@/components/TransactionRow';
import TabNavigation from '@/components/TabNavigation';
import { FilterTypes, TransactionsResponse } from '@/utils/types';

export default function TransactionsListWrapper() {
  const {isLoading, error, data, isFetching} = useTransactionList();

  console.log("data data", isLoading, error, data, isFetching);

  if (isLoading || isFetching) {
    return <TransactionsListPending />;
  }
  if (error || data === undefined ) {
    return <TransactionsListError />;
  }
  return <TransactionsListView data={data} />;
}

function TransactionsListPending() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}
// TODO : ensure that age works
// TODO: since this is fe level filtering, if we click on any filter that is not present, we'll have no data posssible

function TransactionsListError() {
  return (
    <div>
      <p>There was an error</p>
    </div>
  )
}

const TransactionsListView: React.FC<{ data: TransactionsResponse[] }> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState<FilterTypes>(FilterTypes.All);

  console.log(data, "transactionResponse")
  const transactions = [
    { status: 'pending', hash: '0x2efa...5bf3', type: 'INVOKE', block: 'PENDING', age: '4 minutes ago' },
    { status: 'pending', hash: '0x1b4a...63b3', type: 'INVOKE', block: 'PENDING', age: '4 minutes ago' },
    { status: 'pending', hash: '0x60eb...dd38', type: 'INVOKE', block: 'PENDING', age: '4 minutes ago' },
    { status: 'pending', hash: '0x13ac...fe39', type: 'INVOKE', block: 'PENDING', age: '4 minutes ago' },
    { status: 'pending', hash: '0x5f9b...2768', type: 'INVOKE', block: 'PENDING', age: '4 minutes ago' },
  ];

  // TODO: real data fetching logic
  // TODO : Filtering Logic

  return (
    <div className='rounded-lg'>
      <div className="bg-bgSecondary text-white">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <p className="text-gray-400">A list of transactions on Starknet</p>
      </div>
      <div className='w-[90%]'>
        <TabNavigation selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center py-2 border-b border-gray-700">
          <div className="w-1/12 text-center">STATUS</div>
          <div className="w-3/12">HASH</div>
          <div className="w-2/12 text-center">TYPE</div>
          <div className="w-3/12 text-center">BLOCK</div>
          <div className="w-2/12 text-right">AGE</div>
        </div>
        {transactions.map((txn, index) => (
          <TransactionRow key={index} {...txn} />
        ))}
      </div>
    </div>
    </div>
  )
}