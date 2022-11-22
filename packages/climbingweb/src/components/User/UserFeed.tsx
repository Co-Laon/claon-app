import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import React from 'react';
import MiniHold from './MiniHold';

interface UserFeedProps {
  centerName: string;
  image: string;
  climbingHistories: ClimbingHistoryResponse[];
}

const UserFeed = ({ centerName, image, climbingHistories }: UserFeedProps) => {
  return (
    <div className="flex flex-col my-1 mr-2 pb-3 rounded-xl shadow-lg max-w-[160px] h-[200px]">
      <Image
        src={image}
        alt={'UserFeedImage'}
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

export default UserFeed;
