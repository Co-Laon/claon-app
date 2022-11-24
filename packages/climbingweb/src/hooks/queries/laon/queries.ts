import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import {
  LaonFindResponse,
  UserPostDetailResponse,
} from 'climbingweb/types/response/laon';

/**
 * POST /laon/{nickname} api 의 query 함수
 *
 * @param nickname 라온 추가할 유저의 닉네임
 * @returns axiosResponse.data
 */
export const createLaon = async (nickname: string) => {
  try {
    const { data } = await axios.post<void>(`/laon/${nickname}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /laon/{nickname} api 의 query 함수
 *
 * @param nickname 라온을 취소할 유저의 닉네임
 * @returns axiosReponse.data
 */
export const deleteLaon = async (nickname: string) => {
  try {
    const { data } = await axios.delete<void>(`/laon/${nickname}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /laon api의 query 함수
 *
 * @param pageParam useInfiniteQuery의 pageParam
 * @returns axiosResponse.data
 */
export const findAllLaon = async (pageParam = 0) => {
  const { data } = await axios.get<Pagination<LaonFindResponse>>('/laon', {
    params: {
      page: pageParam,
    },
  });
  return data;
};

/**
 * GET /api/v1/laon/posts api query 함수
 * 라온 관계의 피드 3개월 치 fetch 하는 api, pagination
 *
 * @returns axiosResponse.data
 */
export const getLaonPost = async (pageParam = 0) => {
  try {
    const { data } = await axios.get<Pagination<UserPostDetailResponse>>(
      '/laon/posts',
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
