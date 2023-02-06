import { CommentInput } from 'climbingweb/src/components/Comments/CommentInput';
import { Comment } from 'climbingweb/src/components/Comments/Comments';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ButtonSheet } from 'climbingweb/src/components/common/BottomSheetContents/ButtonSheet';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import {
  useCreateChildComment,
  useDeleteComment,
  useFindAllChildrenComment,
  useFindAllParentComment,
  useUpdateComment,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import {
  CommentCreateRequest,
  CommentUpdateRequest,
} from 'climbingweb/types/request/post';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

interface CommentInputState {
  content: string;
  isEdit: boolean;
  commentId: string;
}

export default function CommentDetailPage() {
  const router = useRouter();
  const { fid, cid } = router.query;
  const feedId = fid as string;
  const parentCommentId = cid as string;

  //바텀시트 open state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);

  //수정 선택한 댓글 client state
  const [selectedComment, setSelectedComment] = useState<CommentInputState>({
    content: '',
    isEdit: false,
    commentId: '0',
  });

  //댓글 수정 클릭 시 input focus 를 위한 ref
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  //현재 대댓글 페이지의 부모 댓글을 api 에서 지원하지 않기 때문에 따로 가져옴
  const {
    data: parentCommentsData,
    isError: isParentCommentsDataError,
    error: parentCommentsDataError,
  } = useFindAllParentComment(feedId);

  const parentCommentData = parentCommentsData?.pages[0].results.find(
    (result) => result.commentId === parentCommentId
  );

  //현재 대댓글 페이지의 대댓글들을 가져옴
  const {
    data: childrenCommentData,
    isError: isChildrenCommentDataError,
    error: childrenCommentDataError,
    hasNextPage: hasChildrenCommentNextPage,
    fetchNextPage: fetchChildrenCommentNextPage,
    isFetchingNextPage: isFetchingChildrenCommentNextPage,
  } = useFindAllChildrenComment(parentCommentId);

  //대댓글 생성 useMutation
  const { mutate: createChildCommentMutate } = useCreateChildComment(
    feedId,
    parentCommentId
  );

  //댓글 수정 useMutation
  const { mutate: updateCommentMutate } = useUpdateComment(
    feedId,
    selectedComment.commentId,
    parentCommentId
  );

  //댓글 삭제 useMutation
  const { mutate: deleteCommentMutate } = useDeleteComment(
    feedId,
    selectedComment.commentId,
    parentCommentId
  );

  //뒤로가기 핸들러
  const handleBackButtonClick = () => {
    router.back();
  };

  //댓글 수정 클릭 핸들러
  const handleModifyCommentClick = (commentId: string) => {
    setSelectedComment({ ...selectedComment, commentId, isEdit: true });
    commentInputRef.current?.focus();
  };

  //댓글 삭제 클릭 핸들러
  const handleDeleteCommentClick = (commentId: string) => {
    setSelectedComment({ ...selectedComment, commentId });
    setOpenBTSheet(true);
  };

  //등록 버튼 클릭 핸들러
  const handleSubmitCommentClick = (
    request: CommentCreateRequest | CommentUpdateRequest
  ) => {
    if (selectedComment.isEdit) {
      updateCommentMutate(request);
      setSelectedComment({ ...selectedComment, isEdit: false });
    } else {
      createChildCommentMutate(request);
    }
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

  //바텀 시트 확인 핸들러
  const handleConfirmBTSheet = () => {
    deleteCommentMutate();
    setOpenBTSheet(false);
  };

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
      isOwner,
    } = parentCommentData;

    return (
      <div className="mb-footer overflow-auto scrollbar-hide">
        <AppBar
          leftNode={<BackButton onClick={handleBackButtonClick} />}
          title={`대댓글 ${childrenCommentData.pages[0].totalCount}`}
          rightNode={<Empty />}
        />
        <Comment
          postId={feedId}
          commentId={parentCommentId}
          content={content}
          isDeleted={isDeleted}
          writerNickname={writerNickname}
          writerProfileImage={writerProfileImage}
          createdAt={createdAt}
          updatedAt={updatedAt}
          isOwner={isOwner}
          isParent={false}
          handleModifyCommentClick={handleModifyCommentClick}
          handleDeleteCommentClick={handleDeleteCommentClick}
        />
        <div className="pl-10">
          {childrenCommentData.pages.map((page) => {
            return page.results.map((comment) => {
              return (
                <Comment
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
                  isOwner={comment.isOwner}
                  handleModifyCommentClick={handleModifyCommentClick}
                  handleDeleteCommentClick={handleDeleteCommentClick}
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
          refObj={commentInputRef}
          parentCommentId={parentCommentId}
          onClickSubmit={handleSubmitCommentClick}
        />
        <BottomSheet open={openBTSheet} onDismiss={() => setOpenBTSheet(false)}>
          <ButtonSheet
            text="댓글을 삭제하시겠습니까?"
            onCancel={() => setOpenBTSheet(false)}
            onConfirm={handleConfirmBTSheet}
          />
        </BottomSheet>
      </div>
    );
  }

  return <Loading />;
}
