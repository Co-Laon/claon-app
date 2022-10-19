import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';

interface CenterPreview {
  id: string;
  name: string;
  thumbnailUrl: string;
  reviewRank: number;
}

interface CenterPreviewResponse {
  nextPageNum: number;
  previousPageNum: number;
  results: CenterPreview[];
  totalCount: number;
}

// getCenterList api option 의 enum 값 정의를 위한 상수
const GET_CENTER_OPTION = {
  BOOKMARK: 'bookmark',
  NEW_SETTING: 'new_setting',
  NEWLY_REGISTERED: 'newly_registered',
} as const;

// getCenterList api option 의 enum 값
type GetCenterOption = typeof GET_CENTER_OPTION[keyof typeof GET_CENTER_OPTION];

/**
 * GET /centers api 의 query 함수
 *
 * @param option getCenterList api option 값
 * @returns axiosResponse.data
 */
const getCenterList = async (option: GetCenterOption) => {
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
  option: GetCenterOption,
  options?: Omit<
    UseQueryOptions<
      CenterPreviewResponse,
      unknown,
      CenterPreviewResponse,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(['getCenterList', option], () => getCenterList(option), {
    retry: 0,
    enabled: !!option,
    ...options,
  });
};
