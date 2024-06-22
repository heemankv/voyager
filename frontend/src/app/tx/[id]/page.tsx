"use client";
import { useTransaction } from '@/hooks/useTransaction';
import { useParams } from 'next/navigation';
import React from 'react'



function isValid(value : string | undefined) {
  // TODO: make better validations
  return value !== undefined;
}


export default function IndividualTxnPageIDWrapper() {
  const params = useParams<{ id: string;}>();

  console.log("id", params);

  if(isValid(params.id)){
    return <IndividualTxnPageWrapper 
      id={params.id}
    />;
  }
  else {
    return <IndividualTxnPageError />;
  }
}

function IndividualTxnPageWrapper(params : {id : string}) {
  const {isLoading, error, data, isFetching} = useTransaction(params.id);

  console.log("data", isLoading, error, data, isFetching );

  if (isLoading || isFetching) {
    return <IndividualTxnPagePending />;
  }
  if (error) {
    return <IndividualTxnPageError />;
  }
  return <IndividualTxnPageView data={data} />;

}
function IndividualTxnPagePending() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

function IndividualTxnPageError() {
  return (
    <div>
      <p>There was an error</p>
    </div>
  )
}

function IndividualTxnPageView(data : any) {
  return (
    <div>
      <p>Transaction View</p>
    </div>
  )
}