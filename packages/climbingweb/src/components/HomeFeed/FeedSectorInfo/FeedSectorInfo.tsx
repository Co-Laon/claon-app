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
  <>
    <div
      className="rounded-lg mx-1.5 min-w-10 relative"
      key={`feedHoldIcon_${value.holdId}`}
    >
      <Image
        className="rounded-lg"
        layout="fill"
        objectFit="scale-down"
        src={value.holdImage}
        alt={`${index}`}
      />
    </div>
    <div className="text-purple-500">{value.climbingCount}</div>
  </>
);

const FeedSectorInfo = ({
  holdList,
}: {
  holdList: ClimbingHistoryResponse[];
}) => {
  return (
    <div className={'flex flex-col w-full border-b border-gray-300'}>
      <div className={'flex mx-5 my-4'}>
        <div className={'mr-5 font-medium text-gray-600'}>홀드</div>
        {holdList.map((value, index) => (
          <FeedHoldIcon
            key={`feedHoldIcon${value.holdId}${index}`}
            value={value}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedSectorInfo;
