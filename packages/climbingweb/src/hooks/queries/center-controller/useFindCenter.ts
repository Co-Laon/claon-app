import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';

export interface CenterDetailChargeElement {
  fee: string;
  name: string;
}

export interface CenterDetailCharge {
  chargeList: CenterDetailChargeElement[];
  image: string;
}

export interface HoldInfoResponse {
  crayonImage: string;
  id: string;
  image: string;
  name: string;
}

export interface CenterImg {
  url: string;
}

export interface OperatingTime {
  day: string;
  end: string;
  start: string;
}

export interface SectorInfoResponse {
  end: string;
  id: string;
  name: string;
  start: string;
}

export interface CenterDetailResponse {
  address: string;
  chargeList: CenterDetailCharge[];
  facilities: string;
  holdInfoImg: string;
  holdInfoList: HoldInfoResponse[];
  id: string;
  imgList: CenterImg[];
  instagramUrl: string;
  isBookmarked: boolean;
  name: string;
  operatingTimeList: OperatingTime[];
  postCount: number;
  reviewCount: number;
  sectorInfoList: SectorInfoResponse[];
  tel: string;
  webUrl: string;
  youtubeUrl: string;
}

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
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(['findCenter', centerId], () => findCenter(centerId), {
    retry: 0,
    enabled: !!centerId,
    ...options,
  });
};
