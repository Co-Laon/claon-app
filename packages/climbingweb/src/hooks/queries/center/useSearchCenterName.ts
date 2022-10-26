import axios from 'axios';
import { CenterNameResponse } from 'climbingweb/types/response/center';
import _ from 'lodash';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

/**
 * GET /centers/name/${centerName} api query 함수
 * @param centerName 암장 이름 검색 input 값
 * @returns axiosResponse.data
 */
const searchCenterName = _.debounce(
  async (centerName: string) => {
    const { data } = await axios.get<CenterNameResponse[]>(
      `/centers/name/${centerName}`
    );
    return data;
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
      unknown,
      CenterNameResponse[],
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<CenterNameResponse[]>(
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
