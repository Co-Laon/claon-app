import { AppBar } from 'climbingweb/src/components/common/AppBar';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { UploadImageList } from 'climbingweb/src/components/CreateFeed/UploadImageList/';
import { useCallback, useEffect, useState } from 'react';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import HoldListModal from 'climbingweb/src/components/CreateFeed/SelectHoldList/HoldListModal';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import { NextButton } from 'climbingweb/src/components/common/AppBar/NextButton';
import { CenterSearchInput } from 'climbingweb/src/components/CreateFeed/CenterSearchInput';
import { ClimbingHistoryRequest } from 'climbingweb/types/request/post';
import {
  useCreatePost,
  useGetPostContentsList,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import { useRouter } from 'next/router';

export default function CreatePostPage() {
  const [page, setPage] = useState<string>('first');
  const { postData, setPostData, postImageList, initPost } =
    useCreatePostForm();
  const [searchInput, setSearchInput] = useState<string>('');
  //searchInput 으로 인한 centerList 중 선택 된 것이 있는지 여부
  const [selected, setSelected] = useState(false);
  const { mutate, isSuccess, error } = useCreatePost(postData);
  const {
    mutate: getPostContentsList,
    isSuccess: getPostContentsListSuccess,
    isLoading: getPostContentsListLoading,
    isError: getPostContentsListError,
    data: postContentsList,
  } = useGetPostContentsList();
  const router = useRouter();

  useEffect(() => {
    console.log(postData);
    return () => {
      initPost();
    };
  }, [initPost]);

  /**
   * 사진 추가 핸들링 함수
   * @param contentsList
   */
  const handleContentsListInput = useCallback(
    (contentsList: { url: string }[]) => {
      setPostData({ ...postData, contentsList });
    },
    [setPostData, postData]
  );

  /**
   * 내용 입력 핸들링 함수
   * @param content
   */
  const handleContentInput = useCallback(
    (content: string) => {
      setPostData({ ...postData, content });
    },
    [setPostData, postData]
  );

  /**
   * 암장 입력 핸들링 함수
   * @param centerId
   */
  const handleCenterIdInput = useCallback(
    (centerId: string) => {
      setPostData({ ...postData, centerId });
    },
    [setPostData, postData]
  );

  /**
   * 홀드 입력 핸들링 함수
   * @param climbingHistories postData 중 hold 에 관한 정보를 담는 객체
   */
  const handleClimbingHistoriesInput = useCallback(
    (climbingHistories: ClimbingHistoryRequest[]) => {
      setPostData({ ...postData, climbingHistories });
    },
    [setPostData, postData]
  );

  const handleGoToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  /**
   * 포스트 입력 완료 핸들링 함수
   */
  const handlePostDataSubmit = useCallback(() => {
    const urlList = postImageList.map(({ file }) => file);
    getPostContentsList(urlList);
    if (getPostContentsListSuccess) {
      console.log('success');
      handleContentsListInput(postContentsList);
      mutate();
      if (isSuccess) {
        handleGoToHome();
        alert('입력 완료 되었습니다.');
      } else {
        alert(error);
      }
    }
    if (getPostContentsListError) {
      alert('이미지 업로드 중 문제가 발생하였습니다.');
    }
  }, [
    mutate,
    isSuccess,
    error,
    getPostContentsList,
    handleContentsListInput,
    getPostContentsListError,
    postContentsList,
    getPostContentsListSuccess,
    postImageList,
    handleGoToHome,
  ]);

  if (getPostContentsListLoading) {
    return (
      <section className=" h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  }

  return (
    <div className="mb-footer overflow-auto scrollbar-hide">
      <AppBar
        title="새 게시물"
        leftNode={<BackButton onClick={() => setPage('first')} />}
        rightNode={
          <NextButton
            pageState={page}
            setPageState={setPage}
            onSubmit={page === 'second' ? handlePostDataSubmit : null}
          />
        }
      />
      <div className="p-4">
        {page === 'first' ? (
          <div className="flex flex-col gap-4">
            <PageSubTitle title={'사진'} />
            <UploadImageList />
            <PageSubTitle title={'내용'} />
            <TextArea
              data={postData.content}
              setData={handleContentInput}
              placeholder="500자 이내 글 입력"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <PageSubTitle title={'암장 이름'} />
            <CenterSearchInput
              selected={selected}
              setSelected={setSelected}
              setData={handleCenterIdInput}
              inputValue={searchInput}
              setInputValue={setSearchInput}
            />
            <PageSubTitle title={'완등 횟수'} />
            <HoldListModal
              maxCount={10}
              centerId={postData.centerId}
              preSelectedHoldList={postData.climbingHistories}
              setData={handleClimbingHistoriesInput}
            />
          </div>
        )}
      </div>
    </div>
  );
}
