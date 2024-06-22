import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/utils/constants';
import { convertKeysToCamelCase } from '@/utils/helpers';
import { TransactionsMetaResponse, UseTransactionListResult } from '@/utils/types';

export function useTransactionList(index: number = 0): UseTransactionListResult {
  const { isLoading, error, data, isFetching } = useQuery<TransactionsMetaResponse>({
    queryKey: ['repoData'],
    queryFn: () =>
      ky.post(`${baseURL}/transactions-list`, {
        json: { index },
      }).json().then(convertKeysToCamelCase),
  });

  return { isLoading, error, data, isFetching };
}