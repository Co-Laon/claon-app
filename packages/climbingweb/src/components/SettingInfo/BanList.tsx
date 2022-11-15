import { useDeleteBlock } from 'climbingweb/src/hooks/queries/user/useDeleteBlock';
import { useFindBlockUser } from 'climbingweb/src/hooks/queries/user/useFindBlockUser';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { SmmallNodeButton } from '../common/button/Button';
import { LaonList } from '../common/LaonList';

export const BanList = ({}) => {
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
                  onClick={() => deleteBlockMutate(value.blockUserNickName)}
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
      </div>
    );

  return <div>로딩 중...</div>;
};
