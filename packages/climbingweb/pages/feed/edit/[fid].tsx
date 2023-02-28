import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import { NextButton } from 'climbingweb/src/components/common/AppBar/NextButton';
import PageLoading from 'climbingweb/src/components/common/Loading/PageLoading';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { CenterSearchInput } from 'climbingweb/src/components/CreateFeed/CenterSearchInput';
import HoldListModal from 'climbingweb/src/components/CreateFeed/SelectHoldList/HoldListModal';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList';
import { useFindHoldInfoByCenter } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useEditContentsList } from 'climbingweb/src/hooks/queries/post/queryKey';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { ClimbingHistoryRequest } from 'climbingweb/types/request/post';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

function EditFeed() {
  const [page, setPage] = useState<string>('first');
  const { postData, initPost, setPostData } = useCreatePostForm();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { data: holdListData } = useFindHoldInfoByCenter(postData.centerId);
  const {
    mutate: getEditContentsListMutate,
    isLoading: isGetEditContentsListLoading,
  } = useEditContentsList({
    onSuccess: () => {
      toast('수정 완료 되었습니다.');
      router.push('/');
    },
    onError: () => {
      toast('피드 수정에 실패했습니다. 다시 시도해주세요.');
      window.location.reload();
    },
  });

  //화면 렌더링될 때 초기화
  useEffect(() => {
    return () => {
      initPost();
    };
  }, []);

  //submit
  const handleDataSubmit = useCallback(() => {
    getEditContentsListMutate();
  }, [getEditContentsListMutate]);

  //content 수정
  const handleContentInput = useCallback((content: string) => {
    setPostData({ ...postData, content });
  }, []);

  //Clibming History 수정
  const handleClimbingHistoriesInput = useCallback(
    (climbingHistories: ClimbingHistoryRequest[]) => {
      setPostData({ ...postData, climbingHistories });
    },
    [setPostData, postData]
  );

  //뒤로가기 버튼 핸들링 함수
  const handleOnClickBackButton = useCallback(() => {
    setPage('first');
  }, []);

  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      {isGetEditContentsListLoading ? <PageLoading /> : null}
      <AppBar
        title="게시글 수정"
        leftNode={
          <BackButton
            onClick={page === 'second' ? handleOnClickBackButton : undefined}
          />
        }
        rightNode={
          <NextButton
            pageState={page}
            setPageState={setPage}
            onSubmit={page === 'second' ? handleDataSubmit : null}
          />
        }
      />
      <div className="p-4">
        {page === 'first' ? (
          <div className="flex flex-col gap-4">
            <PageSubTitle
              title={'사진'}
              className="px-[4px] text-base font-bold"
            />
            <UploadImageList />
            <PageSubTitle
              title={'내용'}
              className="px-[4px] text-base font-bold"
            />
            <TextArea
              data={postData.content}
              setData={handleContentInput}
              placeholder="500자 이내 글 입력"
              className="w-[89vw] h-[32.4vh] ml-[4px] mr-[4px]"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <PageSubTitle
              title={'암장 이름'}
              className="px-[4px] text-base font-bold"
            />
            <CenterSearchInput
              refObj={searchInputRef}
              initialValue={postData.centerName}
              className="px-[4px] min-h-[52px]"
              disable={true}
            />
            <PageSubTitle
              title={'완등 횟수'}
              className="px-[4px] text-base font-bold"
            />
            <HoldListModal
              maxCount={10}
              centerId={postData.centerId}
              standardHoldList={holdListData}
              preSelectedHoldList={postData.climbingHistories}
              setData={handleClimbingHistoriesInput}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default EditFeed;
