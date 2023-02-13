import { laonQueries } from './../laon/queryKey';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  CommentCreateRequest,
  CommentUpdateRequest,
  PostCreateRequest,
  PostReportRequest,
} from 'climbingweb/types/request/post';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
  UseMutationOptions,
} from 'react-query';
import {
  createComment,
  createLike,
  createPost,
  createReport,
  deleteComment,
  deleteLike,
  findAllChildrenComment,
  findAllParentComment,
  getPostContentsList,
  getPost,
  getPosts,
  updateComment,
} from './queries';
import { PostContents } from 'climbingweb/types/response/post';
import { useRouter } from 'next/router';
import { useToast } from '../../useToast';
import {
  CommentResponse,
  LikeResponse,
  PostContents,
  PostReportResponse,
  PostResponse,
} from 'climbingweb/types/response/post';

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
        queryFn: (context) => findAllParentComment(postId, context?.pageParam),
      }),
    },
  }),
  childrenComment: (parentId: string) => ({
    queryKey: [parentId],
    queryFn: (context) => findAllChildrenComment(parentId, context?.pageParam),
  }),
});

/**
 * createLike api useMutation hooks
 *
 * @param postId 좋아요를 누를 post id
 * @param options 추가적인 옵션
 * @returns createLike api useMutation return 값
 */
export const useCreateLike = (
  postId: string,
  options?: Omit<
    UseMutationOptions<LikeResponse, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(() => createLike(postId), {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: postQueries.list().queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: laonQueries.posts().queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * deleteLike api useMutation hooks
 *
 * @param postId 좋아요를 취소할 post id
 * @param options 추가적인 옵션
 * @returns deleteLike api useMutation return 값
 */
export const useDeleteLike = (
  postId: string,
  options?: Omit<
    UseMutationOptions<LikeResponse, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteLike(postId), {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: postQueries.list().queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: laonQueries.posts().queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * createPost api useMutation hooks
 *
 * @param postCreateRequest 게시할 피드 내용
 * @param options 추가적인 옵션
 * @returns createPost api useMutation return 값
 */
export const useCreatePost = (
  options?: Omit<
    UseMutationOptions<PostResponse, unknown, PostCreateRequest, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (postCreateRequest: PostCreateRequest) => createPost(postCreateRequest),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: postQueries.list().queryKey,
          refetchInactive: true,
        });
        // alert('입력 완료 되었습니다.');
        toast('게시글 작성 완료');
        router.push('/');
      },
      onError: (error) => {
        console.error(error);
        toast('피드 작성에 실패했습니다. 다시 시도해주세요.');
        window.location.reload();

      },
    }
  );
};

/**
 * findAllParentComment api useInfiniteQuery hooks
 *
 * @param postId 댓글을 불러올 post id
 * @returns findAllParentComment api useInfiniteQuery return 값
 */
export const useFindAllParentComment = (postId: string) => {
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
    ...postQueries.childrenComment(commentId),
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

/**
 * createComment api useMutation hooks
 *
 * @param postId 댓글을 달 게시글의 id
 * @param options 추가적인 옵션
 * @returns createComment api useMutation return 값
 */
export const useCreateComment = (
  postId: string,
  options?: Omit<
    UseMutationOptions<
      CommentCreateRequest,
      unknown,
      CommentCreateRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentCreateRequest: CommentCreateRequest) =>
      createComment(postId, commentCreateRequest),
    {
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: postQueries.detail(postId).queryKey,
          refetchInactive: true,
        });
      },
    }
  );
};

/**
 * createChildComment api useMutation hooks
 *
 * @param postId 댓글을 달 게시글의 id
 * @param parentId 댓글의 답글을 달 comment id
 * @param options 추가적인 옵션
 * @returns createChildComment api useMutation return 값
 */
export const useCreateChildComment = (
  postId: string,
  parentId: string,
  options?: Omit<
    UseMutationOptions<
      CommentCreateRequest,
      unknown,
      CommentCreateRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentCreateRequest: CommentCreateRequest) =>
      createComment(postId, commentCreateRequest),
    {
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: postQueries.childrenComment(parentId).queryKey,
          refetchInactive: true,
        });
      },
    }
  );
};

/**
 * updateComment api useMutation hooks
 *
 * @param commentId 수정할 댓글의 id
 * @param options 추가적인 옵션
 * @returns updateComment api useMutation return 값
 */
export const useUpdateComment = (
  postId: string,
  commentId: string,
  parentId?: string,
  options?: Omit<
    UseMutationOptions<
      CommentUpdateRequest,
      unknown,
      CommentUpdateRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentUpdateRequest: CommentUpdateRequest) =>
      updateComment(commentId, commentUpdateRequest),
    {
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: postQueries.detail(postId).queryKey,
          refetchInactive: true,
        });
        if (parentId) {
          queryClient.invalidateQueries({
            queryKey: postQueries.childrenComment(parentId).queryKey,
            refetchInactive: true,
          });
        }
      },
    }
  );
};

/**
 * deleteComment api useMutation hooks
 *
 * @param commentId 삭제할 댓글의 id
 * @param options 추가적인 옵션
 * @returns deleteComment api useMutation return 값
 */
export const useDeleteComment = (
  postId: string,
  commentId: string,
  parentId?: string,
  options?: Omit<
    UseMutationOptions<CommentResponse, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteComment(commentId), {
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: postQueries.detail(postId).queryKey,
        refetchInactive: true,
      });
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: postQueries.childrenComment(parentId).queryKey,
          refetchInactive: true,
        });
      }
    },
  });
};

/**
 * createReport api useMutation hooks
 *
 * @param postId 신고할 게시글 id
 * @param options
 * @returns
 */
export const useCreateReport = (
  postId: string,
  options?: Omit<
    UseMutationOptions<PostReportResponse, unknown, PostReportRequest, unknown>,
    'mutationFn'
  >
) => {
  return useMutation(
    (reportData: PostReportRequest) => createReport(postId, reportData),
    {
      ...options,
    }
  );
};

export const useGetPostContentsList = () => {
  const { mutate } = useCreatePost();
  const { postData } = useCreatePostForm();
  return useMutation((fileList: File[]) => getPostContentsList(fileList), {
    onSuccess: (data: PostContents[]) => {
      console.log(data);
      mutate({ ...postData, contentsList: data });
    },
    onError: (error) => {
      console.error(error);
      alert('이미지 업로드에 실패했습니다.');
    },
  });
};
