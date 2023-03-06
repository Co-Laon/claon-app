import { HistoryDateResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';

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
            <div key={holdId} className="flex">
              <Image width={24} height={24} src={holdImage} alt={holdId} />
              <div className="text-sm font-bold">{climbingCount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CenterHistory;
