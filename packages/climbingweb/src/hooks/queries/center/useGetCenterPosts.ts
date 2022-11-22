import {
  Pagination,
  ServerError,
  ServerBusinessError,
} from 'climbingweb/types/common';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { CenterPostThumbnailResponse } from 'climbingweb/types/response/center';

/**
 * GET /centers/{centerId}/posts api 의 query 함수
 *
 * @param centerId 검색할 암장의 id
 * @returns axiosReponse.data
 */
const getCenterPosts = async (centerId: string, pageParam: number) => {
  try {
    const { data } = await axios.get<Pagination<CenterPostThumbnailResponse>>(
      `/centers/${centerId}/posts`,
      {
        params: {
          page: pageParam,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * getCenterPosts api의 useInfiniteQuery 함수
 *
 * @param centerId 검색할 암장의 id
 * @returns getCenterPosts api의 useQuery return 값
 */
export const useGetCenterPosts = (centerId: string) => {
  return useInfiniteQuery<
    Pagination<CenterPostThumbnailResponse>,
    ServerError | ServerBusinessError
  >(
    ['getCenterPosts', centerId],
    (context) => getCenterPosts(centerId, context.pageParam),
    {
      enabled: !!centerId,
      getNextPageParam: (
        lastPageData: Pagination<CenterPostThumbnailResponse>
      ) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
    }
  );
};
