import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { CenterPreviewResponse } from 'climbingweb/types/response/center';

/**
 * GET /centers api 의 query 함수
 *
 * @param option getCenterList api option 값
 * @returns axiosResponse.data
 */
const getCenterList = async (
  option: 'bookmark' | 'new_setting' | 'newly_registered'
) => {
  const { data } = await axios.get<CenterPreviewResponse>('/centers', {
    params: {
      option: option,
    },
  });
  return data;
};

/**
 * getCenterList api useQuery hooks
 *
 * @param option getCenterList api 의 option 값 (bookmark, new_setting, newly_registered)
 * @param options useQuery 추가 옵션 값
 * @returns useQuery return 값
 */
export const useGetCenterList = (
  option: 'bookmark' | 'new_setting' | 'newly_registered',
  options?: Omit<
    UseQueryOptions<
      CenterPreviewResponse,
      unknown,
      CenterPreviewResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<CenterPreviewResponse>(
    ['getCenterList', option],
    () => getCenterList(option),
    {
      retry: 0,
      enabled: !!option,
      ...options,
    }
  );
};
