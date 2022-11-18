import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import {
  Pagination,
  ServerError,
  ServerBusinessError,
} from 'climbingweb/types/common';
import { CommentFindResponse } from 'climbingweb/types/response/post';

/**
 * GET /api/v1/posts/{postId}/comment api query 함수
 *
 * @param postId 모든 댓글을 확인 할 postId
 * @returns axiosResponse.data
 */
const findAllParentCommentAndThreeChildComment = async (postId: string) => {
  try {
    const { data } = await axios.get<Pagination<CommentFindResponse>>(
      `/posts/${postId}/comment`
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * findAllParentCommentAndThreeChildComment api useQuery 함수
 *
 * @param postId 모든 댓글을 확인 할 postId
 * @param options useQuery 추가 옵션
 * @returns findAllParentCommentAndThreeChildComment api useQuery return 값
 */
export const useFindAllParentCommentAndThreeChildComment = (
  postId: string,
  options?: Omit<
    UseQueryOptions<
      Pagination<CommentFindResponse>,
      ServerError | ServerBusinessError,
      Pagination<CommentFindResponse>,
      QueryKey
    >,
    'queryKey'
  >
) => {
  return useQuery<
    Pagination<CommentFindResponse>,
    ServerError | ServerBusinessError
  >(
    ['findAllParentCommentAndThreeChildComment', postId],
    () => findAllParentCommentAndThreeChildComment(postId),
    { retry: 0, enabled: !!postId, ...options }
  );
};
