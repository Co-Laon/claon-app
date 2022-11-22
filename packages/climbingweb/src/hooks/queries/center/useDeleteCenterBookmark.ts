import axios from 'axios';
import { ServerBusinessError, ServerError } from 'climbingweb/types/common';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * DELETE /center/{centerId}/bookmark api 의 query 함수
 *
 * @param centerId 즐겨찾기 삭제할 센터의 id
 * @returns axiosReponse.data
 */
const deleteCenterBookmark = async (centerId: string) => {
  try {
    const { data } = await axios.delete(`/centers/${centerId}/bookmark`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * deleteCenterBookmark api 의 useMutation hooks
 *
 * @param centerId 즐겨찾기 삭제할 센터의 id
 * @param options useMutation 추가 옵션
 * @returns deleteCenterBookmark api 의 useMutation return 값
 */
export const useDeleteCenterBookmark = (
  centerId: string,
  options?: Omit<
    UseMutationOptions<void, ServerError | ServerBusinessError, void, unknown>,
    'mutationFn'
  >
) => {
  return useMutation<void, ServerError | ServerBusinessError>(
    () => deleteCenterBookmark(centerId),
    options
  );
};
