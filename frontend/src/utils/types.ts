export enum FilterTypes {
  All = 'All',
  Declare = 'declare',
  Deploy = 'deploy',
  DeployAccount = 'deploy_account',
  Invoke = 'invoke',
  L1Handler = 'l1_handler'
}

export interface TransactionRowProps {
  status: string;
  hash: string;
  type: string;
  block: string;
  age: string;
}

export interface TabNavigationProps {
  selectedTab: FilterTypes;
  onSelectTab: (tab: FilterTypes) => void;
}

// Transactions objects
export interface TransactionsResponse {
  blockNumber : number
  endIndex: number
  message: string
  startIndex: number
  data : TransctionData[]
}


export interface UseTransactionListResult {
  isLoading: boolean;
  error: Error | null;
  data: TransactionsResponse[] | undefined;
  isFetching: boolean;
}


export interface TransctionData {
  accountDeploymentData?: any[]
  calldata: string[]
  feeDataAvailabilityMode?: string
  nonce: string
  nonceDataAvailabilityMode?: string
  paymasterData?: any[]
  resourceBounds?: ResourceBounds
  senderAddress: string
  signature: string[]
  tip?: string
  transactionHash: string
  type: string
  version: string
  maxFee?: string
}


export interface TransactionFeaturedData {
  status : string
  hash : string
  type : string
  block : number
  timestamp : string
}

export interface ResourceBounds {
  l1Gas: Gas
  l2Gas: Gas
}

export interface Gas {
  maxAmount: string
  maxPricePerUnit: string
}
