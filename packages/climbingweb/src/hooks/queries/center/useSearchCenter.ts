import axios from 'axios';
import {
  Pagination,
  ServerBusinessError,
  ServerError,
} from 'climbingweb/types/common';
import { CenterPreviewResponse } from 'climbingweb/types/response/center';
import { debounce } from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

/**
 * GET /center/search api 의 query 함수
 *
 * @param searchCenterName 검색할 암장 이름. query params 로 들어간다.
 * @returns axiosResponse.data
 */
const searchCenter = debounce(
  async (searchCenterName: string) => {
    try {
      const { data } = await axios.get<Pagination<CenterPreviewResponse>>(
        '/centers/search',
        {
          params: {
            name: searchCenterName,
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
 * searchCenter api (암장 이름 검색) 의 useQuery hooks
 *
 * @param searchCenterName 검색할 암장 이름
 * @param options useQuery의 추가적인 options
 * @returns /center/search api 의 useQuery return 값
 */
export const useSearchCenter = (
  searchCenterName: string,
  options?:
    | Omit<
        UseQueryOptions<
          Pagination<CenterPreviewResponse>,
          ServerError | ServerBusinessError,
          Pagination<CenterPreviewResponse>,
          QueryKey
        >,
        'queryKey' | 'queryFn'
      >
    | undefined
) => {
  return useQuery<
    Pagination<CenterPreviewResponse>,
    ServerError | ServerBusinessError
  >(['searchCenter', searchCenterName], () => searchCenter(searchCenterName), {
    retry: 0,
    enabled: !!searchCenterName,
    ...options,
  });
};
