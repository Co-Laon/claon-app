import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  ModifiedButton,
  SettingButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import EmptyContent from 'climbingweb/src/components/common/EmptyContent/EmptyContent';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import MyFeed from 'climbingweb/src/components/My/MyFeed';
import { MyHead } from 'climbingweb/src/components/My/MyHead';
import MyRecord from 'climbingweb/src/components/My/MyRecord';
import { useFindPostsByUser } from 'climbingweb/src/hooks/queries/user/useFindPostsByUser';
import { useRetrieveMe } from 'climbingweb/src/hooks/queries/user/useRetrieveMe';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useRouter } from 'next/router';

export default function MyPage({}) {
  // 개인 유저 정보 server state
  const {
    data: getUserData,
    isError: isGetUserDataError,
    error: getUserDataError,
  } = useRetrieveMe();

  // 개인이 올린 포스트 server state
  const {
    data: findPostsByUserData,
    isError: isFindPostsByUserDataError,
    error: findPostsByUserDataError,
    fetchNextPage: fetchFindPostsByUserDataNextPage,
    isFetchingNextPage: isFetchingFindPostsByUserDataNextPage,
    hasNextPage: hasFetchFindPostsByUserNextPage,
  } = useFindPostsByUser(getUserData?.nickname);

  const router = useRouter();
  const handleGoToSetting = () => {
    router.push('/setting');
  };
  const handleGoToCreateFeed = () => {
    router.push('/feed/create');
  };
  const handleHeaderButtonClick = () => {
    router.push('/my/laon');
  };
  const handleGoToBack = () => {
    window.history.back();
  };

  // 무한 스크롤을 위한 Intersection Observer
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasFetchFindPostsByUserNextPage) {
        fetchFindPostsByUserDataNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isGetUserDataError) return <ErrorContent error={getUserDataError} />;
  if (isFindPostsByUserDataError)
    return <ErrorContent error={findPostsByUserDataError} />;

  if (getUserData && findPostsByUserData) {
    return (
      <section className="mx-4 mb-footer">
        <AppBar
          leftNode={
            <div className="flex">
              <BackButton onClick={handleGoToBack} />
              <PageSubTitle title={getUserData.nickname} />
            </div>
          }
          title=""
          rightNode={
            <div className="flex gap-5">
              <ModifiedButton onClick={handleGoToCreateFeed} />
              <SettingButton onClick={handleGoToSetting} />
            </div>
          }
        />
        <MyHead
          height={getUserData.height}
          armReach={getUserData.armReach}
          apeIndex={getUserData.apeIndex}
          imagePath={getUserData.imagePath}
          postCount={getUserData.postCount}
          laonCount={getUserData.laonCount}
          climbCount={getUserData.climbCount}
          onClickHeaderButton={handleHeaderButtonClick}
        />
        <PageSubTitle title="기록" />
        <div className="flex overflow-auto scrollbar-hide h-40">
          {getUserData.centerClimbingHistories.length !== 0 ? (
            getUserData.centerClimbingHistories.map((value, index) => (
              <MyRecord
                key={`MyRecord_${index}`}
                center={value.center}
                climbingHistories={value.climbingHistories}
              />
            ))
          ) : (
            <EmptyContent message="아직 기록이 없습니다." />
          )}
        </div>

        <PageSubTitle title="게시글" />
        {findPostsByUserData.pages[0].totalCount !== 0 ? (
          <div className="w-full grid grid-cols-2 mb-footer overflow-auto scrollbar-hide">
            {findPostsByUserData.pages.map((page, pIndex) =>
              page.results.map((result, rIndex) => (
                <MyFeed
                  key={`userPost${pIndex}${rIndex}`}
                  centerName={result.centerName}
                  image={result.thumbnailUrl}
                  climbingHistories={result.climbingHistories}
                />
              ))
            )}
            {!isFetchingFindPostsByUserDataNextPage ? (
              <div className="h-[1px]" ref={target}></div>
            ) : (
              <Loading />
            )}
          </div>
        ) : (
          <EmptyContent message="아직 게시글이 없습니다." />
        )}
      </section>
    );
  }

  return <Loading />;
}
