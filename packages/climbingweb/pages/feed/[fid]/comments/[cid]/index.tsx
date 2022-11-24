import { CommentInput } from 'climbingweb/src/components/Comments/CommentInput';
import { Commment } from 'climbingweb/src/components/Comments/Comments';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import {
  useCreateChildComment,
  useFindAllChildrenComment,
  useFindAllParentCommentAndThreeChildComment,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { CommentCreateRequest } from 'climbingweb/types/request/post';
import { useRouter } from 'next/router';
import React from 'react';

export default function CommentDetailPage() {
  const router = useRouter();
  const { fid, cid } = router.query;
  const feedId = fid as string;
  const commentId = cid as string;

  //현재 답댓글 페이지의 부모 댓글을 api 에서 지원하지 않기 때문에 따로 가져옴
  const {
    data: parentCommentsData,
    isError: isParentCommentsDataError,
    error: parentCommentsDataError,
  } = useFindAllParentCommentAndThreeChildComment(feedId);

  const parentCommentData = parentCommentsData?.pages[0].results.find(
    (result) => result.commentId === commentId
  );

  //현재 답댓글 페이지의 답댓글들을 가져옴
  const {
    data: childrenCommentData,
    isError: isChildrenCommentDataError,
    error: childrenCommentDataError,
    hasNextPage: hasChildrenCommentNextPage,
    fetchNextPage: fetchChildrenCommentNextPage,
    isFetchingNextPage: isFetchingChildrenCommentNextPage,
  } = useFindAllChildrenComment(commentId);

  //답댓글 생성 useMutation
  const { mutate: createCommentMutate } = useCreateChildComment(
    feedId,
    commentId
  );

  //뒤로가기 핸들러
  const handleBackButtonClick = () => {
    router.back();
  };

  //등록 버튼 클릭 핸들러
  const handleSubmitCommentClick = (request: CommentCreateRequest) => {
    createCommentMutate(request);
  };

  //infinite scroll 핸들러
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasChildrenCommentNextPage) {
        fetchChildrenCommentNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isParentCommentsDataError || isChildrenCommentDataError) {
    return (
      <ErrorContent
        error={parentCommentsDataError || childrenCommentDataError}
      />
    );
  }

  if (parentCommentData && childrenCommentData) {
    const {
      content,
      isDeleted,
      writerNickname,
      writerProfileImage,
      createdAt,
      updatedAt,
    } = parentCommentData;

    return (
      <div className="mb-footer overflow-auto scrollbar-hide">
        <AppBar
          leftNode={<BackButton onClick={handleBackButtonClick} />}
          title={`답댓글 ${childrenCommentData.pages[0].totalCount}`}
          rightNode={<Empty />}
        />
        <Commment
          postId={feedId}
          commentId={commentId}
          content={content}
          isDeleted={isDeleted}
          writerNickname={writerNickname}
          writerProfileImage={writerProfileImage}
          createdAt={createdAt}
          updatedAt={updatedAt}
          isParent={true}
        />
        <div className="pl-10">
          {childrenCommentData.pages.map((page) => {
            return page.results.map((comment) => {
              return (
                <Commment
                  key={comment.commentId}
                  postId={comment.postId}
                  commentId={comment.commentId}
                  content={comment.content}
                  isDeleted={comment.isDeleted}
                  writerNickname={comment.writerNickname}
                  writerProfileImage={comment.writerProfileImage}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  isParent={false}
                />
              );
            });
          })}
          {!isFetchingChildrenCommentNextPage ? (
            <div className="h-[1px]" ref={target}></div>
          ) : (
            <Loading />
          )}
        </div>
        <CommentInput
          commentId={commentId}
          onClickSubmit={handleSubmitCommentClick}
        />
      </div>
    );
  }

  return <Loading />;
}
