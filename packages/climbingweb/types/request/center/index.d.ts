import { CenterImg } from 'climbingweb/types/response/center';

export interface HoldInfoRequest {
  image: string;
  name: string;
}

export interface SectorInfoRequest {
  end: string;
  name: string;
  start: string;
}

export interface CenterCreateRequest {
  address: string;
  chargeList: Charge[];
  facilities: string;
  holdInfoImg: string;
  holdInfoList: HoldInfoRequest[];
  id: string;
  imgList: CenterImg[];
  instagramUrl: string;
  isBookmarked: boolean;
  name: string;
  operatingTimeList: OperatingTime[];
  postCount: number;
  reviewCount: number;
  sectorInfoList: SectorInfoRequest[];
  tel: string;
  webUrl: string;
  youtubeUrl: string;
}

/**
 * 작성자: 윤웅재
 * POST /api/v1/centers/{centerId}/report
 */
export interface CenterReportCreateRequest {
  content: string;
  reportType:
    | '사진'
    | '세팅일정'
    | '연락처'
    | '운영시간'
    | '이용요금'
    | '편의시설'
    | '홀드정보';
}

/**
 * 작성자: 윤웅재
 * PUT /api/v1/centers/review/{reivewId}
 */
export interface ReviewUpdateRequest {
  content: string;
  rank: number;
}
