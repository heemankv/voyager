"use client";
import React from 'react'
import { useTransactionList } from '@/hooks/useTransactionsList'

export default function TransactionsListWrapper() {
  const {isLoading, error, data, isFetching} = useTransactionList();

  console.log("data", isLoading, error, data, isFetching );

  if (isLoading || isFetching) {
    return <TransactionsListPending />;
  }
  if (error) {
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

function TransactionsListError() {
  return (
    <div>
      <p>There was an error</p>
    </div>
  )
}

function TransactionsListView(data : any) {
  return (
    <div>
      <p>Transactions</p>
    </div>
  )
}