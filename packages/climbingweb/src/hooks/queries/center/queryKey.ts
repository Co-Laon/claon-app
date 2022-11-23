import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';
import {
  createCenterBookmark,
  createCenterReport,
  deleteCenterBookmark,
  findCenter,
  findHoldInfoByCenter,
  findReviewByCenter,
  getCenterList,
  getCenterPosts,
  searchCenter,
  searchCenterName,
} from './queries';

/**
 * center-controller api 의 query key factory
 */
export const centerQueries = createQueryKeys('centers', {
  list: (option: 'bookmark' | 'new_setting' | 'newly_registered') => ({
    queryKey: [option],
    queryFn: () => getCenterList(option),
  }),
  search: (name: string) => {
    return {
      queryKey: [name],
      queryFn: () => searchCenter(name),
    };
  },
  searchName: (centerName: string) => {
    return {
      queryKey: [centerName],
      queryFn: () => searchCenterName(centerName),
    };
  },
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
 * @returns useQuery return 값
 */
export const useGetCenterList = (
  option: 'bookmark' | 'new_setting' | 'newly_registered'
) => {
  return useQuery({ ...centerQueries.list(option), enabled: Boolean(option) });
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
export const useCreateCenterBookmark = (centerId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => createCenterBookmark(centerId), {
    onSuccess: () => {
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
export const useDeleteCenterBookmark = (centerId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteCenterBookmark(centerId), {
    onSuccess: () => {
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
    select: (response) =>
      response.map((val) => {
        return { ...val, count: 0 };
      }),
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
export const useCreateCenterReport = (centerId: string) => {
  const queryClient = useQueryClient();
  return useMutation(createCenterReport, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: centerQueries.detail(centerId).queryKey,
        refetchInactive: true,
      });
    },
  });
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
  return useQuery({
    ...centerQueries.search(name),
    enabled: Boolean(name),
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
