import Image from 'next/image';
import defaultPencilImg from '../../../assets/pencil_gray800.svg';
import React from 'react';
import Hold from 'climbingweb/src/interface/Hold';

const FeedHoldIcon = ({ index, value }: { index: number; value: Hold }) => (
  <>
    <div key={`hold${index}`} className={'m-1'}>
      <Image
        src={defaultPencilImg}
        width={'16px'}
        height={'16px'}
        alt={'holdIcon'}
      />
    </div>
    {value.count}
  </>
);

const FeedSectorInfo = ({
  holdList,
}: {
  //나중에 interface 로 변경 예정
  holdList: Hold[];
}) => {
  return (
    <div className={'flex flex-col w-full border-b-[1px] border-gray-300'}>
      <div className={'flex mx-5 mt-5'}>
        <div className={'mr-5'}>홀드</div>
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
