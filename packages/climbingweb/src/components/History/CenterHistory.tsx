import { HistoryDateResponse } from 'climbingweb/types/response/user';
import Image from 'next/image';

function CenterHistory({ centerInfo, histories }: HistoryDateResponse) {
  return (
    <div>
      <h3>{centerInfo.centerName}</h3>
      <div>
        <Image
          width={44}
          height={44}
          src={centerInfo.centerImg}
          alt={centerInfo.centerId}
        />
        <div>
          {histories.map(({ holdImage, climbingCount, holdId }) => (
            <div key={holdId}>
              <Image width={24} height={24} src={holdImage} alt={holdId} />
              {climbingCount}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CenterHistory;
