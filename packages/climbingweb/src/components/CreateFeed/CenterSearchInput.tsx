import { CenterNameResponse } from 'climbingweb/types/response/center';

import { ChangeEvent, useState, useEffect } from 'react';

interface CenterSearchInputProps {
  refObj?: React.RefObject<HTMLInputElement>;
  selected: boolean;
  setSelected: any;
  setData: (centerName: string, centerId: string) => void;
  initialValue?: string;
  centerList?: CenterNameResponse[];
  onChange: any;
}

export const CenterSearchInput = ({
  refObj,
  selected,
  setSelected,
  setData,
  initialValue,
  centerList,
  onChange,
}: CenterSearchInputProps) => {
  //focus 관련 state
  const [focused, setFocused] = useState(false);
  //검색 결과가 open 되어야 할 지 말지
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const [inputValue, setInputValue] = useState<string>(
    initialValue ? initialValue : ''
  );

  const inputCss = `border-2 border-gray-300 h-12 w-full bg-white relative flex flex-col justify-between px-4 focused:border-purple-500 ${
    focused ? 'border-purple-500' : ''
  } ${isOptionOpen ? 'rounded-t-lg' : 'rounded-lg'}`;

  //focus 관련 handler
  const handleFocused = () => {
    setFocused(true);
    setIsOptionOpen(centerList ? centerList.length !== 0 : false);
  };
  const handleFocusedOut = () => {
    setFocused(false);
    setIsOptionOpen(false);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange();
    setSelected(false);
    if (e.target.value === '') {
      setIsOptionOpen(false);
    }
  };

  // option list 중 하나를 선택 했을 때 handler
  const handleSelected = (val: CenterNameResponse) => {
    setInputValue(val.name);
    setData(val.name, val.id);
    setSelected(true);
  };

  // centerList 가 비어있는 경우 option list 를 닫는 상태로 변경
  useEffect(() => {
    setIsOptionOpen(!selected && centerList ? centerList.length !== 0 : false);
  }, [centerList, selected]);

  useEffect(() => {
    if (!selected) {
      setData('', '');
      setIsOptionOpen(false);
    }
  }, [selected]);

  return (
    <div className={'relative'}>
      <form className={inputCss} id="searchInputForm">
        <input
          ref={refObj}
          value={inputValue}
          onChange={(e) => handleChangeValue(e)}
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
          {centerList.map((val: any, index: number) => (
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
