import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import axios from 'axios';
import { CenterDetailResponse } from 'climbingweb/types/response/center';

/**
 * GET /centers/{centerId} api 의 query 함수
 *
 * @param centerId 검색할 암장의 centerId
 * @returns axiosReponse.data
 */
const findCenter = async (centerId: string) => {
  const { data } = await axios.get<CenterDetailResponse>(`centers/${centerId}`);
  return data;
};

/**
 * findCenter api 의 useQuery hooks
 *
 * @param centerId 검색할 암장의 cenerId
 * @param options findCenter api 의 useQuery 추가 옵션
 * @returns findCenter api 의 useQuery return 값
 */
export const useFindCenter = (
  centerId: string,
  options?: Omit<
    UseQueryOptions<
      CenterDetailResponse,
      unknown,
      CenterDetailResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<CenterDetailResponse>(
    ['findCenter', centerId],
    () => findCenter(centerId),
    {
      retry: 0,
      enabled: !!centerId,
      ...options,
    }
  );
};
