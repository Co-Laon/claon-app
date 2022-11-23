import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { createLaon, deleteLaon, findAllLaon, getLaonPost } from './queries';

/**
 * laon-controller api 의 query key factory
 */
export const laonQueries = createQueryKeys('laon', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => findAllLaon(),
  }),
  posts: () => ({
    queryKey: ['posts'],
    queryFn: (context) => getLaonPost(context?.pageParam),
  }),
});

/**
 * findAllLaon api (라온 리스트 확인) 의 useQuery hooks
 *
 * @returns findAllLaon api (라온 리스트 확인) 의 useInfiniteQuery return 값
 */
export const useFindAllLaon = () => {
  return useInfiniteQuery({
    ...laonQueries.list(),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};

/**
 * createLaon api (라온 생성) 의 useMutation hooks
 *
 * @returns createLaon api (라온 생성) 의 useMutation return 값
 */
export const useCreateLaon = () => {
  const queryClient = useQueryClient();
  return useMutation(createLaon, {
    onSuccess: () => {
      queryClient.invalidateQueries(laonQueries.list());
    },
  });
};

/**
 * deleteLaon api (라온 삭제) 의 useMutation hooks
 *
 * @returns deleteLaon api (라온 삭제) 의 useMutation return 값
 */
export const useDeleteLaon = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLaon, {
    onSuccess: () => {
      queryClient.invalidateQueries(laonQueries.list());
    },
  });
};

/**
 * getLaonPost api (라온 게시글 확인) 의 useQuery hooks
 * home 페이지에서 사용
 *
 * @returns getLaonPost api (라온 게시글 확인) 의 useInfiniteQuery return 값
 */
export const useGetLaonPost = () => {
  return useInfiniteQuery({
    ...laonQueries.posts(),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};
