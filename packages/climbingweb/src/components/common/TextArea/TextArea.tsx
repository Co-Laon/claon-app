import { ChangeEvent } from 'react';

interface ContentProps {
  refObj?: React.RefObject<HTMLTextAreaElement>;
  data?: string;
  setData?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextArea({
  refObj,
  data,
  setData,
  placeholder,
  className,
}: ContentProps) {
  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) setData(e.target.value);
  };

  return (
    <div
      className={`border  w-full border-gray resize-none rounded-lg p-4 ${className}`}
    >
      <textarea
        ref={refObj}
        onChange={onChangeValue}
        value={data}
        placeholder={placeholder}
        className=" w-full h-full placeholder:text-gray focus:outline-none resize-none"
      />
    </div>
  );
}
