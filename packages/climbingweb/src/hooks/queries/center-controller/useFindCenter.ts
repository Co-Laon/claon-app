import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';

interface CenterDetailChargeElement {
  fee: string;
  name: string;
}

interface CenterDetailCharge {
  chargeList: CenterDetailChargeElement[];
  image: string;
}

interface HoldInfoResponse {
  crayonImage: string;
  id: string;
  image: string;
  name: string;
}

interface CenterImg {
  url: string;
}

interface OperatingTime {
  day: string;
  end: string;
  start: string;
}

interface SectorInfoResponse {
  end: string;
  id: string;
  name: string;
  start: string;
}

interface CenterDetailResponse {
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

const findCenter = async (centerId: string) => {
  const { data } = await axios.get<CenterDetailResponse>(`centers/${centerId}`);
  return data;
};

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
