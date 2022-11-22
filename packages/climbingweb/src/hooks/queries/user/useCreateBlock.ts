import { ServerError } from 'climbingweb/types/common';
import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * DELETE /users/name/{blockNickname}/block api query 함수
 *
 * @param blockNickname 차단할 유저의 닉네임
 * @returns axiosResponse.data
 */
const createBlock = async (blockNickname: string) => {
  const { data } = await axios.post<void>(`/users/name/${blockNickname}/block`);
  return data;
};

/**
 * createBlock api useMutation hooks
 *
 * @param blockNickname 차단할 유저의 닉네임
 * @param options createBlock api useMutation options
 * @returns createBlock api useMutation return 값
 */
export const useCreateBlock = (
  blockNickname: string,
  options?: Omit<
    UseMutationOptions<void, ServerError, void, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(
    ['createBlock', blockNickname],
    () => createBlock(blockNickname),
    options
  );
};
