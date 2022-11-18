import { ServerBusinessError, ServerError } from 'climbingweb/types/common';
import axios from 'axios';
import { PostCreateRequest } from 'climbingweb/types/request/post';
import { PostResponse } from 'climbingweb/types/response/post';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * POST /api​/v1​/posts api 의 query 함수
 * @param postCreateRequest 업로드할 포스트 내용
 * @returns axiosResponse.data
 */
const createPost = async (postCreateRequest: PostCreateRequest) => {
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
 * createPost api 의 useMutation hooks
 * @param postCreateRequest 업로드할 포스트 내용
 * @param options useMutation 추가 옵션
 * @returns createPost api 의 useMutation return 값
 */
export const useCreatePost = (
  postCreateRequest: PostCreateRequest,
  options?: Omit<
    UseMutationOptions<
      PostResponse,
      ServerError | ServerBusinessError,
      void,
      unknown
    >,
    'mutationFn'
  >
) => {
  return useMutation(() => createPost(postCreateRequest), options);
};
