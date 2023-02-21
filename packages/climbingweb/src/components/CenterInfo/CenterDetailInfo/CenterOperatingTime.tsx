import { OperatingTime } from 'climbingweb/types/response/center';
import React from 'react';

interface CenterOperatingTimeProps {
  operatingTimeList: OperatingTime[];
}

const CenterOperatingTime = ({
  operatingTimeList,
}: CenterOperatingTimeProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium text-sm">운영시간</h2>
      <ul>
        {operatingTimeList.map((value, index) => (
          <li
            key={`OperatingTimes_${index}`}
            className="text-xs font-normal leading-[18px]"
          >{`${value.day} ${value.start} - ${value.end}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default CenterOperatingTime;
