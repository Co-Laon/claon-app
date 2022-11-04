import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { PostDetailResponse } from 'climbingweb/types/response/post';
import { Pagination } from 'climbingweb/types/common';

/**
 * GET /api/v1/posts api query 함수
 * 추천 피드 fetch api, pagination
 *
 * @returns axiosResponse.data
 */
const getPosts = async ({ pageParam = 0 }) => {
  console.dir(`getPosts: ${pageParam}`);
  const { data } = await axios.get<Pagination<PostDetailResponse>>('/posts', {
    params: {
      size: 1,
      page: pageParam,
    },
  });
  return data;
};

/**
 * GET /api/v1/posts api useInfiniteQuery hooks
 * 추천 피드 fetch api, pagination, useInifinteQuery 훅
 *
 * @returns GET /api/v1/posts api 의 useInfiniteQuery return 값
 */
export const useGetPosts = () => {
  return useInfiniteQuery<Pagination<PostDetailResponse>>(
    ['getPosts'],
    getPosts,
    {
      staleTime: 3000,
      getNextPageParam: (lastPageData: Pagination<PostDetailResponse>) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
    }
  );
};
