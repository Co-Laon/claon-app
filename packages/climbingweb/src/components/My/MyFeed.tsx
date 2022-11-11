import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import React from 'react';
import MiniHold from './MiniHold';

interface MyFeedProps {
  centerName: string;
  image: string;
  climbingHistories: ClimbingHistoryResponse[];
}

const MyFeed = ({ centerName, image, climbingHistories }: MyFeedProps) => {
  return (
    <div className="flex flex-col my-1 mr-2 pb-3 rounded-xl shadow-lg max-w-[160px] h-[200px]">
      <Image
        src={image}
        alt={'MyFeedImage'}
        height={160}
        width={160}
        sizes={'(max-width: 160px)'}
      />
      <div className="ml-3 my-1 text-gray-500 text-sm">{centerName}</div>
      <div className="grid grid-cols-4 h-[40px] overflow-auto scrollbar-hide">
        {climbingHistories.map((value, index) => (
          <MiniHold key={`miniHold_${index}`} hold={value} />
        ))}
      </div>
    </div>
  );
};

export default MyFeed;
