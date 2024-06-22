export enum FilterTypes {
  All = 'All',
  Declare = 'declare',
  Deploy = 'deploy',
  DeployAccount = 'deploy_account',
  Invoke = 'invoke',
  L1Handler = 'l1_handler'
}
export enum TransactionTabs {
  Overview = 'Overview',
  Events = 'Events'
}

export interface TransactionDetails {
  blockNumber : number
  timestamp : number
  actualFee : ActualFee
  maxFee : any
  gasConsumed : any
  tokensTransferred : any
  senderAddress : String
  classHash : String
}

export interface TransactionDeveloperInfo {
  unixTimestamp : number
  nonce : string | undefined
  position : number | undefined
  version : string
  l1TxnHash : String
  ExecutionResources : any
  Signatures : String[]
}


export interface TabNavigationProps {
  selectedTab: FilterTypes;
  onSelectTab: (tab: FilterTypes) => void;
}

// Transactions objects
export interface TransactionsMetaResponse {
  endIndex: number
  message: string
  startIndex: number
  data : TransactionMetaData[]
}

export interface TransactionMetaData{
  _id : string
  transactionHash : string
  timestamp : number
  type : string
  finalityStatus : string
  blockNumber : number
}


export interface UseTransactionListResult {
  isLoading: boolean;
  error: Error | null;
  data: TransactionsMetaResponse | undefined;
  isFetching: boolean;
}


export interface TransactionData {
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


// Individual TXN list

export interface UseTransactionDetailsResponse {
  isLoading: boolean;
  error: Error | null;
  data: TransactionDetailsResponse | undefined;
  isFetching: boolean;
}
export interface TransactionDetailsResponse {
  data: TransactionDetailsData
  message: string
}

export interface TransactionDetailsData {
  Id: string
  actualFee: ActualFee
  blockHash: string
  blockInformation: BlockInformation
  blockNumber: number
  events: Event[]
  executionResources: ExecutionResources
  executionStatus: string
  finalityStatus: string
  messagesSent: any[]
  transactionHash: string
  transactionMetaInformation: TransactionMetaInformation
  type: string
}

export interface ActualFee {
  amount: string
  unit: string
}

export interface BlockInformation {
  Id: number
  blockHash: string
  blockNumber: number
  l1DaMode: string
  l1DataGasPrice: GasPrice
  l1GasPrice: GasPrice
  newRoot: string
  parentHash: string
  sequencerAddress: string
  starknetVersion: string
  status: string
  timestamp: number
  transactionsLength: number
}

export interface GasPrice {
  priceInFri: string
  priceInWei: string
}

export interface Event {
  data: string[]
  from_address: string
  keys: string[]
}

export interface ExecutionResources {
  dataAvailability: DataAvailability
  ecOpBuiltinApplications: number
  pedersenBuiltinApplications: number
  rangeCheckBuiltinApplications: number
  steps: number
}

export interface DataAvailability {
  l1DataGas: number
  l1Gas: number
}

export interface TransactionMetaInformation {
  calldata: string[]
  maxFee: string
  nonce: string
  senderAddress: string
  signature: string[]
  transactionHash: string
  type: string
  version: string
}
