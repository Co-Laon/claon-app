import { CenterClimbingHistoryResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';
import React from 'react';
import MiniHold from './MiniHold';

interface MyRecordProps extends CenterClimbingHistoryResponse {}

const MyRecord = ({
  center: { centerName, centerImage },
  climbingHistories,
}: MyRecordProps) => {
  return (
    <div className="rounded-xl p-1 shadow-sm mt-2 mr-3 shadow-gray-300 h-36 min-w-[90px]">
      <Image
        className="rounded-full"
        src={centerImage}
        alt={centerName}
        height={80}
        width={80}
        sizes={'(max-width: 80px)'}
      />
      <div className="text-gray-400 ml-1 text-xs line-clamp-1">
        {centerName}
      </div>
      <div className="grid grid-cols-3 overflow-auto scrollbar-hide">
        {climbingHistories.map((value, index) => (
          <MiniHold key={`miniHold_${index}`} hold={value} />
        ))}
      </div>
    </div>
  );
};

export default MyRecord;
