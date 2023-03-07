import { HistoryResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';

function HistoryHoldImg({ holdId, holdImage, climbingCount }: HistoryResponse) {
  return (
    <div key={holdId} className="flex">
      <Image width={24} height={24} src={holdImage} alt={holdId} />
      <p className="text-sm font-bold">{climbingCount}</p>
    </div>
  );
}
export default HistoryHoldImg;
