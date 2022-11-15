import { useDeleteBlock } from 'climbingweb/src/hooks/queries/user/useDeleteBlock';
import { useFindBlockUser } from 'climbingweb/src/hooks/queries/user/useFindBlockUser';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ButtonSheet } from '../common/BottomSheetContents/ButtonSheet';
import { SmmallNodeButton } from '../common/button/Button';
import { LaonList } from '../common/LaonList';

export const BanList = ({}) => {
  //바텀 시트 on/off state
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>();

  //Block 유저 리스트 fetch api useQuery
  const {
    data: blockUserData,
    isError: isBlockUserDataError,
    error: blockUserDataError,
    fetchNextPage: fetchBlockUserDataNextPage,
    isFetchingNextPage: isFetchBlockUserDataNextPage,
    hasNextPage: hasBlockUserDataNextPage,
  } = useFindBlockUser();

  //Block 유저 취소 useMutation
  const { mutate: deleteBlockMutate } = useDeleteBlock();

  //Block 유저 취소 버튼 클릭 핸들러
  const handleDeleteBlockButtonClick = (nickname: string) => {
    setOpenSheet(true);
    setSelectedUser(nickname);
  };

  //Block 유저 취소 바텀 시트 확인 버튼 클릭 핸들러
  const handleDeleteBlockConfirmButtonClick = () => {
    if (selectedUser) deleteBlockMutate(selectedUser);
  };

  //Block 유저 취소 바텀 시트 취소 핸들러
  const handleDismiss = () => {
    setOpenSheet(false);
  };

  //InfiniteScroll 을 위한 로직
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasBlockUserDataNextPage) {
        fetchBlockUserDataNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isBlockUserDataError) return <div>{blockUserDataError}</div>;

  if (blockUserData)
    return (
      <div className="overflow-auto scrollbar-hide">
        {blockUserData.pages.map((page, pIndex) => {
          const laonList = page.results.map((value) => {
            return {
              laonNickName: value.blockUserNickName,
              laonProfileImage: value.blockUserProfileImage,
              rightNode: (
                <SmmallNodeButton
                  onClick={() =>
                    handleDeleteBlockButtonClick(value.blockUserNickName)
                  }
                >
                  취소
                </SmmallNodeButton>
              ),
            };
          });
          return (
            <LaonList key={`blockUserDataPage_${pIndex}`} laonList={laonList} />
          );
        })}
        {!isFetchBlockUserDataNextPage ? (
          <div className="h-[1px]" ref={target}></div>
        ) : (
          <div>로딩 중...</div>
        )}
        <BottomSheet open={openSheet} onDismiss={handleDismiss}>
          <ButtonSheet
            text={`${selectedUser} 님을 차단 해제 하시겠습니까?`}
            onConfirm={handleDeleteBlockConfirmButtonClick}
            onCancel={handleDismiss}
          />
        </BottomSheet>
      </div>
    );

  return <div>로딩 중...</div>;
};
