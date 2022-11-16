import { ServerError } from 'climbingweb/types/common';
import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import { UserDetailResponse } from '../../../../types/response/user';
import axios from 'axios';

/**
 * GET /users/me api의 query 함수
 *
 * @returns axiosResponse.data
 */
const retrieveMe = async () => {
  const { data } = await axios.get<UserDetailResponse>('/users/me');
  return data;
};

/**
 * retrieveMe api (나의 정보 확인) 의 useQuery hooks
 *
 * @param options retrieveMe api (나의 정보 확인) 의 useQuery 추가 옵션
 * @returns retrieveMe api (나의 정보 확인) 의 useQuery return 값
 */
export const useRetrieveMe = (
  options?: Omit<
    UseQueryOptions<
      UserDetailResponse,
      ServerError,
      UserDetailResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<UserDetailResponse, ServerError>(
    ['retrieveMe'],
    () => retrieveMe(),
    options
  );
};
