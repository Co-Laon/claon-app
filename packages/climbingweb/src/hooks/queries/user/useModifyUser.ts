import axios from 'axios';
import { UserRequest } from 'climbingweb/types/request/user';
import { UserResponse } from 'climbingweb/types/response/user';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * PUT /users/me api query 함수
 *
 * @param userRequest 변경할 유저 정보
 * @returns axiosResponse.data
 */
const modifyUser = async (userRequest: UserRequest) => {
  const { data } = await axios.put('/users/me/account', userRequest);
  return data;
};

/**
 * modifyUser api useMutation hooks
 *
 * @param userRequest 변경할 유저 정보
 * @param options modifyUser api useMutation hooks options
 * @returns modifyUser api useMutation return 값
 */
export const useModifyUser = (
  userRequest: UserRequest,
  options?: Omit<
    UseMutationOptions<UserResponse, unknown, void, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(() => modifyUser(userRequest), options);
};
