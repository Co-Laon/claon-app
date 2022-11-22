import { CenterBookmarkResponse } from './../../../../types/response/center/index.d';
import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { ServerBusinessError, ServerError } from 'climbingweb/types/common';

/**
 * GET /center/{centerId}/bookmark api 의 query 함수
 *
 * @param centerId 즐겨찾기 추가할 센터의 id
 * @returns axiosReponse.data
 */
const createCenterBookmark = async (centerId: string) => {
  try {
    const { data } = await axios.post<CenterBookmarkResponse>(
      `/centers/${centerId}/bookmark`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * createCenterBookmark api 의 useMutation hooks
 *
 * @param centerId 즐겨찾기 추가할 센터의 id
 * @param options useMutation 추가 옵션
 * @returns createCenterBookmark api 의 useMutation return 값
 */
export const useCreateCenterBookmark = (
  centerId: string,
  options?: Omit<
    UseMutationOptions<
      CenterBookmarkResponse,
      ServerError | ServerBusinessError,
      void,
      unknown
    >,
    'mutationFn'
  >
) => {
  return useMutation<CenterBookmarkResponse, ServerError | ServerBusinessError>(
    () => createCenterBookmark(centerId),
    options
  );
};
