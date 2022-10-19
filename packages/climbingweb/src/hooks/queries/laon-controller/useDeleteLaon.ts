import { useMutation, UseMutationOptions } from 'react-query';
import axios from 'axios';

/**
 * DELETE /laon/{nickname} api 의 query 함수
 *
 * @param nickname 라온을 취소할 유저의 닉네임
 * @returns axiosReponse.data
 */
const deleteLaon = async (nickname: string) => {
  const { data } = await axios.delete<void>(`/laon/${nickname}`);
  return data;
};

/**
 * deleteLaon api 의 useMutation hooks
 *
 * @param nickname 라온을 취소할 유저의 닉네임
 * @param options useMutation 추가 옵션
 * @returns deleteLaon api 의 useMutation return 값
 */
export const useDeleteLaon = (
  nickname: string,
  options?: Omit<UseMutationOptions<void, unknown, void, unknown>, 'mutationFn'>
) => {
  return useMutation<void>(() => deleteLaon(nickname), options);
};
