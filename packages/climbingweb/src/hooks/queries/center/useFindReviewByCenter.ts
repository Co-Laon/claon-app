import { ReviewBundleFindResponse } from './../../../../types/response/center/index.d';
import { ServerBusinessError } from './../../../../types/common/index.d';
import { ServerError } from 'climbingweb/types/common';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

/**
 * GET /centers/{centerId}/review api 의 query 함수
 *
 * @param centerId 리뷰를 검색할 center의 id 값
 * @returns axiosResponse.data
 */
const findReviewByCenter = async (centerId: string, pageParam: number) => {
  try {
    const { data } = await axios.get<ReviewBundleFindResponse>(
      `/centers/${centerId}/review`,
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
 * findReviewByCenter api 의 useInfiniteQuery hooks 함수
 *
 * @param centerId 리뷰를 검색할 center의 id 값
 * @returns findReviewByCenter api 의 useInfiniteQuery return 값
 */
export const useFindReviewByCenter = (centerId: string) => {
  return useInfiniteQuery<
    ReviewBundleFindResponse,
    ServerError | ServerBusinessError
  >(
    ['findReviewByCenter', centerId],
    (context) => findReviewByCenter(centerId, context.pageParam),
    {
      enabled: !!centerId,
      getNextPageParam: (lastPageData: ReviewBundleFindResponse) => {
        return lastPageData.otherReviewsPagination.nextPageNum < 0
          ? undefined
          : lastPageData.otherReviewsPagination.nextPageNum;
      },
    }
  );
};
