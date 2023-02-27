import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import {
  CenterReportCreateRequest,
  ReviewCreateRequest,
  ReviewUpdateRequest,
} from 'climbingweb/types/request/center';
import {
  CenterBookmarkResponse,
  CenterDetailResponse,
  CenterNameResponse,
  CenterPostThumbnailResponse,
  CenterPreviewResponse,
  CenterReportResponse,
  HoldInfoResponse,
  ReviewBundleFindResponse,
  ReviewResponse,
} from 'climbingweb/types/response/center';

/**
 * GET /centers api 의 query 함수
 *
 * @param option getCenterList api option 값
 * @returns axiosResponse.data
 */
export const getCenterList = async (
  option: 'bookmark' | 'new_setting' | 'newly_registered'
) => {
  try {
    const { data } = await axios.get<Pagination<CenterPreviewResponse>>(
      '/centers',
      {
        params: {
          option: option,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /centers/{centerId} api 의 query 함수
 *
 * @param centerId 검색할 암장의 centerId
 * @returns axiosReponse.data
 */
export const findCenter = async (centerId: string) => {
  try {
    const { data } = await axios.get<CenterDetailResponse>(
      `centers/${centerId}`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /center/{centerId}/bookmark api 의 query 함수
 *
 * @param centerId 즐겨찾기 추가할 센터의 id
 * @returns axiosReponse.data
 */
export const createCenterBookmark = async (centerId: string) => {
  try {
    const { data } = await axios.post<CenterBookmarkResponse>(
      `/centers/${centerId}/bookmark`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /center/{centerId}/bookmark api 의 query 함수
 *
 * @param centerId 즐겨찾기 삭제할 센터의 id
 * @returns axiosReponse.data
 */
export const deleteCenterBookmark = async (centerId: string) => {
  try {
    const { data } = await axios.delete<void>(`/centers/${centerId}/bookmark`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /centers/${centerId}/hold api 의 query 함수
 *
 * @param centerId 홀드 리스트를 검색할 centerId 값
 * @returns axiosResponse.data
 */
export const findHoldInfoByCenter = async (centerId: string) => {
  try {
    const { data } = await axios.get<HoldInfoResponse[]>(
      `/centers/${centerId}/hold`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /centers/{centerId}/posts api 의 query 함수
 *
 * @param centerId 검색할 암장의 id
 * @returns axiosReponse.data
 */
export const getCenterPosts = async (
  centerId: string,
  pageParam: number,
  hold: string | undefined
) => {
  try {
    const { data } = await axios.get<Pagination<CenterPostThumbnailResponse>>(
      `/centers/${centerId}/posts`,
      {
        params: {
          page: pageParam,
          holdId: hold,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * POST /center/{centerId}/report api 의 query 함수
 *
 * @param centerId 수정 신청할 센터의 id
 * @param reportCreateRequest 수정 신청 내용
 * @returns axiosReponse.data
 */
export const createCenterReport = async (
  centerId: string,
  reportCreateRequest: CenterReportCreateRequest
) => {
  try {
    const { data } = await axios.post<CenterReportResponse>(
      `/centers/${centerId}/report`,
      reportCreateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /centers/{centerId}/review api 의 query 함수
 *
 * @param centerId 리뷰를 검색할 center의 id 값
 * @returns axiosResponse.data
 */
export const findReviewByCenter = async (
  centerId: string,
  pageParam: number
) => {
  try {
    const { data } = await axios.get<ReviewBundleFindResponse>(
      `/centers/${centerId}/review`,
      {
        params: {
          page: pageParam,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /center/search api 의 query 함수
 *
 * @param searchCenterName 검색할 암장 이름
 * @returns axiosResponse.data
 */
export const searchCenter = async (searchCenterName: string) => {
  try {
    const { data } = await axios.get<Pagination<CenterPreviewResponse>>(
      '/centers/search',
      {
        params: {
          name: searchCenterName,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /centers/name/${centerName} api query 함수
 *
 * @param centerName 암장 이름 검색 input 값
 * @returns axiosResponse.data
 */
export const searchCenterName = async (centerName: string) => {
  try {
    const { data } = await axios.get<CenterNameResponse[]>(
      `/centers/name/${centerName}`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * POST /centers/{centerId}/review api 의 query 함수
 *
 * @param centerId 리뷰를 작성할 센터의 id 값
 * @param reviewCreateRequest 리뷰 작성 내용
 * @returns axiosResponse.data
 */
export const createReview = async (
  centerId: string,
  reviewCreateRequest: ReviewCreateRequest
) => {
  try {
    const { data } = await axios.post<ReviewResponse>(
      `/centers/${centerId}/review`,
      reviewCreateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * PUT /centers/review/{reviewId} api 의 query 함수
 *
 * @param reviewId 수정할 리뷰의 id 값
 * @param reviewUpdateRequest 수정할 리뷰 내용
 * @returns axiosResponse.data
 */
export const updateReview = async (
  reviewId: string,
  reviewUpdateRequest: ReviewUpdateRequest
) => {
  try {
    const { data } = await axios.put<ReviewResponse>(
      `/centers/review/${reviewId}`,
      reviewUpdateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /centers/review/{reviewId} api 의 query 함수
 *
 * @param reviewId 삭제할 리뷰의 id 값
 * @returns
 */
export const deleteReview = async (reviewId: string) => {
  try {
    const { data } = await axios.delete<void>(`/centers/review/${reviewId}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
