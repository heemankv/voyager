"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useTransactionList } from '@/hooks/useTransactionsList'
import TransactionRow from '@/components/TransactionRow';
import TabNavigation from '@/components/TabNavigation';
import { FilterTypes, TransactionMetaData, TransactionsMetaResponse } from '@/utils/types';

export default function TransactionsListWrapper() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    error,
    data,
    isFetching
  } = useTransactionList();

  if (status === 'pending') {
    return <TransactionsListPending />;
  }
  if (status === 'error' || error || data === undefined || data.pages.length === 0 ) {
    return <TransactionsListError />;
  }
  const transactions = data.pages.flatMap(page => page.data);
  return (
    <div className='m-24'>
      <TransactionsListView transactionsList={transactions} />
      <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
    </div>
  );
}

function TransactionsListPending() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}
// TODO: since this is fe level filtering, if we click on any filter that is not present, we'll have no data posssible

function TransactionsListError() {
  return (
    <div>
      <p>There was an error</p>
    </div>
  )
}

const TransactionsListView: React.FC<{ transactionsList: TransactionMetaData[] }> = ({ transactionsList }) => {
  const [selectedTab, setSelectedTab] = useState<FilterTypes>(FilterTypes.All);
  const [showCaseList, setShowCaseList] = useState<TransactionMetaData[]>(transactionsList);

  console.log(showCaseList, transactionsList, "showCaseList")

  useEffect(() => {
    if (selectedTab === FilterTypes.All) {
      setShowCaseList(transactionsList);
    } else {
      setShowCaseList(transactionsList.filter((txn) => txn.type === selectedTab));
    }
  }, [transactionsList, selectedTab]);

  if(setShowCaseList === undefined) { 
    return <div> Not there</div>
  }
  else{
    return (
      <div className='rounded-lg bg-bgSecondary text-white'>
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
          {showCaseList.map((txn, index) => (
            <TransactionRow key={index} {...txn} />
          ))}
        </div>
      </div>
    )
  }
}