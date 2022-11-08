import { useSearchCenterName } from 'climbingweb/src/hooks/queries/center/useSearchCenterName';
import CenterName from 'climbingweb/src/interface/CenterName';
import { ChangeEvent, useState, useEffect, useRef } from 'react';

interface CenterSearchInputProps {
  selected: boolean;
  setSelected: any;
  setData: any;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CenterSearchInput = ({
  selected,
  setSelected,
  setData,
  inputValue,
  setInputValue,
}: CenterSearchInputProps) => {
  const ref = useRef(null);
  //css 관련 state
  const [borderColor, setBorderColor] = useState('');
  const [border, setBorder] = useState('');
  //검색 결과가 open 되어야 할 지 말지
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const { isLoading, data: centerList } = useSearchCenterName(inputValue);

  const inputCss = `border-2 border-gray-300 h-12 w-full bg-white relative flex flex-col justify-between px-4 focused:border-purple-500 ${borderColor} ${border}`;

  //focus 관련 handler
  const handleFocused = () => {
    setBorderColor('border-purple-500');
    setIsOptionOpen(centerList?.length !== 0);
  };
  const handleFocusedOut = () => {
    setBorderColor('');
    setIsOptionOpen(false);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(false);
  };

  // option list 중 하나를 선택 했을 때 handler
  const handleSelected = (val: CenterName) => {
    setInputValue(val.name);
    setData(val.id);
    setSelected(true);
  };

  // option list 가 열고 닫힐 때, input component 의 border 변경
  useEffect(() => {
    if (isOptionOpen) {
      setBorder('rounded-t-lg');
    } else {
      setBorder('rounded-lg');
    }
  }, [isOptionOpen]);

  // centerList 가 비어있는 경우 option list 를 닫는 상태로 변경
  useEffect(() => {
    setIsOptionOpen(!selected && centerList?.length !== 0);
  }, [centerList]);

  useEffect(() => {
    setIsOptionOpen(false);
    if (!selected) {
      setData('');
    }
  }, [selected]);

  return (
    <div className={'relative'}>
      <form className={inputCss} id="searchInputForm">
        <input
          ref={ref}
          value={inputValue}
          onChange={handleChangeValue}
          onFocus={handleFocused}
          onBlur={handleFocusedOut}
          className="h-full w-full outline-0"
        />
      </form>
      {isOptionOpen && centerList ? (
        <div
          className={
            'absolute border-x-2 border-b-2 rounded-b-lg w-full bg-white flex flex-col justify-evenly px-4 focused:border-purple-500 border-purple-500'
          }
        >
          {isLoading ? (
            <div>...</div>
          ) : (
            centerList.map((val: any, index: number) => (
              <div
                key={`searchInputForm_${index}`}
                className="my-2"
                onTouchEnd={() => handleSelected(val)}
              >
                {val.name}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};
