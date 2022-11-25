import { Pagination } from 'climbingweb/types/common';
import { ChildCommentResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ParentCommentProps {
  postId: string;
  commentId: string;
  content: string;
  isDeleted: boolean;
  writerNickname: string;
  writerProfileImage: string;
  createdAt: string;
  updatedAt?: string;
  replies?: Pagination<ChildCommentResponse>;
}

interface CommentProps {
  postId: string;
  commentId?: string;
  content: string;
  isDeleted: boolean;
  writerNickname: string;
  writerProfileImage: string;
  createdAt: string;
  updatedAt?: string;
  isParent: boolean;
}

export const Commment = ({
  postId,
  commentId,
  content,
  isDeleted,
  writerNickname,
  writerProfileImage,
  createdAt,
  updatedAt,
  isParent,
}: CommentProps) => {
  const router = useRouter();
  const hanedleCreateChildComment = () => {
    router.push(`/feed/${postId}/comments/${commentId}`);
  };

  return (
    <div className="w-screen flex flex-row mx-5">
      <div className="flex flex-row py-4 gap-2">
        <div className="h-10 w-10 relative">
          <Image
            className="rounded-full"
            layout="fill"
            objectFit="cover"
            src={writerProfileImage}
            alt="comment"
          />
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
                  ·답댓글 달기
                </span>
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
  replies,
}: ParentCommentProps) {
  const moreCommentCount = replies ? replies.totalCount - 3 : 0;
  const router = useRouter();

  const handleMoreCommentClick = () => {
    router.push(`/feed/${postId}/comments/${commentId}`);
  };

  return (
    <>
      <Commment
        postId={postId}
        commentId={commentId}
        content={content}
        isDeleted={isDeleted}
        writerNickname={writerNickname}
        writerProfileImage={writerProfileImage}
        createdAt={createdAt}
        updatedAt={updatedAt}
        isParent={true}
      />
      {replies && (
        <div className="pl-10">
          {replies.results.map((reply) => (
            <Commment
              key={reply.commentId}
              postId={postId}
              commentId={reply.commentId}
              content={reply.content}
              isDeleted={reply.isDeleted}
              writerNickname={reply.writerNickname}
              writerProfileImage={reply.writerProfileImage}
              createdAt={reply.createdAt}
              updatedAt={reply.updatedAt}
              isParent={false}
            />
          ))}
          {moreCommentCount > 0 ? (
            <div className="flex flex-row h-10 content-center items-center">
              <div className="bg-gray-400 h-px w-8 mr-3" />
              <span className="text-gray-400" onClick={handleMoreCommentClick}>
                답댓글 {moreCommentCount}개 더 보기
              </span>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
