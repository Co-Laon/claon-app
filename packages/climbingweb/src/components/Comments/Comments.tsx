import { useRouter } from 'next/router';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { CommentSkeleton } from '../common/skeleton/CommentSkeleton';

interface ParentCommentProps {
  postId: string;
  commentId: string;
  content: string;
  isDeleted: boolean;
  writerNickname: string;
  writerProfileImage: string;
  createdAt: string;
  updatedAt?: string;
  childrenCommentCount: number;
  isOwner?: boolean;
  handleModifyCommentClick: (commentId: string, content: string) => void;
  handleDeleteCommentClick: (commentId: string) => void;
}

interface CommentProps {
  postId: string;
  commentId: string;
  content: string;
  isDeleted: boolean;
  writerNickname: string;
  writerProfileImage: string;
  createdAt: string;
  updatedAt?: string;
  isParent: boolean;
  isOwner?: boolean;
  handleModifyCommentClick: (commentId: string, content: string) => void;
  handleDeleteCommentClick: (commentId: string) => void;
}

export const Comment = ({
  postId,
  commentId,
  content,
  isDeleted,
  writerNickname,
  writerProfileImage,
  createdAt,
  updatedAt,
  isParent,
  isOwner,
  handleModifyCommentClick,
  handleDeleteCommentClick,
}: CommentProps) => {
  const router = useRouter();
  const hanedleCreateChildComment = () => {
    router.push(`/feed/${postId}/comments/${commentId}`);
  };

  if (!(postId && commentId && content)) {
    return <CommentSkeleton />;
  }

  return (
    <div className="w-screen flex flex-row mr-5">
      <div className="flex flex-row py-4 gap-2">
        <div className="w-10 mr-3 relative">
          <ProfileImage src={writerProfileImage} />
        </div>
        <div className="w-screen gap-2">
          <div className="h-10">
            <p className="text-sm font-bold">{writerNickname}</p>
            <p className="text-gray-400 ">
              {updatedAt ? updatedAt : createdAt}
              {isParent && (
                <span
                  className="hover:text-black"
                  onClick={hanedleCreateChildComment}
                >
                  ·대댓글 달기
                </span>
              )}
              {isOwner && (
                <>
                  <span
                    className="hover:text-black"
                    onClick={() => handleModifyCommentClick(commentId, content)}
                  >
                    ·수정
                  </span>
                  <span
                    className="hover:text-black"
                    onClick={() => handleDeleteCommentClick(commentId)}
                  >
                    ·삭제
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="w-screen">
            <p className="text-sm line-clamp-3 inline">
              {isDeleted ? '삭제된 게시글 입니다' : content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ParentComment({
  postId,
  commentId,
  content,
  isDeleted,
  writerNickname,
  writerProfileImage,
  createdAt,
  updatedAt,
  childrenCommentCount,
  isOwner,
  handleModifyCommentClick,
  handleDeleteCommentClick,
}: ParentCommentProps) {
  const router = useRouter();

  const handleMoreCommentClick = () => {
    router.push(`/feed/${postId}/comments/${commentId}`);
  };

  if (!(postId && commentId && content)) {
    return <CommentSkeleton />;
  }

  return (
    <>
      <Comment
        postId={postId}
        commentId={commentId}
        content={content}
        isDeleted={isDeleted}
        writerNickname={writerNickname}
        writerProfileImage={writerProfileImage}
        createdAt={createdAt}
        updatedAt={updatedAt}
        isParent={true}
        isOwner={isOwner}
        handleModifyCommentClick={() =>
          handleModifyCommentClick(commentId, content)
        }
        handleDeleteCommentClick={() => handleDeleteCommentClick(commentId)}
      />
      {childrenCommentCount > 0 ? (
        <div className="flex flex-row pl-10 h-10 content-center items-center">
          <div className="bg-gray-400 h-px w-8 mr-3" />
          <span className="text-gray-400" onClick={handleMoreCommentClick}>
            대댓글 {childrenCommentCount}개 더 보기
          </span>
        </div>
      ) : null}
    </>
  );
}
