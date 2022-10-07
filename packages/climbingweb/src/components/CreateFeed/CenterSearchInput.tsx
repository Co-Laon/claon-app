import debounce from 'climbingweb/src/hooks/debounce';
import { useSearchCenterName } from 'climbingweb/src/hooks/queries/center-controller/useSearchCenterName';
import CenterName from 'climbingweb/src/interface/CenterName';
import { ChangeEvent, useState, useEffect, useRef } from 'react';

interface CenterSearchInputProps {
  setData: any;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CenterSearchInput = ({
  setData,
  inputValue,
  setInputValue,
}: CenterSearchInputProps) => {
  const ref = useRef(null);
  const [borderColor, setBorderColor] = useState('');
  const [border, setBorder] = useState('');
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const inputCss = `border-2 border-gray-300 h-12 w-full bg-white relative flex flex-col justify-between px-4 focused:border-purple-500 ${borderColor} ${border}`;
  const handleFocused = () => {
    setBorderColor('border-purple-500');
  };
  const handleFocusedOut = () => {
    setBorderColor('');
    setIsOptionOpen(false);
  };

  const { data } = useSearchCenterName(inputValue);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(setInputValue(e.target.value), 500);
    setSelected(false);
  };

  const handleSelected = (val: CenterName) => {
    setInputValue(val.name);
    setData(val.id);
    setSelected(true);
  };

  useEffect(() => {
    if (isOptionOpen) {
      setBorder('rounded-t-lg');
    } else {
      setBorder('rounded-lg');
    }
  }, [isOptionOpen]);

  useEffect(() => {
    setIsOptionOpen(inputValue !== '');
  }, [inputValue]);

  useEffect(() => {
    if (selected) {
      setIsOptionOpen(false);
    } else {
      setIsOptionOpen(false);
      setData('');
    }
  }, [selected]);

  return (
    <div className={'relative'}>
      <form className={inputCss} id="searchInputForm">
        <input
          ref={ref}
          value={inputValue}
          onChange={(e) => handleChangeValue(e)}
          onFocus={handleFocused}
          onBlur={handleFocusedOut}
          className="h-full w-full outline-0"
        />
      </form>
      {isOptionOpen && data ? (
        <div
          className={
            'absolute border-x-2 border-b-2 rounded-b-lg w-full bg-white flex flex-col justify-evenly px-4 focused:border-purple-500 border-purple-500'
          }
        >
          {data.map((val: any, index: number) => (
            <div
              key={`searchInputForm_${index}`}
              className="my-2"
              onTouchEnd={() => handleSelected(val)}
            >
              {val.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
