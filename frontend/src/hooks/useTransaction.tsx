import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/utils/constants';
import { TransactionDetailsResponse, UseTransactionDetailsResponse } from '@/utils/types';
import { convertKeysToCamelCase } from '@/utils/helpers';

export function useTransaction(transactionHash : string) : UseTransactionDetailsResponse {
  const { isLoading, error, data, isFetching } = useQuery<TransactionDetailsResponse>({
    queryKey: ['repoData2'],
    queryFn: () =>
      ky.get(
        `${baseURL}/fetch-transaction-data/${transactionHash}`
      ).json().then(convertKeysToCamelCase),
  })
  return { isLoading, error, data, isFetching };
}