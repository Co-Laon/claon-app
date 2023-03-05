import { LeftButton, RightButton } from '../common/AppBar/IconButton';
import CalenderIcon from 'climbingweb/src/assets/icon/ic_24_calendar_gray800.svg';
import { useCallback, useState } from 'react';
import { useHistoryByDate } from 'climbingweb/src/hooks/queries/user/queryKey';
import CenterHistory from './CenterHistory';

function RecordByDate({ nickName }: { nickName: string }) {
  const [year, setYear] = useState<number>(new Date().getFullYear() as number);
  const [month, setMonth] = useState<number>(new Date().getMonth() as number);

  const { data: historyDatas } = useHistoryByDate(nickName, year, month);

  const onClickLeft = useCallback(() => {
    if (month - 1 == 0) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }, [year, month]);

  const onClickRight = useCallback(() => {
    setYear(year + Math.floor((month + 1) / 13));
    setMonth((month + 1) % 13 || 1);
  }, [year, month]);

  return (
    <>
      <div className="flex">
        <LeftButton onClick={onClickLeft} />
        <div className="flex">
          <CalenderIcon />
          {`${year}.${month}`}
        </div>
        <RightButton onClick={onClickRight} />
      </div>
      {historyDatas?.map((history, idx) => (
        <CenterHistory
          key={idx}
          centerInfo={history.centerInfo}
          histories={history.histories}
        />
      ))}
    </>
  );
}
export default RecordByDate;
