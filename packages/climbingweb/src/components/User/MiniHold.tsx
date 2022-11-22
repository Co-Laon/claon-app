import { ClimbingHistoryResponse } from 'climbingweb/types/response/post';
import Image from 'next/image';
import React from 'react';

interface MiniHoldProps {
  hold: ClimbingHistoryResponse;
}

const MiniHold = ({ hold }: MiniHoldProps) => {
  return (
    <div className="flex justify-center text-xs">
      <Image height={10} width={10} src={hold.holdImage} alt={hold.holdId} />
      {hold.climbingCount}
    </div>
  );
};

export default MiniHold;
