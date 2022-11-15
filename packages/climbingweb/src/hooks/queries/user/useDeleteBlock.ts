import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * DELETE /users/name/{blockNickname}/block api query 함수
 *
 * @returns axiosResponse.data
 */
const deleteBlock = async (blockNickname: string) => {
  const { data } = await axios.delete(`/posts/${blockNickname}/like`);
  return data;
};

/**
 * deleteBlock api useMutation hooks
 *
 * @returns deleteBlock api useMutation return 값
 */
export const useDeleteBlock = (
  options?: Omit<
    UseMutationOptions<any, unknown, string, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(['deleteBlock'], deleteBlock, options);
};
