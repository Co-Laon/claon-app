import { ServerBusinessError } from './../../../../types/common/index.d';
import { ServerError } from 'climbingweb/types/common';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { ReviewListFindResponse } from 'climbingweb/types/response/center';

/**
 * GET /centers/{centerId}/review api 의 query 함수
 *
 * @param centerId 리뷰를 검색할 center의 id 값
 * @returns axiosResponse.data
 */
const findReviewByCenter = async (centerId: string) => {
  try {
    const { data } = await axios.get<ReviewListFindResponse>(
      `/centers/${centerId}/review`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * findReviewByCenter api 의 useQuery hooks 함수
 *
 * @param centerId 리뷰를 검색할 center의 id 값
 * @param options useQuery 추가 옵션
 * @returns findReviewByCenter api 의 useQuery return 값
 */
export const useFindReviewByCenter = (
  centerId: string,
  options?: Omit<
    UseQueryOptions<
      ReviewListFindResponse,
      ServerError | ServerBusinessError,
      ReviewListFindResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<ReviewListFindResponse, ServerError | ServerBusinessError>(
    ['findReviewByCenter', centerId],
    () => findReviewByCenter(centerId),
    { retry: 0, enabled: !!centerId, ...options }
  );
};
