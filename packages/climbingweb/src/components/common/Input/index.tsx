import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

interface InputProps {
  refObj?: React.RefObject<HTMLInputElement>;
  value?: string | number;
  onChange?: any;
  leftNode?: JSX.Element;
  rightNode?: JSX.Element;
  onKeyDown?: any;
}

export const Input = ({
  refObj,
  value,
  onChange,
  leftNode,
  rightNode,
  onKeyDown,
}: InputProps) => {
  const [borderColor, setBorderColor] = useState('border-gray-300');
  const containerCss = `border-2 h-12 w-full bg-white rounded-lg relative flex flex-row items-center justify-between px-4 ${borderColor}`;
  const handleFocused = () => {
    setBorderColor('border-purple-500');
  };
  const handleFocusedOut = () => {
    setBorderColor('border-gray-300');
  };
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };
  const handleEnterPressed = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown && e.key === 'Enter') onKeyDown();
    },
    []
  );

  return (
    <div className={containerCss}>
      {leftNode}
      <input
        ref={refObj}
        value={value}
        onChange={(e) => handleChangeValue(e)}
        onFocus={handleFocused}
        onBlur={handleFocusedOut}
        className="h-full w-full outline-0"
        onKeyDown={(e) => handleEnterPressed(e)}
      />
      {rightNode}
    </div>
  );
};
