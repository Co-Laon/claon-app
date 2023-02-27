import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import { ButtonSheet } from 'climbingweb/src/components/common/BottomSheetContents/ButtonSheet';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import HomeFeed from 'climbingweb/src/components/HomeFeed/HomeFeed';
import {
  useDeletePost,
  useGetPost,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { PostDetailRequest } from 'climbingweb/types/request/post';

export default function FeedPage({}) {
  //바텀시트 open state
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();
  const { fid } = router.query;
  //fid string 거르는 로직, useRouter 에 대해 자세히 보고 추후 반드시 변경 해야함
  const feedId = fid as string;
  const { toast } = useToast();
  const { setPostData, addExistedImageList, initPost } = useCreatePostForm();

  const {
    data: postData,
    isError: isPostError,
    error: postError,
  } = useGetPost(feedId);

  useEffect(() => {
    initPost();
  }, []);

  const { mutate: deleteFeedMutate } = useDeletePost(feedId, {
    onSuccess: () => {
      setOpenDelete(false);
      router.back();
      toast('삭제 완료');
    },
    onError: () => {
      setOpenDelete(false);
      toast('게시글 삭제에 실패하였습니다.');
    },
  });

  const openBtSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  //redux에 postData를 저장하기 위하여 postData를 PostDetailRequest로 변환
  const responseToRequest: PostDetailRequest = useMemo(() => {
    if (postData) {
      return {
        centerId: postData.centerId,
        climbingHistories: postData.climbingHistories.map((history) => ({
          climbingCount: history.climbingCount,
          holdId: history.holdId,
        })),
        content: postData.content,
        contentsList: postData.contentsList.map((c) => ({ url: c })),
        postId: feedId,
        centerName: postData.centerName,
      };
    } else {
      return {
        centerId: '',
        climbingHistories: [
          {
            climbingCount: 0,
            holdId: '',
          },
        ],
        content: '',
        contentsList: [
          {
            url: '',
          },
        ],
        postId: '',
        centerName: '',
      };
    }
  }, [postData]);

  //바텀 시트 리스트 클릭 핸들러(본인 게시물 클릭 시)
  const handleEditRemoveBTSheetListClick = useCallback(
    (selectionData: '수정하기' | '삭제하기') => {
      if (selectionData == '삭제하기') {
        setOpenDelete(true);
      } else {
        setOpenDelete(false);
        setPostData(responseToRequest);
        addExistedImageList(postData?.contentsList || []);
        router.push(`/feed/edit/${feedId}`);
      }
    },
    [feedId, postData]
  );
  //삭제 취소 버튼 눌렀을 시
  const onClickDeleteCancelButton = useCallback(() => {
    setOpen(false);
    setOpenDelete(false);
  }, []);

  //뒤로가기 버튼 클릭 핸들러
  const handleBackButtonClick = useCallback(() => {
    window.history.back();
  }, []);

  //삭제 버튼 눌렀을 시
  const onClickDeleteButton = useCallback(() => {
    deleteFeedMutate();
  }, []);

  //신고하기 버튼을 눌렀을 경우
  const handleBtSheetListClick = useCallback(() => {
    router.push(`/report/${feedId}`);
  }, [feedId]);

  if (isPostError) return <ErrorContent error={postError} />;

  if (postData)
    return (
      <section>
        <AppBar leftNode={<BackButton onClick={handleBackButtonClick} />} />
        <HomeFeed postData={postData} openBtSheet={openBtSheet} />
        <BottomSheet open={open} onDismiss={onDismiss}>
          <ListSheet
            headerTitle={''}
            list={['신고하기']}
            onSelect={() => router.push(`/report/${postData.postId}`)}
          />
        </BottomSheet>

        <BottomSheet open={open} onDismiss={onDismiss}>
          {'isOwner' in postData && postData.isOwner ? (
            openDelete ? (
              <ButtonSheet
                text="게시글을 삭제하겠습니까?"
                onCancel={onClickDeleteCancelButton}
                onConfirm={onClickDeleteButton}
              />
            ) : (
              <ListSheet
                headerTitle={''}
                list={['삭제하기', '수정하기']}
                onSelect={handleEditRemoveBTSheetListClick}
                className="text-center"
              />
            )
          ) : (
            <ListSheet
              headerTitle={''}
              list={['신고하기']}
              onSelect={handleBtSheetListClick}
              className="text-center"
            />
          )}
        </BottomSheet>
      </section>
    );

  return <Loading />;
}
