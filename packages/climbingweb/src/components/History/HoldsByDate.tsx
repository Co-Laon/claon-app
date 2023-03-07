import { CenterHistory } from 'climbingweb/types/response/user';
import HistoryHoldImg from './HistoryHoldImg';

function HoldsByDate({ createdAt, histories }: CenterHistory) {
  return (
    <div>
      <p>{createdAt}</p>
      <div>
        {histories.map((history) => (
          <HistoryHoldImg {...history} key={history.holdId} />
        ))}
      </div>
    </div>
  );
}
export default HoldsByDate;
