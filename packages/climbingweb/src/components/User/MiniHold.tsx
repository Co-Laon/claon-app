import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import React from 'react';

interface MiniHoldProps {
  hold: ClimbingHistoryResponse;
}

const MiniHold = ({ hold }: MiniHoldProps) => {
  return (
    <div className="relative flex items-center text-xs min-w-fi gap-1">
      <Image height={12} width={12} src={hold.holdImage} alt={hold.holdId} />
      {hold.climbingCount}
    </div>
  );
};

export default MiniHold;
