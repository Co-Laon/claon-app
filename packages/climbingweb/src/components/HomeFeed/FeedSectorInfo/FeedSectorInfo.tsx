import DefaultPencilImg from 'climbingweb/src/assets/pencil_gray800.svg';
import React from 'react';
import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';

const FeedHoldIcon = ({
  index,
  value,
}: {
  index: number;
  value: ClimbingHistoryResponse;
}) => (
  <>
    <div key={`hold${index}`} className={'m-1'}>
      <DefaultPencilImg />
    </div>
    {value.climbingCount}
  </>
);

const FeedSectorInfo = ({
  holdList,
}: {
  //나중에 interface 로 변경 예정
  holdList: ClimbingHistoryResponse[];
}) => {
  return (
    <div className={'flex flex-col w-full border-b border-gray-300'}>
      <div className={'flex mx-5 mt-5'}>
        <div className={'mr-5 font-medium text-gray-600'}>홀드</div>
        {holdList.map((value, index) => (
          <FeedHoldIcon
            key={`feedHoldIcon${value}${index}`}
            value={value}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedSectorInfo;
