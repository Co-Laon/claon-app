import { ServerError, ServerBusinessError } from 'climbingweb/types/common';
import axios from 'axios';
import { CenterNameResponse } from 'climbingweb/types/response/center';
import { debounce } from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

/**
 * GET /centers/name/${centerName} api query 함수
 * @param centerName 암장 이름 검색 input 값
 * @returns axiosResponse.data
 */
const searchCenterName = debounce(
  async (centerName: string) => {
    try {
      const { data } = await axios.get<CenterNameResponse[]>(
        `/centers/name/${centerName}`
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
 * GET /centers/name/${centerName} api 를 통해 center 이름 리스트를 가지고 오는 useQuery hooks
 *
 * @param centerName /centers/name/${centerName} api 의 centerName 에 해당하는 검색 값
 * @param options useQuery 추가 옵션, retry: 0, enabled: !!centerName 적용 중
 * @returns /centers/name/${centerName} api 의 useQuery 를 return
 */
export const useSearchCenterName = (
  centerName: string,
  options?: Omit<
    UseQueryOptions<
      CenterNameResponse[],
      ServerError | ServerBusinessError,
      CenterNameResponse[],
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<CenterNameResponse[], ServerError | ServerBusinessError>(
    ['centerName', centerName],
    () => searchCenterName(centerName),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerName,
      ...options,
    }
  );
};
