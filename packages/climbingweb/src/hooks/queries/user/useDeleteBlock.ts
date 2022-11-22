import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * DELETE /users/name/{blockNickname}/block api query 함수
 *
 * @param blockNickname 차단할 유저의 닉네임
 * @returns axiosResponse.data
 */
const deleteBlock = async (blockNickname: string) => {
  const { data } = await axios.delete<void>(
    `/users/name/${blockNickname}/block`
  );
  return data;
};

/**
 * deleteBlock api useMutation hooks
 *
 * @returns deleteBlock api useMutation return 값
 */
export const useDeleteBlock = (
  options?: Omit<
    UseMutationOptions<void, unknown, string, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(['deleteBlock'], deleteBlock, options);
};
