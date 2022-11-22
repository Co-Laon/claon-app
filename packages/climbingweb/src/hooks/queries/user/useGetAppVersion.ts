import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { AppVersionFindResponse } from 'climbingweb/types/response/app-version';
import { ServerError } from 'climbingweb/types/common';

/**
 * GET /api/v1/app-versions/{storeType} api의 query 함수
 *
 * @param store 앱 스토어 타입
 * @returns axiosResponse.data
 */
const getAppVersion = async (store: 'ios' | 'aos') => {
  const { data } = await axios.get<AppVersionFindResponse>(
    `/app-versions/${store}`
  );
  return data;
};

/**
 * getAppVersion api (앱 버전 확인) 의 useQuery hooks
 *
 * @param store 앱 스토어 타입
 * @param options getAppVersion api (앱 버전 확인) 의 useQuery 추가 옵션
 * @returns getAppVersion api (앱 버전 확인) 의 useQuery return 값
 */
export const useGetAppVersion = (
  store: 'ios' | 'aos',
  options?: Omit<
    UseQueryOptions<
      AppVersionFindResponse,
      ServerError,
      AppVersionFindResponse,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    ['getAppVersion', store],
    () => getAppVersion(store),
    options
  );
};
