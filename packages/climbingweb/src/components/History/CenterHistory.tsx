import { HistoryDateResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';
import HistoryHoldImg from './HistoryHoldImg';

function CenterHistory({ centerInfo, histories }: HistoryDateResponse) {
  return (
    <div className="border border-[#FAFAFA] px-4 py-3 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
      <h3 className="text-[10px] leading-4 font-medium">
        {centerInfo.centerName}
      </h3>
      <div className="flex justify-between items-center">
        <Image
          width={44}
          height={44}
          src={centerInfo.centerImg}
          alt={centerInfo.centerId}
          className="rounded-full"
        />
        <div className="flex gap-2">
          {histories.map(({ holdImage, climbingCount, holdId }) => (
            <HistoryHoldImg
              climbingCount={climbingCount}
              holdId={holdId}
              holdImage={holdImage}
              key={holdId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CenterHistory;
