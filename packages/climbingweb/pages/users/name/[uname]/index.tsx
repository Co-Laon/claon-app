import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  OptionButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import { UserHead } from 'climbingweb/src/components/User/UserHead';
import UserPageLayout from 'climbingweb/src/components/User/UserPageLayout';
import { useCreateLaon } from 'climbingweb/src/hooks/queries/laon/useCreateLaon';
import { useDeleteLaon } from 'climbingweb/src/hooks/queries/laon/useDeleteLaon';
import { useCreateBlock } from 'climbingweb/src/hooks/queries/user/useCreateBlock';
import { useFindPostsByUser } from 'climbingweb/src/hooks/queries/user/useFindPostsByUser';
import { useGetPublicUser } from 'climbingweb/src/hooks/queries/user/useGetPublicUser';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function UserPage({}) {
  const router = useRouter();
  const { uname } = router.query;
  const userNickname = uname as string;

  //바텀 시트 on/off state
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  // 유저 정보 server state
  const {
    data: getUserData,
    isError: isGetUserDataError,
    error: getUserDataError,
    refetch: refetchGetUserData,
  } = useGetPublicUser(userNickname);

  // 개인이 올린 포스트 server state
  const {
    data: findPostsByUserData,
    isError: isFindPostsByUserDataError,
    error: findPostsByUserDataError,
    fetchNextPage: fetchFindPostsByUserDataNextPage,
    isFetchingNextPage: isFetchingFindPostsByUserDataNextPage,
    hasNextPage: hasFetchFindPostsByUserNextPage,
  } = useFindPostsByUser(userNickname);

  // 라온 신청 useMutation
  const { mutate: createLaonMutate } = useCreateLaon(userNickname, {
    onSuccess: () => {
      refetchGetUserData();
    },
  });

  // 라온 취소 useMutation
  const { mutate: deleteLaonMutate } = useDeleteLaon();

  // 차단 useMutation
  const { mutate: createBlockMutate } = useCreateBlock(userNickname, {
    onSuccess: () => {
      refetchGetUserData();
    },
  });

  // 옵션 아이콘 클릭 핸들러
  const handleOptionButtonClick = () => {
    setOpenSheet(true);
  };

  // 유저 라온 버튼 클릭 핸들러
  const handleLaonButtonClick = () => {
    if (getUserData?.isLaon === false) {
      createLaonMutate();
    }
  };
  // 뒤로가기 아이콘 클릭 핸들러
  const handleGoToBack = () => {
    window.history.back();
  };

  // 바텀 시트 닫기 핸들러
  const onBottomSheetDismiss = () => {
    setOpenSheet(false);
  };

  // 바텀 시트 리스트 선택 핸들러
  const onBottomSheetSelect = () => {
    if (getUserData?.isLaon === true) {
      deleteLaonMutate(getUserData.nickname);
      createBlockMutate();
    } else {
      createBlockMutate();
    }
    router.push('/');
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
      <section>
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
              rightNode={<OptionButton onClick={handleOptionButtonClick} />}
            />
          }
          userHead={
            <UserHead
              userDetailData={getUserData}
              onClickHeaderButton={handleLaonButtonClick}
              isMyPage={false}
            />
          }
          userDetailData={getUserData}
          userPostData={findPostsByUserData}
          isPostDataHasNextPage={isFetchingFindPostsByUserDataNextPage}
          infiniteScrollTarget={target}
        />
        <BottomSheet open={openSheet} onDismiss={() => onBottomSheetDismiss()}>
          <ListSheet
            headerTitle=""
            list={[getUserData.isLaon ? '라온 취소 및 차단하기' : '차단하기']}
            onSelect={() => onBottomSheetSelect()}
          />
        </BottomSheet>
      </section>
    );
  }

  return <Loading />;
}
