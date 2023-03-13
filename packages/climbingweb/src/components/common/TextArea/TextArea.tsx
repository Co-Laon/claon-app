import { useToast } from 'climbingweb/src/hooks/useToast';
import { ChangeEvent, useState } from 'react';

interface ContentProps {
  refObj?: React.RefObject<HTMLTextAreaElement>;
  data?: string;
  setData?: (content: string) => void;
  placeholder?: string;
  className?: string;
  limitLength?: number;
}

export default function TextArea({
  refObj,
  data,
  setData,
  placeholder,
  className,
  limitLength,
}: ContentProps) {
  const { toast } = useToast();
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);

  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (limitLength ? e.target.value.length > limitLength - 1 : false) {
      toast(`${limitLength}자 이내로 작성해주세요.`);
      setIsMaxLength(true);
      return;
    }
    if (isMaxLength) setIsMaxLength(false);
    if (setData) setData(e.target.value);
  };

  return (
    <div
      className={`border w-full ${
        isMaxLength ? 'border-red-500' : 'border-gray'
      } resize-none rounded-lg p-1 ${className}`}
    >
      <textarea
        ref={refObj}
        onChange={onChangeValue}
        placeholder={placeholder}
        className=" w-full h-full placeholder:text-gray focus:outline-none resize-none p-3 scroll-m-0"
        maxLength={limitLength}
        defaultValue={data}
      />
    </div>
  );
}
