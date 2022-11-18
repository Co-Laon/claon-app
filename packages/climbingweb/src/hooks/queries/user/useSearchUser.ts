import { UserPreviewResponse } from './../../../../types/response/user/index.d';
import axios from 'axios';
import {
  Pagination,
  ServerError,
  ServerBusinessError,
} from 'climbingweb/types/common';
import { debounce } from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

/**
 * GET user/search api 의 query 함수
 *
 * @param searchUserName 검색할 유저 이름. query params 로 들어간다.
 * @returns axiosResponse.data
 */
const searchUser = debounce(
  async (searchUserName: string) => {
    try {
      const { data } = await axios.get<Pagination<UserPreviewResponse>>(
        '/users/search',
        {
          params: {
            nickname: searchUserName,
          },
        }
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
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
    UseQueryOptions<
      Pagination<UserPreviewResponse>,
      ServerError | ServerBusinessError,
      Pagination<UserPreviewResponse>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    Pagination<UserPreviewResponse>,
    ServerError | ServerBusinessError
  >(['searchUserName', searchUserName], () => searchUser(searchUserName), {
    retry: 0,
    enabled: !!searchUserName,
    ...options,
  });
};
