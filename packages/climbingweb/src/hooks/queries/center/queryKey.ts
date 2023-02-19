import {
  CenterBookmarkResponse,
  CenterReportResponse,
  ReviewResponse,
} from './../../../../types/response/center/index.d';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  CenterReportCreateRequest,
  ReviewCreateRequest,
  ReviewUpdateRequest,
} from 'climbingweb/types/request/center';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  UseMutationOptions,
} from 'react-query';
import {
  createCenterBookmark,
  createCenterReport,
  createReview,
  deleteCenterBookmark,
  deleteReview,
  findCenter,
  findHoldInfoByCenter,
  findReviewByCenter,
  getCenterList,
  getCenterPosts,
  searchCenter,
  searchCenterName,
  updateReview,
} from './queries';

/**
 * center-controller api 의 query key factory
 */
export const centerQueries = createQueryKeys('centers', {
  list: (option: 'bookmark' | 'new_setting' | 'newly_registered') => ({
    queryKey: [option],
    queryFn: () => getCenterList(option),
  }),
  search: (name: string) => ({
    queryKey: [name],
    queryFn: () => searchCenter(name),
  }),
  searchName: (centerName: string) => ({
    queryKey: [centerName],
    queryFn: () => searchCenterName(centerName),
  }),
  detail: (centerId: string) => ({
    queryKey: [centerId],
    queryFn: () => findCenter(centerId),
    contextQueries: {
      findHoldInfoByCenter: () => ({
        queryKey: ['hold'],
        queryFn: () => findHoldInfoByCenter(centerId),
      }),
      findReviewByCenter: () => ({
        queryKey: ['review'],
        queryFn: (context) => findReviewByCenter(centerId, context?.pageParam),
      }),
      getCenterPosts: () => ({
        queryKey: ['posts'],
        queryFn: (context) => getCenterPosts(centerId, context?.pageParam),
      }),
    },
  }),
});

/**
 * getCenterList api useQuery hooks
 *
 * @param option getCenterList api 의 option 값 (bookmark, new_setting, newly_registered)
 * @param options useQuery 추가 옵션
 * @returns useQuery return 값
 */
export const useGetCenterList = (
  option: 'bookmark' | 'new_setting' | 'newly_registered'
) => {
  return useQuery({
    ...centerQueries.list(option),
    enabled: Boolean(option),
  });
};

/**
 * findCenter api useQuery hooks
 *
 * @param centerId 검색할 센터의 id
 * @returns findCenter api useQuery return 값
 */
export const useFindCenter = (centerId: string) => {
  return useQuery({
    ...centerQueries.detail(centerId),
    enabled: Boolean(centerId),
  });
};

/**
 * createCenterBookmark api useMutation hooks
 *
 * @param centerId 즐겨찾기 추가 할 센터의 id
 * @returns findHoldInfoByCenter api useMutation return 값
 */
export const useCreateCenterBookmark = (
  centerId: string,
  options?: Omit<
    UseMutationOptions<CenterBookmarkResponse, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(() => createCenterBookmark(centerId), {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: centerQueries.list('bookmark').queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: centerQueries.detail(centerId).queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * deleteCenterBookmark api useMutation hooks
 *
 * @param centerId 즐겨찾기 삭제 할 센터의 id
 * @returns deleteCenterBookmark api useMutation return 값
 */
export const useDeleteCenterBookmark = (
  centerId: string,
  options?: Omit<UseMutationOptions<void, unknown, void, unknown>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteCenterBookmark(centerId), {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: centerQueries.list('bookmark').queryKey,
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: centerQueries.detail(centerId).queryKey,
        refetchInactive: true,
      });
    },
  });
};

/**
 * findHoldInfoByCenter api useQuery hooks
 *
 * @param centerId 홀드 정보를 검색할 센터의 id
 * @returns findHoldInfoByCenter api useQuery return 값
 */
export const useFindHoldInfoByCenter = (centerId: string) => {
  return useQuery({
    ...centerQueries.detail(centerId)._ctx.findHoldInfoByCenter(),
    enabled: Boolean(centerId),
  });
};

/**
 * findReviewByCenter api useInfiniteQuery hooks
 *
 * @param centerId  리뷰를 검색할 센터의 id
 * @returns findReviewByCenter api useInfiniteQuery return 값
 */
export const useFindReviewByCenter = (centerId: string) => {
  return useInfiniteQuery({
    ...centerQueries.detail(centerId)._ctx.findReviewByCenter(),
    enabled: Boolean(centerId),
    getNextPageParam: (lastPageData) => {
      return lastPageData.otherReviewsPagination.nextPageNum < 0
        ? undefined
        : lastPageData.otherReviewsPagination.nextPageNum;
    },
  });
};

/**
 * createCenterReport api useMutation hooks
 *
 * @param centerId 수정요청 할 센터의 id
 * @returns createCenterReport api useMutation return 값
 */
export const useCreateCenterReport = (
  centerId: string,
  options?: Omit<
    UseMutationOptions<
      CenterReportResponse,
      unknown,
      CenterReportCreateRequest,
      unknown
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (centerReportRequest: CenterReportCreateRequest) =>
      createCenterReport(centerId, centerReportRequest),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: centerQueries.detail(centerId).queryKey,
          refetchInactive: true,
        });
      },
    }
  );
};

/**
 * getCenterPosts api useInfiniteQuery hooks
 *
 * @param centerId 게시글을 검색할 센터의 id
 * @returns getCenterPosts api useInfiniteQuery return 값
 */
export const useGetCenterPosts = (centerId: string) => {
  return useInfiniteQuery({
    ...centerQueries.detail(centerId)._ctx.getCenterPosts(),
    enabled: Boolean(centerId),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * seachCenter api useQuery hooks
 *
 * @param name 검색할 센터의 이름
 * @returns seachCenter api useQuery return 값
 */
export const useSearchCenter = (name: string) => {
  return useInfiniteQuery({
    ...centerQueries.search(name),
    enabled: Boolean(name),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * searchCenterName api useQuery hooks
 * searchInput 에서 사용
 *
 * @param centerName 검색할 센터의 이름
 * @returns searchCenterName api useQuery return 값
 */
export const useSearchCenterName = (centerName: string) => {
  return useQuery({
    ...centerQueries.searchName(centerName),
    enabled: Boolean(centerName),
  });
};

/**
 * createReview api useMutation hooks
 *
 * @param centerId 리뷰를 작성할 센터의 id
 * @returns createReview api useMutation return 값
 */
export const useCreateReview = (
  centerId: string,
  options?: Omit<
    UseMutationOptions<ReviewResponse, unknown, ReviewCreateRequest, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (reviewCreateRequest: ReviewCreateRequest) =>
      createReview(centerId, reviewCreateRequest),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: centerQueries.detail(centerId).queryKey,
          refetchInactive: true,
        });
      },
    }
  );
};

/**
 * updateReview api useMutation hooks
 *
 * @param centerId 리뷰 수정할 암장 id
 * @param reviewId 수정할 리뷰 id
 * @param options 추가적인 useMutation hooks
 * @returns updateReview api useMutation return 값
 */
export const useUpdateReview = (
  centerId: string,
  reviewId: string,
  options?: Omit<
    UseMutationOptions<ReviewResponse, unknown, any, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (reviewUpdateRequest: ReviewUpdateRequest) =>
      updateReview(reviewId, reviewUpdateRequest),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries({
          queryKey: centerQueries.detail(centerId)._ctx.findReviewByCenter()
            .queryKey,
          refetchInactive: true,
        });
      },
    }
  );
};

/**
 * deleteReview api useMutation hooks
 *
 * @param centerId 리뷰 삭제할 암장 id
 * @param reviewId 삭제할 리뷰 id
 * @param options 추가적인 useMutation hooks
 * @returns deleteReview api useMutation return 값
 */
export const useDeleteReview = (
  centerId: string,
  reviewId: string,
  options?: Omit<UseMutationOptions<void, unknown, void, unknown>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteReview(reviewId), {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      queryClient.invalidateQueries({
        queryKey: centerQueries.detail(centerId).queryKey,
        refetchInactive: true,
      });
    },
  });
};
