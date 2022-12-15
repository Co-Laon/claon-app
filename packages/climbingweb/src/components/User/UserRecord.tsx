import { CenterClimbingHistoryResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';
import React from 'react';
import MiniHold from './MiniHold';

interface UserRecordProps extends CenterClimbingHistoryResponse {}

const UserRecord = ({
  center: { centerName, centerImage },
  climbingHistories,
}: UserRecordProps) => {
  return (
    <span className="flex flex-col rounded-lg shadow-sm mr-2 shadow-gray-300 h-[155px] min-w-[90px] pb-[5px]">
      <div className="aspect-square flex items-center justify-center mx-[5px] p-[5px]">
        <Image
          className="relative rounded-full"
          src={centerImage}
          alt={centerName}
          height={80}
          width={80}
        />
      </div>
      <div className="pl-[5px] pr-2">
        <div className="text-gray-400 text-xs line-clamp-1">{centerName}</div>
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
