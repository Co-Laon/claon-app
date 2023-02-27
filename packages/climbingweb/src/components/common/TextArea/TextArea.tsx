import { useToast } from 'climbingweb/src/hooks/useToast';
import { ChangeEvent } from 'react';

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
  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (limitLength ? e.target.value.length > limitLength - 1 : false) {
      toast(`${limitLength}자 이내로 작성해주세요.`);
      return;
    }
    if (setData) setData(e.target.value);
  };

  return (
    <div
      className={`border w-full border-gray resize-none rounded-lg p-4 ${className}`}
    >
      <textarea
        ref={refObj}
        onChange={onChangeValue}
        value={data}
        placeholder={placeholder}
        className=" w-full h-full placeholder:text-gray focus:outline-none resize-none"
        maxLength={limitLength}
      />
    </div>
  );
}
