import { useGetNoticeList } from 'climbingweb/src/hooks/queries/notice/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { NoticeReponse } from 'climbingweb/types/response/notice';
import { useState } from 'react';
import { Divder } from '../../common/divder/Divder';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';
import { Notification } from './Notification';

export const NotificationList = () => {
  // 공지사항 자세히 보기 state
  const [detail, setDetail] = useState<NoticeReponse | null>(null);

  // 공지사항 리스트 server state
  const {
    data: noticeListData,
    isError: isNoticeListDataError,
    error: noticeListDataError,
    fetchNextPage: fetchNoticeListDataNextPage,
    isFetchingNextPage: isFetchingNoticeListDataNextPage,
    hasNextPage: hasNoticeListDataNextPage,
  } = useGetNoticeList();

  // 공지사항 리스트 클릭 핸들러
  const handleGotoDetail = (target: NoticeReponse) => {
    setDetail(target);
  };

  // infinite scroll 사용 훅
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNoticeListDataNextPage) {
        fetchNoticeListDataNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isNoticeListDataError)
    return <ErrorContent error={noticeListDataError} />;

  if (detail) return <Notification {...detail} />;

  if (noticeListData)
    return (
      <div className="w-full flex flex-col gap-2 overflow-auto scrollbar-hide">
        {noticeListData.pages.map((page, pIndex) => {
          return page.results.map(({ title, createdAt, content }, rindex) => (
            <div
              key={`${title}${pIndex}${rindex}`}
              className="w-full flex flex-col"
              onClick={() => handleGotoDetail({ title, createdAt, content })}
            >
              <h2 className="text-sm font-medium leading-6">{title}</h2>
              <p className="text-xs font-medium leading-4 text-[#808080]">
                {createdAt}
              </p>
              <Divder className="mt-2" />
            </div>
          ));
        })}
        {!isFetchingNoticeListDataNextPage ? (
          <div className="h-[1px]" ref={target}></div>
        ) : (
          <Loading />
        )}
      </div>
    );

  return <Loading />;
};
