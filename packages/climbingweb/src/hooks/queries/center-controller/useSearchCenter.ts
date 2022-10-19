import axios from 'axios';
import { debounce } from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

//searchCenter api 의 center 관련 정보 interface
interface Center {
  id: string;
  name: string;
  thumbnailUrl: string;
  reviewRank: number;
}

//searchCenter api response 관련 정보 interface
interface CenterData {
  nextPageNum: number;
  previousPageNum: number;
  totalCount: number;
  results: Center[];
}

/**
 * GET /center/search api 의 query 함수
 *
 * @param searchCenterName 검색할 암장 이름. query params 로 들어간다.
 * @returns axiosResponse.data
 */
const searchCenter = debounce(
  async (searchCenterName: string) => {
    const { data } = await axios.get<CenterData>('/centers/search', {
      params: {
        name: searchCenterName,
      },
    });
    return data;
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
        UseQueryOptions<CenterData, unknown, CenterData, QueryKey>,
        'queryKey' | 'queryFn'
      >
    | undefined
) => {
  return useQuery<CenterData>(
    ['searchCenterName', searchCenterName],
    () => searchCenter(searchCenterName),
    {
      retry: 0,
      enabled: !!searchCenterName,
      ...options,
    }
  );
};
