import { useMutation, UseMutationOptions } from 'react-query';
import axios from 'axios';
import { ServerBusinessError, ServerError } from 'climbingweb/types/common';

/**
 * DELETE /laon/{nickname} api 의 query 함수
 *
 * @param nickname 라온을 취소할 유저의 닉네임
 * @returns axiosReponse.data
 */
const deleteLaon = async (nickname: string) => {
  try {
    const { data } = await axios.delete<void>(`/laon/${nickname}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * deleteLaon api 의 useMutation hooks
 *
 * @param options useMutation 추가 옵션
 * @returns deleteLaon api 의 useMutation return 값
 */
export const useDeleteLaon = (
  nickname: string,
  options?: Omit<
    UseMutationOptions<void, ServerError | ServerBusinessError, void, unknown>,
    'mutationFn'
  >
) => {
  return useMutation<void, ServerError | ServerBusinessError>(
    () => deleteLaon(nickname),
    options
  );
};
