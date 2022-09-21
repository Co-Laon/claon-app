import React from 'react';

interface ButtonProps {
  onClick?: any;
  count: number;
  maxCount: number;
  setHold?: any;
}

const HoldImageButton = ({ count, maxCount }: ButtonProps) => {
  return (
    <div className="rounded-lg border border-solid h-20 w-20 min-w-20 border-[#E6E6E6] flex items-center justify-center">
      <div className="items-center flex flex-col">
        <span className="text-[#FFFFFF]">홀드</span>
        <div>
          <span className="text-[#5953FF]">{count ? count : 0}</span>
          <span> / {maxCount}</span>
        </div>
      </div>
    </div>
  );
};

export default HoldImageButton;
