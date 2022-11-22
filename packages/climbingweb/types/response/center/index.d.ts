import { Pagination } from '../../common/index';
/**
 * 작성자: 윤웅재
 * GET /api/v1/centers
 * 특이사항: Pagination«CenterPreviewResponseDto»
 */
export interface CenterPreviewResponse {
  id: string;
  name: string;
  reviewRank: number;
  thumbnailUrl: string;
}

/**
 * 작성자: 윤웅재
 * POST /api/v1/centers
 */
export interface ChargeElement {
  fee: string;
  name: string;
}

export interface Charge {
  chargeList: ChargeElement[];
  image: string;
}

export interface CenterImg {
  url: string;
}

export interface OperatingTime {
  day: string;
  end: string;
  start: string;
}

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/{centerId}
 */
export interface HoldInfoResponse {
  crayonImage: string;
  id: string;
  image: string;
  name: string;
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
  chargeList: Charge[];
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
 * 작성자: 윤웅재
 * POST /api/v1/centers/{centerId}/bookmark
 */
export interface CenterBookmarkResponse {
  address: string;
  centerId: string;
  chargeList: Charge[];
  facilities: string;
  holdInfoImg: string;
  imgList: CenterImg[];
  instagramUrl: string;
  isBookmarked: boolean;
  name: string;
  operatingTimeList: [];
  sectorInfoList: OperatingTime[];
  tel: string;
  webUrl: string;
  youtubeUrl: string;
}

/**
 * 작성자: 윤웅재
 * DELETE /api/v1/centers/{centerId}/bookmark
 * 특이사항: 200 OK
 */

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/{centerId}/hold
 */
export interface HoldInfoResponse {
  crayonImage: string;
  id: string;
  image: string;
  name: string;
}

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/{centerId}/posts
 * 특이사항: Pagination«CenterPostThumbnailResponseDto»
 */
export interface CenterPostThumbnailResponse {
  postId: string;
  thumbnailUrl: string;
}

/**
 * 작성자: 윤웅재
 * GET /api​/v1​/centers​/{centerId}​/report
 */
export interface CenterReportResponse {
  centerId: string;
  centerName: string;
  content: string;
  id: string;
  reportType:
    | '사진'
    | '세팅일정'
    | '연락처'
    | '운영시간'
    | '이용요금'
    | '편의시설'
    | '홀드정보';
  reporterNickname: string;
  reporterProfileImage: string;
}

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/{centerId}/review
 */
export interface ReviewListFindResponse {
  centerId: string;
  rank: number;
  reviewFindResponseDtoPagination: Pagination<ReviewFindResponse>;
}

export interface ReviewFindResponse {
  content: string;
  createdAt: string;
  rank: number;
  reviewId: string;
  reviewerNickname: string;
  reviewerProfileImage: string;
  updatedAt: string;
}

/**
 * 작성자: 윤웅재
 * POST /api/v1/centers/{centerId}/review
 */
export interface ReviewResponse {
  centerId: string;
  content: string;
  rank: number;
  reviewId: string;
}

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/name/{keyword}
 */
export interface CenterNameResponse {
  id: string;
  name: string;
}

export interface ReviewResponse {
  centerId: string;
  content: string;
  rank: number;
  reviewId: string;
}

/**
 * 작성자: 윤웅재
 * DELETE /api/v1/centers/review/{reivewId}
 * 특이사항: ReviewResponse 사용
 */

/**
 * 작성자: 윤웅재
 * GET /api/v1/centers/search
 * 특이사항: Pagination«CenterPreviewResponseDto»
 */
