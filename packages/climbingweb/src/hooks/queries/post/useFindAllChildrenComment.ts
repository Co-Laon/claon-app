import { ChildCommentResponse } from './../../../../types/response/post/index.d';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';

/**
 * GET /api​/v1​/posts​/comment​/{parentId}​/children api query 함수
 *
 * @param commentId 모든 댓글을 확인 할 commentId
 * @returns axiosResponse.data
 */
const findAllChildrenComment = async (commentId: string) => {
  const { data } = await axios.get<Pagination<ChildCommentResponse>>(
    `/posts/${commentId}/comment`
  );
  return data;
};

/**
 * findAllChildrenComment api useQuery 함수
 *
 * @param postId 모든 댓글을 확인 할 commentId
 * @param options useQuery 추가 옵션
 * @returns findAllChildrenComment api useQuery return 값
 */
export const useFindAllChildrenComment = (
  postId: string,
  options?: Omit<
    UseQueryOptions<
      Pagination<ChildCommentResponse>,
      unknown,
      Pagination<ChildCommentResponse>,
      QueryKey
    >,
    'queryKey'
  >
) => {
  return useQuery<Pagination<ChildCommentResponse>>(
    ['findAllParentCommentAndThreeChildComment', postId],
    () => findAllChildrenComment(postId),
    { retry: 0, enabled: !!postId, ...options }
  );
};
