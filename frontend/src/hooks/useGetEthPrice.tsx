import {
  useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { baseURL } from '@/utils/constants';
import { TransactionDetailsResponse, UseTransactionDetailsResponse } from '@/utils/types';
import { convertKeysToCamelCase } from '@/utils/helpers';

// {"ethereum":{"usd":3498.38}}

export function getPrice(obj: any) {
  return obj.ethereum.usd;
}

export function useGetEthprice() : any {
  const { isLoading, error, data, isFetching } = useQuery<number>({
    queryKey: ['ethPrice'],
    queryFn: () =>
      ky.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      ).json().then(getPrice),
  })
  return { isLoading, error, data, isFetching };
}
