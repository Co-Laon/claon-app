import { NormalButton, WhiteButton } from '../../button/Button';
import { ConfirmSheetProps } from '../type';

export const ButtonSheet = ({
  onConfirm,
  onCancel,
  text,
}: ConfirmSheetProps) => {
  return (
    <div className="flex flex-col gap-6 mb-4 p-4">
      <p className="text-base text-gray-600 font-normal text-center">{text}</p>
      <div className="flex flex-row justify-center text-center text-base font-bold px-4 gap-4">
        <WhiteButton onClick={onCancel}>취소</WhiteButton>
        <NormalButton onClick={onConfirm}>확인</NormalButton>
      </div>
    </div>
  );
};
