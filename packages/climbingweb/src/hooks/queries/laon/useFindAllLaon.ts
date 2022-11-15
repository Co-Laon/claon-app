import { LaonFindResponse } from './../../../../types/response/laon/index.d';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryKey,
} from 'react-query';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';

/**
 * GET /laon api의 query 함수
 *
 * @returns axiosResponse.data
 */
const findAllLaon = async (pageParam = 0) => {
  const { data } = await axios.get<Pagination<LaonFindResponse>>('/laon', {
    params: {
      page: pageParam,
    },
  });
  return data;
};

/**
 * findAllLaon api (라온 리스트 확인) 의 useQuery hooks
 *
 * @returns findAllLaon api (라온 리스트 확인) 의 useQuery return 값
 */
export const useFindAllLaon = (
  options?: Omit<
    UseInfiniteQueryOptions<
      Pagination<LaonFindResponse>,
      unknown,
      Pagination<LaonFindResponse>,
      Pagination<LaonFindResponse>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useInfiniteQuery<Pagination<LaonFindResponse>>(
    ['getNoticeList'],
    (context) => findAllLaon(context.pageParam),
    {
      staleTime: 3000,
      getNextPageParam: (lastPageData: Pagination<LaonFindResponse>) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
      ...options,
    }
  );
};
