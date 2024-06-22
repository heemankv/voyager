import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/constants';

export function useTransactionList(index : number = 10) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      ky.post(
        `${baseURL}/transactions-list`,
        {
          json: {
            index
          }
        }
      ).json(),
  })
  return { isLoading, error, data, isFetching };
}
