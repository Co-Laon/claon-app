import axios from 'axios';
import { debounce } from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

//searchUser api 의 user 관련 정보 interface
interface User {
  imagePath: string;
  isLaon: boolean;
  nickname: string;
}

//searchUser api 의 response 관련 정보 interface
interface UserData {
  nextPageNum: number;
  previousPageNum: number;
  totalCount: number;
  results: User[];
}

/**
 * GET user/search api 의 query 함수
 *
 * @param searchUserName 검색할 유저 이름. query params 로 들어간다.
 * @returns axiosResponse.data
 */
const searchUser = debounce(
  async (searchUserName: string) => {
    const { data } = await axios.get<UserData>('/users/search', {
      params: {
        nickname: searchUserName,
      },
    });
    return data;
  },
  300,
  { leading: true }
);

/**
 * searchUser api (유저 이름 검색) 의 useQuery hooks
 *
 * @param searchUserName 검색할 유저 이름
 * @param options useQuery 의 추가 options
 * @returns searchUser api 의 useQuery return 값
 */
export const useSearchUser = (
  searchUserName: string,
  options?: Omit<
    UseQueryOptions<UserData, unknown, UserData, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<UserData>(
    ['searchUserName', searchUserName],
    () => searchUser(searchUserName),
    {
      retry: 0,
      enabled: !!searchUserName,
      ...options,
    }
  );
};
