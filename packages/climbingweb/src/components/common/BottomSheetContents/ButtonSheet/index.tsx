import { NormalButton, WhiteButton } from '../../button/Button';
import { ConfirmSheetProps } from '../type';

export const ButtonSheet = ({
  onConfirm,
  onCancel,
  text,
}: ConfirmSheetProps) => {
  return (
    <div className="flex flex-col gap-[10px] pt-[10px] pb-[20px] px-[15px]">
      <p className="text-base text-gray-600 font-normal text-center">{text}</p>
      <div className="flex flex-row justify-center text-center text-base font-bold gap-4 h-[5.6vh]">
        <WhiteButton className="h-[5.6vh] text-base" onClick={onCancel}>
          취소
        </WhiteButton>
        <NormalButton className="h-[5.6vh] text-base" onClick={onConfirm}>
          확인
        </NormalButton>
      </div>
    </div>
  );
};
