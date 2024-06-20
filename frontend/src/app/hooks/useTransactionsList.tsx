import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/app/constants';

export function useTransaction(index : number = 0) {
  const { isPending, error, data, isFetching } = useQuery({
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
  return { isPending, error, data, isFetching };
}
