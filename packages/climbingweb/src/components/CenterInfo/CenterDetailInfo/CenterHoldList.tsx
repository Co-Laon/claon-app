import { HoldInfoResponse } from 'climbingweb/types/response/center';
import Image from 'next/image';
import React from 'react';

interface CenterHoldListProps {
  holdInfoList: HoldInfoResponse[];
  holdInfoImg: string;
}

const CenterHoldList = ({ holdInfoList, holdInfoImg }: CenterHoldListProps) => {
  //TODO : 이미지로 보기 클릭 시?
  const handleShowImageButtonClick = () => {
    console.dir(holdInfoImg);
  };
  return (
    <div className="flex flex-col mt-[36px]">
      <div className={'flex justify-between'}>
        <h2 className={'font-semibold text-sm'}>홀드 정보</h2>
        <button
          className={
            'bg-none text-xs leading-[18px] font-normal text-[#5953FF]'
          }
          onClick={handleShowImageButtonClick}
        >
          이미지로 보기
        </button>
      </div>
      <p className="text-xs leading-[18px] font-normal mt-[16px]">
        볼더링{' '}
        <span className="text-[8px] leading-[14px] font-bold">
          {'(Easy -> Hard)'}
        </span>
      </p>
      <div className={'h-8 flex mt-1'}>
        {holdInfoList.map((value, index) => (
          <div
            key={`centerHoldListImage_${index}`}
            className={`h-8 w-8  relative right-[${index * 20}px]`}
          >
            <Image
              layout="fill"
              objectFit="scale-down"
              src={value.crayonImage}
              alt={value.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterHoldList;
