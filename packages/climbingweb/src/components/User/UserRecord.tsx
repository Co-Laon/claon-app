import { CenterClimbingHistoryResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';
import React from 'react';
import { UserRecordSkeleton } from '../common/skeleton/UserRecordSkeleton';
import MiniHold from './MiniHold';

const PADDING = 16;

interface UserRecordProps extends CenterClimbingHistoryResponse {}

const contentWidth = (global.innerWidth - PADDING * 2) * (3 / 10);

console.log(contentWidth);

const UserRecord = ({
  center: { centerName, centerImage },
  climbingHistories,
}: UserRecordProps) => {
  if (!(centerName && centerImage)) {
    return <UserRecordSkeleton />;
  }

  return (
    <span
      className={
        'flex flex-col rounded-lg shadow-md mr-2  border border-[#FAFAFA] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)] min-w-[80px] min-h-[120px] pb-[5px]'
      }
    >
      <div className="aspect-square flex items-center justify-center mx-[5px] p-[5px]">
        <Image
          className="relative rounded-full"
          src={centerImage}
          alt={centerName}
          height={contentWidth}
          width={contentWidth}
          objectFit={'contain'}
          priority
        />
      </div>
      <div className="pl-[5px] pr-2">
        <div className="text-[#666666] text-[10px] leading-4 line-clamp-1 font-medium">
          {centerName}
        </div>
        <div className="grid grid-cols-3  overflow-auto scrollbar-hide">
          {climbingHistories.map((value, index) => (
            <MiniHold key={`miniHold_${index}`} hold={value} />
          ))}
        </div>
      </div>
    </span>
  );
};

export default UserRecord;
