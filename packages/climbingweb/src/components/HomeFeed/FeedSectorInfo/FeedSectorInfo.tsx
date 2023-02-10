import React from 'react';
import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';

const FeedHoldIcon = ({
  index,
  value,
}: {
  index: number;
  value: ClimbingHistoryResponse;
}) => (
  <div className="relative flex items-center mx-1.5 min-w-10 text-purple-500">
    <Image src={value.holdImage} alt={`${index}`} height={24} width={24} />
    {value.climbingCount}
  </div>
);

const FeedSectorInfo = ({
  holdList,
}: {
  holdList: ClimbingHistoryResponse[];
}) => {
  return (
    <div
      className={'flex border-b border-gray-300 mx-[20px] pt-[20px] pb-[13px]'}
    >
      <div className={'flex overflow-auto'}>
        <div
          className={
            'ml-[10px] mr-5 font-bold min-w-fit text-sm text-[#666666]'
          }
        >
          홀드
        </div>
        <div className={'flex w-full overflow-auto scrollbar-hide'}>
          {holdList.map((value, index) => (
            <FeedHoldIcon
              key={`feedHoldIcon${value.holdId}${index}`}
              value={value}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedSectorInfo;
