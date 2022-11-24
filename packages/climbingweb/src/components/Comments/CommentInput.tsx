import { CommentCreateRequest } from 'climbingweb/types/request/post';
import { useRef } from 'react';

interface CommentInputProps {
  commentId?: string;
  onClickSubmit: (request: CommentCreateRequest) => void;
}

export const CommentInput = ({
  commentId,
  onClickSubmit,
}: CommentInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-gray-100 w-full h-24 flex p-4 fixed bottom-0 mb-footer">
      <div className="w-full bg-white rounded-lg flex">
        <input
          ref={ref}
          className="w-full p-4"
          type="text"
          placeholder={
            commentId ? '답댓글을 입력해 주세요.' : '댓글을 입력해 주세요.'
          }
        />
        <button
          className="bg-white min-w-max text-purple-500 rounded-lg p-4 mx-1"
          onClick={() => {
            const content = ref.current?.value;
            if (content) {
              onClickSubmit({
                parentCommentId: commentId,
                content: ref.current?.value,
              });
              ref.current.value = '';
            }
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};
