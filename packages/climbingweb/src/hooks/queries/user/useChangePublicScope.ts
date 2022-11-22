import axios from 'axios';
import { PublicScopeResponse } from 'climbingweb/types/response/user';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * PUT /api/v1//users/me/scope api query 함수
 *
 * @returns axiosResponse.data
 */
const changePublicScope = async () => {
  const { data } = await axios.put<PublicScopeResponse>('/users/me/scope');
  return data;
};

/**
 * changePublicScope api useMutation hooks
 *
 * @param options changePublicScope api useMutation 추가 옵션
 * @returns changePublicScope api useMutation return 값
 */
export const useChangePublicScope = (
  options?: Omit<
    UseMutationOptions<PublicScopeResponse, unknown, void, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(() => changePublicScope(), options);
};
