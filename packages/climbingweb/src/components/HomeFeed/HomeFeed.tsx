import React from 'react';
import { useState } from 'react';
import FeedContent from './FeedContent/FeedContent';
import FeedHeader from './FeedHeader/FeedHeader';
import FeedSectorInfo from './FeedSectorInfo/FeedSectorInfo';
import ImageSlider from '../ImageSlider/ImageSlider';
import { useCreateLike } from 'climbingweb/src/hooks/queries/post/useCreateLike';
import { useDeleteLike } from 'climbingweb/src/hooks/queries/post/useDeleteLike';
import { useGetPost } from 'climbingweb/src/hooks/queries/post/useGetPost';
import { useFindAllParentCommentAndThreeChildComment } from 'climbingweb/src/hooks/queries/post/useFindAllParentCommentAndThreeChildComment';

interface HomeFeedProps {
  postId: string;
}

const HomeFeed = ({ postId }: HomeFeedProps) => {
  //피드 정보
  const {
    data: postData,
    isError: isPostError,
    error: postError,
  } = useGetPost(postId);
  //댓글 정보

  //피드 댓글 정보 fetch useQuery
  const {
    data: commentData,
    isError: isCommentError,
    error: commentError,
  } = useFindAllParentCommentAndThreeChildComment(postId);

  //좋아요 눌렀는지 여부 backend api 에서 제공 시 변경
  const [isLiked, setIsLiked] = useState<boolean>(false);

  //좋아요 추가 useMutation
  const { mutate: createLikeMutate } = useCreateLike(postId, {
    onSuccess: () => setIsLiked(!isLiked),
  });

  //좋아요 취소 useMutation
  const { mutate: deleteLikeMutate } = useDeleteLike(postId, {
    onSuccess: () => setIsLiked(!isLiked),
  });

  const handleLikeButtonClick = () => {
    if (isLiked) {
      deleteLikeMutate();
    } else {
      createLikeMutate();
    }
  };

  if (isPostError) return <div>{postError}</div>;
  if (isCommentError) return <div>{commentError}</div>;

  if (!!postData && !!commentData)
    return (
      <section className={'w-full mb-footer'}>
        <FeedHeader
          userImage={postData.userProfile}
          userName={postData.userNickname}
          userLocation={postData.centerName}
        />
        <ImageSlider imageList={postData.contentsList} />
        <FeedSectorInfo holdList={postData.climbingHistories} />
        <FeedContent
          isLiked={isLiked}
          likeCount={postData.likeCount}
          createdAt={postData.createdAt}
          content={postData.content}
          replyCount={commentData.totalCount}
          onTouchHeartIcon={handleLikeButtonClick}
        ></FeedContent>
      </section>
    );

  return <div>로딩 중...</div>;
};

export default HomeFeed;
