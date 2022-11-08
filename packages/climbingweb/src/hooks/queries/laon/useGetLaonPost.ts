import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import { UserPostDetailResponse } from 'climbingweb/types/response/laon';

/**
 * GET /api/v1/laon/posts api query 함수
 * 라온 관계의 피드 3개월 치 fetch 하는 api, pagination
 *
 * @returns axiosResponse.data
 */
const getLaonPost = async ({ pageParam = 0 }) => {
  const { data } = await axios.get<Pagination<UserPostDetailResponse>>(
    '/laon/posts',
    {
      params: {
        page: pageParam,
      },
    }
  );
  return data;
};

/**
 * GET /api/v1/laon/posts api useInfiniteQuery hooks
 * 라온 관계의 피드 3개월 치 fetch 하는 api, pagination useInfiniteQuery 훅
 *
 * @returns GET /api/v1/laon/posts api의 useInfiniteQuery return 값
 */
export const useGetLaonPost = () => {
  return useInfiniteQuery<Pagination<UserPostDetailResponse>>(
    ['getLaonPost'],
    getLaonPost,
    {
      staleTime: 3000,
      getNextPageParam: (lastPageData: Pagination<UserPostDetailResponse>) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
    }
  );
};
