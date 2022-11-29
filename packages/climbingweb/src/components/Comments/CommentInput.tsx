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
  //등록 버튼 클릭 핸들러
  const handleSubmitButtonClick = () => {
    const content = refObj.current?.value;
    if (content) {
      onClickSubmit({
        parentCommentId: parentCommentId,
        content: refObj.current?.value,
      });
      refObj.current.value = '';
    }
  };

  return (
    <div className="bg-gray-100 w-full h-24 flex p-4 fixed bottom-0 mb-footer">
      <div className="w-full bg-white rounded-lg flex">
        <input
          ref={refObj}
          className="w-full p-4"
          type="text"
          placeholder={'댓글을 입력해 주세요.'}
        />
        <button
          className="bg-white min-w-max text-purple-500 rounded-lg p-4 mx-1"
          onClick={handleSubmitButtonClick}
        >
          등록
        </button>
      </div>
    </div>
  );
};
