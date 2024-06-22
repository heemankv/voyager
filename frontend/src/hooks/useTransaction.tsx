import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/constants';

export function useTransaction(transactionHash : string) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      ky.get(
        `${baseURL}/fetch-transaction-data/${transactionHash}`
      ).json(),
  })
  return { isLoading, error, data, isFetching };
}