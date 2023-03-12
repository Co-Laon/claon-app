import { CenterHistory } from 'climbingweb/types/response/user';
import HistoryHoldImg from './HistoryHoldImg';

function HoldsByDate({ createdAt, histories }: CenterHistory) {
  return (
    <div className="flex justify-between px-4 py-3 border rounded-lg items-center border-[#FAFAFA] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
      <p className="text-[10px] font-medium leading-[16px]">{createdAt}</p>
      <div className="flex gap-1">
        {histories.map((history) => (
          <HistoryHoldImg {...history} key={history.holdId} />
        ))}
      </div>
    </div>
  );
}
export default HoldsByDate;
