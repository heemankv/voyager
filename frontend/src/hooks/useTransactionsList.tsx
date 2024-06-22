import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/utils/constants';
import { convertKeysToCamelCase } from '@/utils/helpers';
import { TransactionsResponse, UseTransactionListResult } from '@/utils/types';

export function useTransactionList(index: number = 10): UseTransactionListResult {
  const { isLoading, error, data, isFetching } = useQuery<TransactionsResponse[]>({
    queryKey: ['repoData'],
    queryFn: () =>
      ky.post(`${baseURL}/transactions-list`, {
        json: { index },
      }).json().then(convertKeysToCamelCase),
  });

  return { isLoading, error, data, isFetching };
}