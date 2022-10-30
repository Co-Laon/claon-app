import axios from 'axios';
import { LikeResponse } from 'climbingweb/types/response/post';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * POST /api/v1/posts/{postId}/like api query 함수
 *
 * @param postId 좋아요 누를 게시글의 id
 * @returns axiosResponse.data
 */
const createLike = async (postId: string) => {
  const { data } = await axios.post<LikeResponse>(`/posts/${postId}/like`);
  return data;
};

/**
 * createLike api useMutation hooks
 *
 * @param postId 좋아요 누를 게시글의 id
 * @param options createLike api useMutation 추가 옵션
 * @returns createLike api useMutation return 값
 */
export const useCreateLike = (
  postId: string,
  options?: Omit<
    UseMutationOptions<LikeResponse, unknown, void, unknown>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation(['createLike', postId], () => createLike(postId), options);
};
