import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  ModifiedButton,
  SettingButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import MyFeed from 'climbingweb/src/components/My/MyFeed';
import { MyHead } from 'climbingweb/src/components/My/MyHead';
import MyRecord from 'climbingweb/src/components/My/MyRecord';
import { useFindPostsByUser } from 'climbingweb/src/hooks/queries/user/useFindPostsByUser';
import { useGetPublicUser } from 'climbingweb/src/hooks/queries/user/useGetPublicUser';
import { useGetUser } from 'climbingweb/src/hooks/queries/user/useGetUser';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useRouter } from 'next/router';

export default function MyPage({}) {
  //getUser server state
  const {
    data: getUserData,
    isError: isGetUserDataError,
    error: getUserDataError,
  } = useGetUser();

  //findPostsByUser server state
  const {
    data: findPostsByUserData,
    isError: isFindPostsByUserDataError,
    error: findPostsByUserDataError,
    fetchNextPage: fetchFindPostsByUserDataNextPage,
    isFetchingNextPage: isFetchingFindPostsByUserDataNextPage,
    hasNextPage: hasFetchFindPostsByUserNextPage,
  } = useFindPostsByUser(getUserData?.nickname);

  const {
    data: getPublicUserData,
    isError: isGetPublicUserDataError,
    error: getPublicUserDataError,
  } = useGetPublicUser(getUserData?.nickname);

  const router = useRouter();
  const handleGoToSetting = () => {
    router.push('/setting');
  };
  const handleGoToCreateFeed = () => {
    router.push('/feed/create');
  };

  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasFetchFindPostsByUserNextPage) {
        fetchFindPostsByUserDataNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isGetUserDataError) return <div>{getUserDataError}</div>;
  if (isFindPostsByUserDataError) return <div>{findPostsByUserDataError}</div>;
  if (isGetPublicUserDataError) return <div>{getPublicUserDataError}</div>;

  if (getPublicUserData && getUserData && findPostsByUserData) {
    return (
      <section className="mx-4 mb-footer">
        <AppBar
          leftNode={<AppLogo />}
          title=""
          rightNode={
            <div className="flex gap-5">
              <ModifiedButton onClick={handleGoToSetting} />
              <SettingButton onClick={handleGoToCreateFeed} />
            </div>
          }
        />
        <MyHead
          height={getPublicUserData.height}
          armReach={getPublicUserData.armReach}
          apeIndex={getPublicUserData.apeIndex}
          imagePath={getPublicUserData.imagePath}
          postCount={getPublicUserData.postCount}
          laonCount={getPublicUserData.laonCount}
          climbCount={getPublicUserData.climbCount}
        />
        <PageSubTitle title="기록" />
        <div className="flex overflow-auto scrollbar-hide h-40">
          {getPublicUserData.centerClimbingHistories.length !== 0 ? (
            getPublicUserData.centerClimbingHistories.map((value, index) => (
              <MyRecord
                key={`MyRecord_${index}`}
                center={value.center}
                climbingHistories={value.climbingHistories}
              />
            ))
          ) : (
            <div className="w-full text-center leading-[10]">
              아직 기록이 없습니다.
            </div>
          )}
        </div>

        <PageSubTitle title="게시글" />
        <div className="w-full grid grid-cols-2 mb-footer overflow-auto scrollbar-hide">
          {findPostsByUserData.pages[0].totalCount !== 0 ? (
            <>
              <>
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
              </>
              {!isFetchingFindPostsByUserDataNextPage ? (
                <div className="h-[1px]" ref={target}></div>
              ) : (
                <div>로딩 중...</div>
              )}
            </>
          ) : (
            <div className="w-full text-center leading-[10]">
              아직 게시글이 없습니다.
            </div>
          )}
        </div>
      </section>
    );
  }

  return <div>로딩 중...</div>;
}
