import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryKey,
} from 'react-query';
import { UserPostThumbnailResponse } from './../../../../types/response/user/index.d';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';

/**
 * GET /users/name/{nickname}/posts api의 query 함수
 *
 * @returns axiosResponse.data
 */
const findPostsByUser = async (pageParam = 0, nickname?: string) => {
  const { data } = await axios.get<Pagination<UserPostThumbnailResponse>>(
    `/users/name/${nickname}/posts`,
    {
      params: {
        page: pageParam,
      },
    }
  );
  return data;
};

/**
 * findPostsByUser api (개인 post 내용 확인) 의 useQuery hooks
 *
 * @param nickname 개인 post 내용 검색 할 유저의 닉네임
 * @returns findPostsByUser api (개인 post 내용 확인) 의 useQuery return 값
 */
export const useFindPostsByUser = (
  nickname?: string,
  options?: Omit<
    UseInfiniteQueryOptions<
      Pagination<UserPostThumbnailResponse>,
      unknown,
      Pagination<UserPostThumbnailResponse>,
      Pagination<UserPostThumbnailResponse>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useInfiniteQuery<Pagination<UserPostThumbnailResponse>>(
    ['findPostsByUser', nickname],
    (context) => findPostsByUser(context.pageParam, nickname),
    {
      enabled: !!nickname,
      staleTime: 300,
      getNextPageParam: (
        lastPageData: Pagination<UserPostThumbnailResponse>
      ) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
      ...options,
    }
  );
};
