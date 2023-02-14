import React from 'react';
import { useState } from 'react';
import FeedContent from './FeedContent/FeedContent';
import FeedHeader from './FeedHeader/FeedHeader';
import FeedSectorInfo from './FeedSectorInfo/FeedSectorInfo';
import ImageSlider from '../ImageSlider/ImageSlider';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ListSheet } from '../common/BottomSheetContents/ListSheet/ListSheet';
import { PostDetailResponse } from 'climbingweb/types/response/post';
import { UserPostDetailResponse } from 'climbingweb/types/response/laon';
import ErrorContent from '../common/Error/ErrorContent';
import { useRouter } from 'next/router';
import {
  useCreateLike,
  useDeleteLike,
  useDeletePost,
  useFindAllParentComment,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { FeedSkeleton } from '../common/skeleton/FeedSkeleton';
import { ButtonSheet } from '../common/BottomSheetContents/ButtonSheet';
import { useToast } from 'climbingweb/src/hooks/useToast';

interface HomeFeedProps {
  postData: PostDetailResponse | UserPostDetailResponse;
}

const HomeFeed = ({ postData }: HomeFeedProps) => {
  const router = useRouter();
  //바텀시트 open state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);
  //삭제시트 state
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  //Toast
  const { toast } = useToast();
  //삭제 mutation
  const { mutate: deleteFeedMutate } = useDeletePost(postData.postId, {
    onSuccess: () => {
      setOpenBTSheet(false);
      setOpenDelete(false);
      router.back();
      toast('삭제 완료');
    },
    onError: () => {
      setOpenBTSheet(false);
      setOpenDelete(false);
      toast('게시글 삭제에 실패하였습니다.');
    },
  });

  //피드 댓글 정보 fetch useQuery
  const {
    data: commentData,
    isError: isCommentError,
    error: commentError,
  } = useFindAllParentComment(postData.postId);

  //좋아요 추가 useMutation
  const { mutate: createLikeMutate } = useCreateLike(postData.postId);

  //좋아요 취소 useMutation
  const { mutate: deleteLikeMutate } = useDeleteLike(postData.postId);

  //좋아요 아이콘 클릭 핸들러
  const handleLikeButtonClick = () => {
    if (postData.isLike) {
      deleteLikeMutate();
    } else {
      createLikeMutate();
    }
  };

  //댓글 더보기 클릭 핸들러
  const handleMoreCommentClick = () => {
    router.push(`/feed/${postData.postId}/comments`);
  };

  //옵션 도트 클릭 핸들러
  const handleOptionDotClick = () => setOpenBTSheet(true);

  //바텀시트 리스트 클릭 핸들러
  const handleBTSheetListClick = () =>
    router.push(`/report/${postData.postId}`);

  //바텀 시트 리스트 클릭 핸들러(본인 게시물 클릭 시)
  const handleEditRemoveBTSheetListClick = (
    selectionData: '수정하기' | '삭제하기'
  ) => {
    if (selectionData == '삭제하기') {
      setOpenDelete(true);
    } else {
      setOpenBTSheet(false);
      setOpenDelete(false);
      router.push(`/feed/edit/${postData.postId}`);
    }
  };

  //삭제 취소 버튼 눌렀을 시
  const onClickDeleteCancelButton = () => {
    setOpenBTSheet(false);
    setOpenDelete(false);
  };

  //삭제 버튼 눌렀을 시
  const onClickDeleteButton = () => {
    deleteFeedMutate();
  };

  if (isCommentError) return <ErrorContent error={commentError} />;

  if (commentData)
    return (
      <section className={'w-full mb-[17px]'}>
        <FeedHeader
          userImage={postData.userProfile}
          userName={postData.userNickname}
          userLocation={postData.centerName}
          handleOptionDotClick={handleOptionDotClick}
        />
        <ImageSlider imageList={postData.contentsList} />
        <FeedSectorInfo holdList={postData.climbingHistories} />
        <FeedContent
          isLiked={postData.isLike}
          likeCount={postData.likeCount}
          createdAt={postData.createdAt}
          content={postData.content}
          replyCount={commentData.pages[0].totalCount}
          onClickHeartIcon={handleLikeButtonClick}
          onClickMoreComment={handleMoreCommentClick}
        ></FeedContent>
        <BottomSheet open={openBTSheet} onDismiss={() => setOpenBTSheet(false)}>
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
              onSelect={handleBTSheetListClick}
              className="text-center"
            />
          )}
        </BottomSheet>
      </section>
    );

  return <FeedSkeleton />;
};

export default HomeFeed;
