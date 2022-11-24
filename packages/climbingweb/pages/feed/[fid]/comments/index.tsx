import { CommentInput } from 'climbingweb/src/components/Comments/CommentInput';
import { ParentComment } from 'climbingweb/src/components/Comments/Comments';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import {
  useCreateComment,
  useFindAllParentCommentAndThreeChildComment,
} from 'climbingweb/src/hooks/queries/post/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { CommentCreateRequest } from 'climbingweb/types/request/post';
import { useRouter } from 'next/router';

export default function CommentPage() {
  const router = useRouter();
  const { fid } = router.query;
  const feedId = fid as string;

  //현재 댓글 페이지의 댓글들을 가져옴
  const {
    data: commentData,
    isError: isCommentDataError,
    error: commentDataError,
    hasNextPage: hasCommentNextPage,
    fetchNextPage: fetchCommentNextPage,
    isFetchingNextPage: isFetchingCommentNextPage,
  } = useFindAllParentCommentAndThreeChildComment(feedId);

  //댓글 생성 useMutation
  const { mutate: createCommentMutate } = useCreateComment(feedId);

  //뒤로가기 핸들러
  const handleBackButtonClick = () => {
    router.back();
  };

  //등록 버튼 클릭 핸들러
  const handleSubmitComment = (request: CommentCreateRequest) => {
    createCommentMutate(request);
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
                replies={comment.children}
              />
            ))
          )}
          {!isFetchingCommentNextPage ? (
            <div className="h-[1px]" ref={target}></div>
          ) : (
            <Loading />
          )}
        </div>
        <CommentInput onClickSubmit={handleSubmitComment} />
      </div>
    );

  return <Loading />;
}
