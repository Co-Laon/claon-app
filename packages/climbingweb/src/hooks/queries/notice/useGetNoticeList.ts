import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryKey,
} from 'react-query';
import axios from 'axios';
import { Pagination } from 'climbingweb/types/common';
import { NoticeReponse } from 'climbingweb/types/response/notice';

/**
 * GET /notices api의 query 함수
 *
 * @returns axiosResponse.data
 */
const getNoticeList = async (pageParam = 0) => {
  const { data } = await axios.get<Pagination<NoticeReponse>>('/notices', {
    params: {
      page: pageParam,
    },
  });
  return data;
};

/**
 * getNoticeList api (공지사항 리스트 확인) 의 useQuery hooks
 *
 * @returns getNoticeList api (공지사항 리스트 확인) 의 useQuery return 값
 */
export const useGetNoticeList = (
  options?: Omit<
    UseInfiniteQueryOptions<
      Pagination<NoticeReponse>,
      unknown,
      Pagination<NoticeReponse>,
      Pagination<NoticeReponse>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useInfiniteQuery<Pagination<NoticeReponse>>(
    ['getNoticeList'],
    (context) => getNoticeList(context.pageParam),
    {
      staleTime: 3000,
      getNextPageParam: (lastPageData: Pagination<NoticeReponse>) => {
        return lastPageData.nextPageNum < 0
          ? undefined
          : lastPageData.nextPageNum;
      },
      ...options,
    }
  );
};
