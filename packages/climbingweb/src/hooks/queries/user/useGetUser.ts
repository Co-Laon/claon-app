import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import { IndividualUserResponse } from './../../../../types/response/user/index.d';
import axios from 'axios';

/**
 * GET /users/me api의 query 함수
 *
 * @returns axiosResponse.data
 */
const getUser = async () => {
  const { data } = await axios.get<IndividualUserResponse>('/users/me');
  return data;
};

/**
 * getUser api (나의 정보 확인) 의 useQuery hooks
 *
 * @param options getUser api (나의 정보 확인) 의 useQuery 추가 옵션
 * @returns getUser api (나의 정보 확인) 의 useQuery return 값
 */
export const useGetUser = (
  options?: Omit<
    UseQueryOptions<
      IndividualUserResponse,
      unknown,
      IndividualUserResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<IndividualUserResponse>(
    ['getUser'],
    () => getUser(),
    options
  );
};
