import { ChangeEvent } from 'react';

interface ContentProps {
  data?: string;
  setData: (content: string) => void;
  placeholder?: string;
}

export default function TextArea({ data, setData, placeholder }: ContentProps) {
  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  return (
    <div className="border h-96 w-full border-gray resize-none rounded-lg p-4">
      <textarea
        onChange={onChangeValue}
        value={data}
        placeholder={placeholder}
        className=" w-full h-full placeholder:text-gray focus:outline-none resize-none"
      />
    </div>
  );
}
