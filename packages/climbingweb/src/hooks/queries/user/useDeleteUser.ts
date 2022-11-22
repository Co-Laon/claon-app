import { ServerError } from 'climbingweb/types/common';
import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * DELETE /users/me api 의 query 함수
 *
 * @returns axiosReponse.data
 */
const deleteUser = async () => {
  const { data } = await axios.delete<void>('/users/me');
  return data;
};

/**
 * deleteUser api 의 query 함수
 *
 * @param options useMutation 추가 옵션
 * @returns deleteUser api 의 useMutation return 값
 */
export const useDeleteUser = (
  options?: Omit<
    UseMutationOptions<void, ServerError, void, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(['deleteUser'], deleteUser, options);
};
