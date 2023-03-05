import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import { UserRequest } from 'climbingweb/types/request/user';
import {
  BlockUserFindResponse,
  HistoryDateResponse,
  PublicScopeResponse,
  UserDetailResponse,
  UserPostThumbnailResponse,
  UserPreviewResponse,
  UserResponse,
} from 'climbingweb/types/response/user';

/**
 * PUT /api/v1//users/me/scope api query 함수
 *
 * @returns axiosResponse.data
 */
export const changePublicScope = async () => {
  try {
    const { data } = await axios.put<PublicScopeResponse>('/users/me/scope');
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /users/name/{blockNickname}/block api query 함수
 *
 * @param blockNickname 차단할 유저의 닉네임
 * @returns axiosResponse.data
 */
export const createBlock = async (blockNickname: string) => {
  try {
    const { data } = await axios.post<void>(
      `/users/name/${blockNickname}/block`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /users/name/{blockNickname}/block api query 함수
 *
 * @param blockNickname 차단할 유저의 닉네임
 * @returns axiosResponse.data
 */
export const deleteBlock = async (blockNickname: string) => {
  try {
    const { data } = await axios.delete<void>(
      `/users/name/${blockNickname}/block`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /users/me api 의 query 함수
 *
 * @returns axiosReponse.data
 */
export const deleteUser = async () => {
  try {
    const { data } = await axios.delete<void>('/users/me');
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * PUT /api/v1//users/block api query 함수
 *
 * @returns axiosResponse.data
 */
export const findBlockUser = async (pageParam = 0) => {
  try {
    const { data } = await axios.get<Pagination<BlockUserFindResponse>>(
      '/users/block',
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
 * GET /users/name/{nickname}/posts api의 query 함수
 *
 * @returns axiosResponse.data
 */
export const findPostsByUser = async (pageParam = 0, nickname?: string) => {
  try {
    const { data } = await axios.get<Pagination<UserPostThumbnailResponse>>(
      `/users/name/${nickname}/posts`,
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
 * GET /users/name/{nickname} api의 query 함수
 *
 * @returns axiosResponse.data
 */
export const getPublicUser = async (userNickname?: string) => {
  try {
    const { data } = await axios.get<UserDetailResponse>(
      `/users/name/${userNickname}`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * PUT /users/me api query 함수
 *
 * @param userRequest 변경할 유저 정보
 * @returns axiosResponse.data
 */
export const modifyUser = async (userRequest: UserRequest) => {
  try {
    const { data } = await axios.put('/users/me/account', userRequest);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /users/me api의 query 함수
 *
 * @returns axiosResponse.data
 */
export const retrieveMe = async () => {
  try {
    const { data } = await axios.get<UserDetailResponse>('/users/me');
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET user/search api 의 query 함수
 *
 * @param searchUserName 검색할 유저 이름. query params 로 들어간다.
 * @returns axiosResponse.data
 */
export const searchUser = async (searchUserName: string) => {
  try {
    const { data } = await axios.get<Pagination<UserPreviewResponse>>(
      '/users/search',
      {
        params: {
          nickname: searchUserName,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /users/me/account api의 query 함수
 *
 * @returns axiosResponse.data
 */
export const retrieveMyAccount = async () => {
  try {
    const { data } = await axios.get<UserResponse>('/users/me/account');
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /users/{nickname}/history api의 query 함수
 */
export const getHistoryByDate = async (
  nickname: string,
  year: number,
  month: number
) => {
  try {
    const { data } = await axios.get<HistoryDateResponse[]>(
      `/users/${nickname}/history/`,
      {
        params: {
          year: year,
          month: month,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
