import { HoldInfoResponse } from 'climbingweb/types/response/center';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

interface FilterProps {
  holdList: HoldInfoResponse[];
  setFilter: (id: string) => void;
}
function CenterPostFilter({ holdList, setFilter }: FilterProps) {
  const [focus, setFocus] = useState<number | null>(null);
  const onClickHold = useCallback((id: string, idx: number | null) => {
    setFilter(id);
    setFocus(idx);
  }, []);

  return (
    <div className="flex h-14 items-center px-3 gap-1">
      <div
        onClick={() => onClickHold('null', null)}
        className="border w-[40px] h-[28px] text-xs leading-[18px] font-normal flex items-center justify-center rounded-lg"
      >
        전체
      </div>
      {holdList.map(({ id, image }, idx) => (
        <div
          key={idx}
          onClick={() => onClickHold(id, idx)}
          className={`w-[40px] h-[28px] rounded-lg border flex justify-center items-center ${
            idx == focus ? 'bg-[#5953FF]' : null
          }`}
        >
          <Image src={image} width={22} height={20} />
        </div>
      ))}
    </div>
  );
}

export default CenterPostFilter;
