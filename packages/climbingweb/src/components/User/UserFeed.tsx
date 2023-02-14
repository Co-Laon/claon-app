import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { UserFeedSkeleton } from '../common/skeleton/UserFeedSkeleton';
import MiniHold from './MiniHold';

interface UserFeedProps {
  postId: string;
  centerName: string;
  image: string;
  climbingHistories: ClimbingHistoryResponse[];
}

const contentWidth = global.innerWidth - 32;

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

  if (!(postId && centerName && image)) {
    return <UserFeedSkeleton />;
  }

  return (
    <div
      className={
        'place-self-center flex flex-col my-1 pb-[5px] rounded-lg shadow-lg'
      }
      onClick={handleFeedClick}
    >
      <div className="relative flex rounded-t-lg">
        <Image
          className="rounded-t-lg"
          src={image}
          alt={'UserFeedImage'}
          height={contentWidth / 2}
          width={contentWidth / 2}
          objectFit={'contain'}
          priority
        />
      </div>
      <div className="ml-3 my-1 text-gray-500 text-xs scrollbar-hide">
        {centerName}
        <div className="grid grid-cols-4">
          {climbingHistories.map((value, index) => (
            <MiniHold key={`miniHold_${index}`} hold={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
