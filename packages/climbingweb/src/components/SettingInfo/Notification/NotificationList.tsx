import { useGetNoticeList } from 'climbingweb/src/hooks/queries/notice/useGetNoticeList';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { NoticeReponse } from 'climbingweb/types/response/notice';
import { useState } from 'react';
import { Divder } from '../../common/divder/Divder';
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

  if (isNoticeListDataError) return <div>{noticeListDataError}</div>;

  if (detail) return <Notification {...detail} />;

  if (noticeListData)
    return (
      <div className="w-full flex flex-col gap-2 overflow-auto scrollbar-hide">
        {noticeListData.pages.map((value) => {
          return value.results.map(({ title, createdAt, content }) => (
            <div
              key={title}
              className="w-full flex flex-col gap-2"
              onClick={() => handleGotoDetail({ title, createdAt, content })}
            >
              <h2 className="text-base font-medium leading-6">{title}</h2>
              <p className="text-xs font-medium leading-4 text-gray-500">
                {createdAt}
              </p>
              <Divder />
            </div>
          ));
        })}
        {!isFetchingNoticeListDataNextPage ? (
          <div className="h-[1px]" ref={target}></div>
        ) : (
          <div>로딩 중...</div>
        )}
      </div>
    );

  return <div>로딩 중...</div>;
};
