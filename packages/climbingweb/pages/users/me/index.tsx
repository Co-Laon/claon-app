import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  ModifiedButton,
  SettingButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import { UserHead } from 'climbingweb/src/components/User/UserHead';
import UserPageLayout from 'climbingweb/src/components/User/UserPageLayout';
import { useFindPostsByUser } from 'climbingweb/src/hooks/queries/user/useFindPostsByUser';
import { useRetrieveMe } from 'climbingweb/src/hooks/queries/user/useRetrieveMe';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useRouter } from 'next/router';

export default function MyPage({}) {
  // 자신 정보 server state
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
  // 세팅 아이콘 클릭 핸들러
  const handleGoToSetting = () => {
    router.push('/setting');
  };
  // 피드 작성 아이콘 클릭 핸들러
  const handleGoToCreateFeed = () => {
    router.push('/feed/create');
  };
  // 헤더 버튼 클릭 핸들러
  const handleHeaderButtonClick = () => {
    router.push('/users/me/laon');
  };
  // 뒤로가기 아이콘 클릭 핸들러
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
      <UserPageLayout
        appBar={
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
        }
        userHead={
          <UserHead
            userDetailData={getUserData}
            onClickHeaderButton={handleHeaderButtonClick}
            isMyPage
          />
        }
        userDetailData={getUserData}
        userPostData={findPostsByUserData}
        isPostDataHasNextPage={isFetchingFindPostsByUserDataNextPage}
        infiniteScrollTarget={target}
      />
    );
  }

  return <Loading />;
}
