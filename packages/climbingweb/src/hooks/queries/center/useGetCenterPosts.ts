import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import axios from 'axios';
import { CenterPostThumbnailResponse } from 'climbingweb/types/response/center';

/**
 * GET /centers/{centerId}/posts api 의 query 함수
 *
 * @param centerId 검색할 암장의 id
 * @returns axiosReponse.data
 */
const getCenterPosts = async (centerId: string) => {
  const { data } = await axios.get<CenterPostThumbnailResponse>(
    `/centers/${centerId}/posts`
  );
  return data;
};

/**
 * getCenterPosts api의 useQuery 함수
 *
 * @param centerId 검색할 암장의 id
 * @param options getCenterPosts api의 useQuery 추가 옵션
 * @returns getCenterPosts api의 useQuery return 값
 */
export const useGetCenterPosts = (
  centerId: string,
  options?: Omit<
    UseQueryOptions<
      CenterPostThumbnailResponse,
      unknown,
      CenterPostThumbnailResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<CenterPostThumbnailResponse>(
    ['getCenterPosts', centerId],
    () => getCenterPosts(centerId),
    { retry: 0, enabled: !!centerId, ...options }
  );
};
