import {
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/utils/constants';
import { convertKeysToCamelCase } from '@/utils/helpers';
import { TransactionsMetaResponse, UseTransactionListResult } from '@/utils/types';

// export function useTransactionList(index: number = 0): UseTransactionListResult {
//   const { isLoading, error, data, isFetching } = useQuery<TransactionsMetaResponse>({
//     queryKey: ['repoData'],
//     queryFn: () =>
//       ky.post(`${baseURL}/transactions-list`, {
//         json: { index },
//       }).json().then(convertKeysToCamelCase),
//   });

//   return { isLoading, error, data, isFetching };
// }

const fetchTransactions = async ({pageParam} : {pageParam : any}) => {
  const response = await ky.get(`${baseURL}/transactions-list?cursor=${pageParam}`)
  return response.json().then(convertKeysToCamelCase);
};

export function useTransactionList() {
  const { 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading, error, data, isFetching } =  useInfiniteQuery({
    queryKey: ['transactionsList'],
    queryFn: fetchTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })
  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    error,
    data,
    isFetching
  }
}
