import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  OptionButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import EmptyContent from 'climbingweb/src/components/common/EmptyContent/EmptyContent';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import UserFeedList from 'climbingweb/src/components/User/UserFeedList';
import { UserHead } from 'climbingweb/src/components/User/UserHead';
import UserPageLayout from 'climbingweb/src/components/User/UserPageLayout';
import UserRecordList from 'climbingweb/src/components/User/UserRecordList';
import {
  useCreateLaon,
  useDeleteLaon,
} from 'climbingweb/src/hooks/queries/laon/queryKey';
import {
  useCreateBlock,
  useFindPostsByUser,
  useGetPublicUser,
  userQueries,
} from 'climbingweb/src/hooks/queries/user/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function UserPage({}) {
  const router = useRouter();
  const { uname } = router.query;
  const userNickname = uname as string;
  const queryClient = useQueryClient();

  const { toast } = useToast();

  //바텀 시트 on/off state
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  // 유저 정보 server state
  const {
    data: getUserData,
    isError: isGetUserDataError,
    error: getUserDataError,
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
  const { mutate: createLaonMutate } = useCreateLaon({
    onSuccess: () => {
      toast('라온 신청하였습니다.');
      queryClient.invalidateQueries(userQueries.name(userNickname));
    },
  });

  // 라온 취소 useMutation
  const { mutate: deleteLaonMutate } = useDeleteLaon({
    onSuccess: () => {
      toast('라온 취소하였습니다.');
      queryClient.invalidateQueries(userQueries.name(userNickname));
    },
  });

  // 차단 useMutation
  const { mutate: createBlockMutate } = useCreateBlock();

  // 옵션 아이콘 클릭 핸들러
  const handleOptionButtonClick = () => {
    setOpenSheet(true);
  };

  // 유저 라온 버튼 클릭 핸들러
  const handleLaonButtonClick = () => {
    if (getUserData?.isLaon === false) {
      createLaonMutate(userNickname);
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
      deleteLaonMutate(userNickname);
      createBlockMutate(userNickname);
    } else {
      createBlockMutate(userNickname);
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
                <div className="flex gap-3">
                  <BackButton onClick={handleGoToBack} />
                  <PageSubTitle title={getUserData.nickname} />
                </div>
              }
              title=""
              rightNode={<OptionButton onClick={handleOptionButtonClick} />}
              className="px-5"
            />
          }
          userHead={
            <UserHead
              userDetailData={getUserData}
              onClickHeaderButton={handleLaonButtonClick}
              isMyPage={false}
            />
          }
          userRecordList={
            getUserData.centerClimbingHistories.length !== 0 ? (
              <UserRecordList userDetailData={getUserData} />
            ) : (
              <EmptyContent message="아직 기록이 없습니다." />
            )
          }
          userFeedList={
            findPostsByUserData.pages[0].totalCount !== 0 ? (
              <UserFeedList
                userPostData={findPostsByUserData}
                isPostDataHasNextPage={isFetchingFindPostsByUserDataNextPage}
                infiniteScrollTarget={target}
              />
            ) : (
              <EmptyContent message="아직 게시글이 없습니다." />
            )
          }
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
