import { ServerError, ServerBusinessError } from 'climbingweb/types/common';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { PostDetailResponse } from 'climbingweb/types/response/post';

/**
 * GET /api/v1/posts/{postId} api query 함수
 *
 * @param postId 상세보기 할 피드 id
 * @returns axiosResponse.data
 */
const getPost = async (postId: string) => {
  try {
    const { data } = await axios.get<PostDetailResponse>(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * GET /api/v1/posts/{postId} api useQuery hooks
 *
 * @param postId
 * @param options
 * @returns
 */
export const useGetPost = (
  postId: string,
  options?: Omit<
    UseQueryOptions<
      PostDetailResponse,
      ServerError | ServerBusinessError,
      PostDetailResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<PostDetailResponse, ServerError | ServerBusinessError>(
    ['getPost', postId],
    () => getPost(postId),
    {
      retry: 0,
      enabled: !!postId,
      ...options,
    }
  );
};
