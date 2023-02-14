import { useRouter } from 'next/router';
import { useState } from 'react';
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
  const [moreRead, setMoreRead] = useState(false);

  const handleCreateChildComment = () => {
    router.push(`/feed/${postId}/comments/${commentId}`);
  };

  const handleMoreReadClick = () => {
    setMoreRead(true);
  };

  if (!(postId && commentId && content)) {
    return <CommentSkeleton />;
  }

  return (
    <div className="w-full flex flex-row mb-4 pr-4 gap-2">
      <div className="w-10 ml-1 mr-3 relative">
        <ProfileImage size={40} src={writerProfileImage} />
      </div>
      <div className="w-full">
        <div className="h-10 mb-2">
          <p className="text-base font-bold">{writerNickname}</p>
          <p className="text-gray-400 text-sm">
            {updatedAt ? updatedAt : createdAt}
            {isParent && (
              <span
                className="hover:text-black text-sm"
                onClick={handleCreateChildComment}
              >
                ·대댓글 달기
              </span>
            )}
            {isOwner && (
              <>
                <span
                  className="hover:text-black text-sm"
                  onClick={() => handleModifyCommentClick(commentId, content)}
                >
                  ·수정
                </span>
                <span
                  className="hover:text-black text-sm"
                  onClick={() => handleDeleteCommentClick(commentId)}
                >
                  ·삭제
                </span>
              </>
            )}
          </p>
        </div>
        {content.length > 75 && !moreRead ? (
          <div className="w-full text-sm break-all mr-2">
            <span>
              {isDeleted
                ? '삭제된 게시글 입니다'
                : content.substring(0, 75) + '...'}
            </span>
            <span className="text-gray-400" onClick={handleMoreReadClick}>
              더보기
            </span>
          </div>
        ) : (
          <div className="w-full text-sm break-all mr-2">
            {isDeleted ? '삭제된 게시글 입니다' : content}
          </div>
        )}
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
        <div className="flex flex-row ml-16 mb-4 content-center items-center">
          <div className="bg-gray-400 h-px w-8 mr-3" />
          <span
            className="text-gray-400 text-sm"
            onClick={handleMoreCommentClick}
          >
            대댓글 {childrenCommentCount}개 더 보기
          </span>
        </div>
      ) : null}
    </>
  );
}
