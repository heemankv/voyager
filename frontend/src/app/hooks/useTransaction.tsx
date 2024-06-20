import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/app/constants';

export function useTransaction(transactionHash : string) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      ky.get(
        `${baseURL}/fetch-transaction-data/${transactionHash}`
      ).json(),
  })
  return { isPending, error, data, isFetching };
}
