import React from 'react';
import { useState } from 'react';
import FeedContent from './FeedContent/FeedContent';
import FeedHeader from './FeedHeader/FeedHeader';
import FeedSectorInfo from './FeedSectorInfo/FeedSectorInfo';
import ImageSlider from '../ImageSlider/ImageSlider';
import { useCreateLike } from 'climbingweb/src/hooks/queries/post/useCreateLike';
import { useDeleteLike } from 'climbingweb/src/hooks/queries/post/useDeleteLike';
import { useFindAllParentCommentAndThreeChildComment } from 'climbingweb/src/hooks/queries/post/useFindAllParentCommentAndThreeChildComment';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ListSheet } from '../common/BottomSheetContents/ListSheet/ListSheet';
import { PostDetailResponse } from 'climbingweb/types/response/post';
import { UserPostDetailResponse } from 'climbingweb/types/response/laon';
import Loading from '../common/Loading/Loading';
import ErrorContent from '../common/Error/ErrorContent';
import { useRouter } from 'next/router';

interface HomeFeedProps {
  postData: PostDetailResponse | UserPostDetailResponse;
}

const HomeFeed = ({ postData }: HomeFeedProps) => {
  const router = useRouter();
  //바텀시트 open state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);

  //피드 댓글 정보 fetch useQuery
  const {
    data: commentData,
    isError: isCommentError,
    error: commentError,
  } = useFindAllParentCommentAndThreeChildComment(postData.postId);

  //좋아요 눌렀는지 여부 backend api 에서 제공 변경해야 함
  const [isLiked, setIsLiked] = useState<boolean>(postData.isLike);

  //좋아요 개수 state
  const [likeCount, setLikeCount] = useState<number>(
    postData ? postData.likeCount : 0
  );

  //좋아요 추가 useMutation
  const { mutate: createLikeMutate } = useCreateLike(postData.postId, {
    onSuccess: (createData) => {
      setIsLiked(!isLiked);
      if (createData) {
        setLikeCount(createData.likeCount);
      }
    },
  });

  //좋아요 취소 useMutation
  const { mutate: deleteLikeMutate } = useDeleteLike(postData.postId, {
    onSuccess: (deleteData) => {
      setIsLiked(!isLiked);
      if (deleteData) {
        setLikeCount(deleteData.likeCount);
      }
    },
  });

  //좋아요 아이콘 클릭 핸들러
  const handleLikeButtonClick = () => {
    if (isLiked) {
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

  if (isCommentError) return <ErrorContent error={commentError} />;

  if (commentData)
    return (
      <section className={'w-full mb-footer'}>
        <FeedHeader
          userImage={postData.userProfile}
          userName={postData.userNickname}
          userLocation={postData.centerName}
          handleOptionDotClick={handleOptionDotClick}
        />
        <ImageSlider imageList={postData.contentsList} />
        <FeedSectorInfo holdList={postData.climbingHistories} />
        <FeedContent
          isLiked={isLiked}
          likeCount={likeCount}
          createdAt={postData.createdAt}
          content={postData.content}
          replyCount={commentData.totalCount}
          onClickHeartIcon={handleLikeButtonClick}
          onClickMoreComment={handleMoreCommentClick}
        ></FeedContent>
        <BottomSheet open={openBTSheet} onDismiss={() => setOpenBTSheet(false)}>
          <ListSheet
            headerTitle={''}
            list={['신고하기']}
            onSelect={handleBTSheetListClick}
          />
        </BottomSheet>
      </section>
    );

  return <Loading />;
};

export default HomeFeed;
