import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import { IndividualUserResponse } from './../../../../types/response/user/index.d';
import axios from 'axios';

/**
 * GET /users/name/{nickname} api의 query 함수
 *
 * @returns axiosResponse.data
 */
const getPublicUser = async (userNickname?: string) => {
  const { data } = await axios.get<IndividualUserResponse>(
    `/users/name/${userNickname}`
  );
  return data;
};

/**
 * getPublicUser api (한명의 유저 정보 확인) 의 useQuery hooks
 *
 * @param userNickname 검색할 한명의 유저 닉네임
 * @param options getPublicUser api (한명의 유저 정보 확인) 의 useQuery 추가 옵션
 * @returns getPublicUser api (한명의 유저 정보 확인) useQuery return 값
 */
export const useGetPublicUser = (
  userNickname?: string,
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
    ['getPublicUser', userNickname],
    () => getPublicUser(userNickname),
    {
      enabled: !!userNickname,
      ...options,
    }
  );
};
