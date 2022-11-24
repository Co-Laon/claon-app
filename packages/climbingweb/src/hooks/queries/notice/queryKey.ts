import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useInfiniteQuery } from 'react-query';
import { getNoticeList } from './queries';

/**
 * notice-controller api 의 query key factory
 */
export const noticeQueries = createQueryKeys('notices', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => getNoticeList(),
  }),
});

/**
 * getNoticeList api (공지사항 리스트 확인) 의 useQuery hooks
 *
 * @returns getNoticeList api (공지사항 리스트 확인) 의 useInfiniteQuery return 값
 */
export const useGetNoticeList = () => {
  return useInfiniteQuery({
    ...noticeQueries.list(),
    getNextPageParam: (lastPageData) => {
      return lastPageData.nextPageNum < 0
        ? undefined
        : lastPageData.nextPageNum;
    },
  });
};
