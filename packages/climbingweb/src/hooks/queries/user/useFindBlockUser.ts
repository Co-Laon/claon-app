import { BlockUserFindResponse } from './../../../../types/response/user/index.d';
import axios from 'axios';
import { Pagination, ServerError } from 'climbingweb/types/common';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';

/**
 * PUT /api/v1//users/block api query 함수
 *
 * @returns axiosResponse.data
 */
const findBlockUser = async (pageParam = 0) => {
  const { data } = await axios.get<Pagination<BlockUserFindResponse>>(
    '/users/block',
    {
      params: {
        page: pageParam,
      },
    }
  );
  return data;
};

/**
 * getNoticeList api (공지사항 리스트 확인) 의 useQuery hooks
 *
 * @returns getNoticeList api (공지사항 리스트 확인) 의 useQuery return 값
 */
export const useFindBlockUser = (
  options?: Omit<
    UseInfiniteQueryOptions<
      Pagination<BlockUserFindResponse>,
      ServerError,
      Pagination<BlockUserFindResponse>,
      Pagination<BlockUserFindResponse>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useInfiniteQuery<Pagination<BlockUserFindResponse>, ServerError>(
    ['findBlockUser'],
    (context) => findBlockUser(context.pageParam),
    {
      staleTime: 3000,
      getNextPageParam: (lastPageData: Pagination<BlockUserFindResponse>) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
      ...options,
    }
  );
};
