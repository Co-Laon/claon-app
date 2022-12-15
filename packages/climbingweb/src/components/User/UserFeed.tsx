import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import MiniHold from './MiniHold';

interface UserFeedProps {
  postId: string;
  centerName: string;
  image: string;
  climbingHistories: ClimbingHistoryResponse[];
}

const UserFeed = ({
  postId,
  centerName,
  image,
  climbingHistories,
}: UserFeedProps) => {
  const router = useRouter();

  const handleFeedClick = () => {
    router.push(`/feed/${postId}`);
  };

  return (
    <div
      className="flex flex-col my-1 mr-2 pb-[5px] rounded-lg shadow-lg max-w-[160px] h-[210px]"
      onClick={handleFeedClick}
    >
      <div className="relative flex">
        <Image
          className="rounded-t-lg"
          src={image}
          alt={'UserFeedImage'}
          height={160}
          width={160}
        />
      </div>
      <div className="ml-3 my-1 text-gray-500 text-xs">
        {centerName}
        <div className="flex overflow-auto scrollbar-hide justify-between">
          {climbingHistories.map((value, index) => (
            <MiniHold key={`miniHold_${index}`} hold={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
