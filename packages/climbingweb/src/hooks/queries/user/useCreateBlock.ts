import { ServerError } from 'climbingweb/types/common';
import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const createBlock = async (blockNickname: string) => {
  const { data } = await axios.post<void>(`/users/name/${blockNickname}/block`);
  return data;
};

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
