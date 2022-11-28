import { CommentInput } from 'climbingweb/src/components/Comments/CommentInput';
import { ParentComment } from 'climbingweb/src/components/Comments/Comments';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ButtonSheet } from 'climbingweb/src/components/common/BottomSheetContents/ButtonSheet';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import {
  useCreateComment,
  useDeleteComment,
  useFindAllParentComment,
  useUpdateComment,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import {
  CommentCreateRequest,
  CommentUpdateRequest,
} from 'climbingweb/types/request/post';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

interface CommentInputState {
  content: string;
  isEdit: boolean;
  commentId: string;
}

export default function CommentPage() {
  const router = useRouter();
  const { fid } = router.query;
  const feedId = fid as string;

  //바텀시트 open state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);

  //수정 선택한 댓글 client state
  const [selectedComment, setSelectedComment] = useState<CommentInputState>({
    content: '',
    isEdit: false,
    commentId: '0',
  });

  //댓글 수정 클릭 시 input focus 를 위한 ref
  const commentInputRef = useRef<HTMLInputElement>(null);

  //현재 댓글 페이지의 댓글들을 가져옴
  const {
    data: commentData,
    isError: isCommentDataError,
    error: commentDataError,
    hasNextPage: hasCommentNextPage,
    fetchNextPage: fetchCommentNextPage,
    isFetchingNextPage: isFetchingCommentNextPage,
  } = useFindAllParentComment(feedId);

  //댓글 생성 useMutation
  const { mutate: createCommentMutate } = useCreateComment(feedId);

  //댓글 수정 useMutation
  const { mutate: updateCommentMutate } = useUpdateComment(
    feedId,
    selectedComment.commentId
  );

  //댓글 삭제 useMutation
  const { mutate: deleteCommentMutate } = useDeleteComment(
    feedId,
    selectedComment.commentId
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
  const handleSubmitComment = (
    request: CommentCreateRequest | CommentUpdateRequest
  ) => {
    if (selectedComment.isEdit) {
      updateCommentMutate(request);
      setSelectedComment({ ...selectedComment, isEdit: false });
    } else {
      createCommentMutate(request);
    }
  };

  //infinite scroll 핸들러
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasCommentNextPage) {
        fetchCommentNextPage();
      }
    },
    { threshold: 1 }
  );

  //바텀 시트 확인 핸들러
  const handleConfirmBTSheet = () => {
    deleteCommentMutate();
    setOpenBTSheet(false);
  };

  if (isCommentDataError) {
    return <ErrorContent error={commentDataError} />;
  }

  if (commentData)
    return (
      <div className="mb-footer overflow-auto scrollbar-hide">
        <div className="mb-footer">
          <AppBar
            leftNode={<BackButton onClick={handleBackButtonClick} />}
            title={`댓글 ${commentData.pages[0].totalCount}`}
            rightNode={<Empty />}
          />
          {commentData.pages.map((page) =>
            page.results.map((comment) => (
              <ParentComment
                key={comment.commentId}
                postId={comment.postId}
                commentId={comment.commentId}
                content={comment.content}
                isDeleted={comment.isDeleted}
                writerNickname={comment.writerNickname}
                writerProfileImage={comment.writerProfileImage}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                childrenCommentCount={comment.childrenCommentCount}
                isOwner={comment.isOwner}
                handleModifyCommentClick={handleModifyCommentClick}
                handleDeleteCommentClick={handleDeleteCommentClick}
              />
            ))
          )}
          {!isFetchingCommentNextPage ? (
            <div className="h-[1px]" ref={target}></div>
          ) : (
            <Loading />
          )}
        </div>
        <CommentInput
          refObj={commentInputRef}
          onClickSubmit={handleSubmitComment}
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

  return <Loading />;
}
