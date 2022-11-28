import { CommentCreateRequest } from 'climbingweb/types/request/post';

interface CommentInputProps {
  refObj: React.RefObject<HTMLInputElement>;
  parentCommentId?: string;
  onClickSubmit: (request: CommentCreateRequest) => void;
}

export const CommentInput = ({
  refObj,
  parentCommentId,
  onClickSubmit,
}: CommentInputProps) => {
  return (
    <div className="bg-gray-100 w-full h-24 flex p-4 fixed bottom-0 mb-footer">
      <div className="w-full bg-white rounded-lg flex">
        <input
          ref={refObj}
          className="w-full p-4"
          type="text"
          placeholder={
            parentCommentId
              ? '대댓글을 입력해 주세요.'
              : '댓글을 입력해 주세요.'
          }
        />
        <button
          className="bg-white min-w-max text-purple-500 rounded-lg p-4 mx-1"
          onClick={() => {
            const content = refObj.current?.value;
            if (content) {
              onClickSubmit({
                parentCommentId: parentCommentId,
                content: refObj.current?.value,
              });
              refObj.current.value = '';
            }
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};
