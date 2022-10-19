import { ChangeEvent, useRef, useState } from 'react';

interface InputProps {
  value?: string | number;
  onChange?: any;
  leftNode?: JSX.Element;
  rightNode?: JSX.Element;
}

export const Input = ({ value, onChange, leftNode, rightNode }: InputProps) => {
  const ref = useRef(null);
  const [borderColor, setBorderColor] = useState('');
  const containerCss = `border-2 border-gray-300 h-12 w-full bg-white rounded-lg relative flex flex-row items-center justify-between px-4 focused:border-purple-500 ${borderColor}`;
  const handleFocused = () => {
    setBorderColor('border-purple-500');
  };
  const handleFocusedOut = () => {
    setBorderColor('');
  };
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={containerCss}>
      {leftNode}
      <input
        ref={ref}
        value={value}
        onChange={(e) => handleChangeValue(e)}
        onFocus={handleFocused}
        onBlur={handleFocusedOut}
        className="h-full w-full outline-0"
      />
      {rightNode}
    </div>
  );
};
