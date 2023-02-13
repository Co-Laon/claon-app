import React from 'react';

interface ButtonProps {
  onClick?: any;
  count: number;
  maxCount: number;
  setHold?: any;
}

const HoldImageButton = ({ count, maxCount }: ButtonProps) => {
  return (
    <div className="rounded-lg border border-solid h-[72px] w-[72px] ml-[4px] min-w-[72px] border-[#E6E6E6] flex items-center justify-center">
      <div className="items-center flex flex-col">
        <span className="text-[#BFBFBF] text-sm font-medium">홀드</span>
        <div>
          <span className="text-[#5953FF] text-[12px] leading-[18px] font-medium">
            {count ? count : 0}
          </span>
          <span className="text-[12px] leading-[18px] font-medium">
            {' '}
            / {maxCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HoldImageButton;
