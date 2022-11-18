import { ServerError, ServerBusinessError } from 'climbingweb/types/common';
import { useMutation, UseMutationOptions } from 'react-query';
import axios from 'axios';

/**
 * POST /laon/{nickname} api 의 query 함수
 *
 * @param nickname 라온 추가할 유저의 닉네임
 * @returns axiosResponse.data
 */
const createLaon = async (nickname: string) => {
  try {
    const { data } = await axios.post<void>(`/laon/${nickname}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * createLaon api 의 useMutation hooks
 *
 * @param nickname 라온 추가할 유저의 닉네임
 * @param options useMutation 추가 옵션
 * @returns createLaon api 의 useMutation return 값
 */
export const useCreateLaon = (
  nickname: string,
  options?: Omit<
    UseMutationOptions<void, ServerError | ServerBusinessError, void, unknown>,
    'mutationFn'
  >
) => {
  return useMutation<void, ServerError | ServerBusinessError>(
    () => createLaon(nickname),
    options
  );
};
