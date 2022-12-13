import {
  ChildCommentResponse,
  CommentResponse,
} from './../../../../types/response/post/index.d';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import {
  CommentCreateRequest,
  CommentUpdateRequest,
  PostCreateRequest,
  PostReportRequest,
} from 'climbingweb/types/request/post';
import {
  CommentFindResponse,
  LikeResponse,
  PostDetailResponse,
  PostReportResponse,
  PostResponse,
} from 'climbingweb/types/response/post';

/**
 * POST /api/v1/posts/{postId}/like api query 함수
 *
 * @param postId 좋아요 누를 게시글의 id
 * @returns axiosResponse.data
 */
export const createLike = async (postId: string) => {
  try {
    const { data } = await axios.post<LikeResponse>(`/posts/${postId}/like`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * POST /api​/v1​/posts api 의 query 함수
 * @param postCreateRequest 업로드할 포스트 내용
 * @returns axiosResponse.data
 */
export const createPost = async (postCreateRequest: PostCreateRequest) => {
  try {
    const { data } = await axios.post<PostResponse>(
      '/posts',
      postCreateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * POST /api/v1/posts/{postId}/report api query 함수
 *
 * @param postId 신고할 게시글의 id
 * @param reportData 신고 내용
 * @returns axiosResponse.data
 */
export const createReport = async (
  postId: string,
  reportData: PostReportRequest
) => {
  try {
    const { data } = await axios.post<PostReportResponse>(
      `/posts/${postId}/report`,
      reportData
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * POST /api/v1/posts/{postId}/like api query 함수
 *
 * @param postId 좋아요 누를 게시글의 id
 * @returns axiosResponse.data
 */
export const deleteLike = async (postId: string) => {
  try {
    const { data } = await axios.delete<LikeResponse>(`/posts/${postId}/like`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /api/v1/posts/{postId}/comment api query 함수
 *
 * @param postId 모든 댓글을 확인 할 postId
 * @returns axiosResponse.data
 */
export const findAllParentComment = async (postId: string, pageParam = 0) => {
  try {
    const { data } = await axios.get<Pagination<CommentFindResponse>>(
      `/posts/${postId}/comment`,
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
 * GET /api​/v1​/posts​/comment​/{parentId}​/children api query 함수
 *
 * @param parentId 모든 대댓글을 확인 할 commentId
 * @returns axiosResponse.data
 */
export const findAllChildrenComment = async (
  parentId: string,
  pageParam = 0
) => {
  try {
    const { data } = await axios.get<Pagination<ChildCommentResponse>>(
      `/posts/comment/${parentId}/children`,
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
 * GET /api/v1/posts/{postId} api query 함수
 *
 * @param postId 상세보기 할 피드 id
 * @returns axiosResponse.data
 */
export const getPost = async (postId: string) => {
  try {
    const { data } = await axios.get<PostDetailResponse>(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /api/v1/posts api query 함수
 * 추천 피드 fetch api, pagination
 *
 * @returns axiosResponse.data
 */
export const getPosts = async (pageParam = 0) => {
  try {
    const { data } = await axios.get<Pagination<PostDetailResponse>>('/posts', {
      params: {
        page: pageParam,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 *  POST /api/v1/posts/{postId}/comment api query 함수
 *
 * @param postId 댓글을 달 게시글의 id
 * @param commentCreateRequest 댓글 내용, 대 댓글일 경우 commentId 까지
 * @returns axiosResponse.data
 */
export const createComment = async (
  postId: string,
  commentCreateRequest: CommentCreateRequest
) => {
  try {
    const { data } = await axios.post<CommentCreateRequest>(
      `/posts/${postId}/comment`,
      commentCreateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * PUT /api/v1/posts/comment/{commentId} api query 함수
 *
 * @param commentId 수정할 댓글의 id
 * @param commentUpdateRequest 수정할 댓글 내용
 * @returns axiosResponse.data
 */
export const updateComment = async (
  commentId: string,
  commentUpdateRequest: CommentUpdateRequest
) => {
  try {
    const { data } = await axios.put<CommentUpdateRequest>(
      `/posts/comment/${commentId}`,
      commentUpdateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * DELETE /api/v1/posts/comment/{commentId} api query 함수
 *
 * @param commentId 삭제할 댓글의 id
 * @returns axiosResponse.data
 */
export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axios.delete<CommentResponse>(
      `/posts/comment/${commentId}`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getPostContentsList = async (fileList: File[]) => {
  const data = await axios
    .all(
      fileList.map((file) => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post<string>('/posts/contents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      })
    )
    .then(
      axios.spread((...responses: any[]) => {
        return responses.map((res) => ({ url: res.data }));
      })
    )
    .catch((error: any) => {
      throw error.response;
    });
  return data;
};
