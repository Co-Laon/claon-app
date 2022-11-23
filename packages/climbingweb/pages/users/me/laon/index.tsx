import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { SmmallNodeButton } from 'climbingweb/src/components/common/button/Button';
import EmptyContent from 'climbingweb/src/components/common/EmptyContent/EmptyContent';
import { LaonList } from 'climbingweb/src/components/common/LaonList';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import {
  useDeleteLaon,
  useFindAllLaon,
} from 'climbingweb/src/hooks/queries/laon/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import React from 'react';

export const MyLaonList = ({}) => {
  // Laon 유저 리스트 fetch api useQuery
  const {
    data: laonUserData,
    isError: isLaonUserDataError,
    error: laonUserDataError,
    fetchNextPage: fetchLaonUserDataNextPage,
    isFetchingNextPage: isFetchLaonUserDataNextPage,
    hasNextPage: hasLaonUserDataNextPage,
  } = useFindAllLaon();

  // Laon 유저 취소 useMutation
  const { mutate: deleteLaonMutate } = useDeleteLaon();

  // 뒤로 버튼 클릭 핸들러
  const handleGoToBack = () => {
    window.history.back();
  };

  // 라온 취소 버튼 클릭 핸들러
  const handleDeleteLaonClick = (nickname: string) => {
    deleteLaonMutate(nickname);
  };

  // InfiniteScroll 을 위한 로직
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasLaonUserDataNextPage) {
        fetchLaonUserDataNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isLaonUserDataError) return <div>{laonUserDataError}</div>;

  if (laonUserData)
    return (
      <div className="h-screen flex flex-col">
        <AppBar
          leftNode={<BackButton onClick={handleGoToBack} />}
          title={'내 라온 리스트'}
          rightNode={<Empty />}
        />
        <div className="p-4 overflow-auto scrollbar-hide">
          {laonUserData.pages[0].totalCount !== 0 ? (
            laonUserData.pages.map((page, pIndex) => {
              const laonList = page.results.map((value) => {
                return {
                  laonNickName: value.laonNickname,
                  laonProfileImage: value.laonProfileImage,
                  rightNode: (
                    <SmmallNodeButton
                      onClick={() => handleDeleteLaonClick(value.laonNickname)}
                    >
                      취소
                    </SmmallNodeButton>
                  ),
                };
              });
              return (
                <LaonList
                  key={`laonUserDataPage_${pIndex}`}
                  laonList={laonList}
                />
              );
            })
          ) : (
            <EmptyContent message="아직 라온이 없습니다." />
          )}
          {!isFetchLaonUserDataNextPage ? (
            <div className="h-[1px]" ref={target}></div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );

  return <Loading />;
};

export default MyLaonList;
