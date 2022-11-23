import { createQueryKeys } from '@lukemorales/query-key-factory';
import { PostCreateRequest } from 'climbingweb/types/request/post';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import {
  createLike,
  createPost,
  deleteLike,
  findAllChildrenComment,
  findAllParentCommentAndThreeChildComment,
  getPost,
  getPosts,
} from './queries';

/**
 * 추후 성능 개선 필요!!
 * 좋아요 상태 변경 시 모든 게시글 리스트를 다시 불러오는 것이 아닌 해당 게시글만 변경 수정 필요
 * 캐시 값을 직접 변경 하는 것이 좋은 방법인지 확인 필요
 */

/**
 * post-controller api 의 query key factory
 */
export const postQueries = createQueryKeys('posts', {
  list: () => ({
    queryKey: ['list'],
    queryFn: (context) => getPosts(context?.pageParam),
  }),
  detail: (postId: string) => ({
    queryKey: [postId],
    queryFn: () => getPost(postId),
    contextQueries: {
      parentComments: () => ({
        queryKey: ['parentComments'],
        queryFn: (context) =>
          findAllParentCommentAndThreeChildComment(postId, context?.pageParam),
      }),
      childrenComment: (commentId: string) => ({
        queryKey: ['childrenComment'],
        queryFn: (context) =>
          findAllChildrenComment(commentId, context?.pageParam),
      }),
    },
  }),
});

/**
 * createLike api useMutation hooks
 *
 * @param postId 좋아요를 누를 post id
 * @returns createLike api useMutation return 값
 */
export const useCreateLike = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => createLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list().queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * deleteLike api useMutation hooks
 *
 * @param postId 좋아요를 취소할 post id
 * @returns deleteLike api useMutation return 값
 */
export const useDeleteLike = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list().queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * createPost api useMutation hooks
 *
 * @param postCreateRequest 게시할 피드 내용
 * @returns createPost api useMutation return 값
 */
export const useCreatePost = (postCreateRequest: PostCreateRequest) => {
  const queryClient = useQueryClient();
  return useMutation(() => createPost(postCreateRequest), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list().queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * findAllParentCommentAndThreeChildComment api useInfiniteQuery hooks
 *
 * @param postId 댓글을 불러올 post id
 * @returns findAllParentCommentAndThreeChildComment api useInfiniteQuery return 값
 */
export const useFindAllParentCommentAndThreeChildComment = (postId: string) => {
  return useInfiniteQuery({
    ...postQueries.detail(postId)._ctx.parentComments(),
    enabled: Boolean(postId),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * findAllChildrenComment api useInfiniteQuery hooks
 *
 * @param commentId 댓글의 답글을 불러올 comment id
 * @returns findAllChildrenComment api useInfiniteQuery return 값
 */
export const useFindAllChildrenComment = (commentId: string) => {
  return useInfiniteQuery({
    ...postQueries.detail(commentId)._ctx.childrenComment(commentId),
    enabled: Boolean(commentId),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * getPost api useQuery hooks
 *
 * @param postId 상세히 볼 게시글의 id
 * @returns getPost api useQuery return 값
 */
export const useGetPost = (postId: string) => {
  return useQuery({ ...postQueries.detail(postId), enabled: Boolean(postId) });
};

/**
 * getPosts api useInfiniteQuery hooks
 *
 * @returns getPosts api useInfiniteQuery return 값
 */
export const useGetPosts = () => {
  return useInfiniteQuery({
    ...postQueries.list(),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};
