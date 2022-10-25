import axios from 'axios';
import { HoldInfoResponse } from 'climbingweb/types/response/center';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

/**
 * GET /centers/${centerId}/hold api 의 query 함수
 *
 * @param centerId 홀드 리스트를 검색할 centerId 값
 * @returns axiosResponse.data
 */
const findHoldInfoByCenter = async (centerId?: string) => {
  const { data } = await axios.get<HoldInfoResponse[]>(
    `/centers/${centerId}/hold`
  );
  return data;
};

/**
 * GET /centers/${centerId}/hold api 의 useQuery hooks
 *
 * @param centerId /centers/${centerId}/hold api 의 centerId 에 해당하는 검색 값
 * @param options useQuery 추가 옵션, retry: 0, enabled: !!centerId 적용 중
 * @returns /centers/${centerId}/hold api 의 useQuery return 값
 */
export const useFindHoldInfoByCenter = <T = HoldInfoResponse>(
  centerId?: string,
  options?: Omit<
    UseQueryOptions<HoldInfoResponse[], unknown, T[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<HoldInfoResponse[], unknown, T[], QueryKey>(
    ['centerId', centerId],
    () => findHoldInfoByCenter(centerId),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerId,
      ...options,
    }
  );
};
