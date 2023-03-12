import { LeftButton, RightButton } from '../common/AppBar/IconButton';
import CalenderIcon from 'climbingweb/src/assets/icon/ic_24_calendar_gray800.svg';
import { useCallback, useState } from 'react';
import { useHistoryByDate } from 'climbingweb/src/hooks/queries/user/queryKey';
import CenterHistory from './CenterHistory';

function HistoryByDate({ nickName }: { nickName: string }) {
  //현재 년도로 초기화
  const [year, setYear] = useState<number>(new Date().getFullYear() as number);
  const [month, setMonth] = useState<number>(
    //Date().getMont()의 경우 0~11이기 때문에 +1을 해줌.
    (new Date().getMonth() + 1) as number
  );

 //year month nickname에 따라서 data fetch하는 함수 call 
  const { data: historyDatas } = useHistoryByDate(nickName, year, month);

  //달력 왼쪽 버튼을 눌렀을 때 실행하는 함수
  const onClickLeft = useCallback(() => {
    if (month - 1 == 0) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }, [year, month]);

  //달력 오른쪽 버튼을 눌렀을 때 실행하는 함수
  const onClickRight = useCallback(() => {
    setYear(year + Math.floor((month + 1) / 13));
    setMonth((month + 1) % 13 || 1);
  }, [year, month]);

  return (
    <div className="p-3 pt-8 ">
      <div className="flex items-center justify-center gap-11">
        <LeftButton onClick={onClickLeft} />
        <div className="flex gap-3">
          <CalenderIcon />
          {`${year}.${month}`}
        </div>
        <RightButton onClick={onClickRight} />
      </div>
      <div className="pt-10 flex flex-col gap-3">
        {historyDatas?.map((history, idx) => (
          <CenterHistory
            key={idx}
            centerInfo={history.centerInfo}
            histories={history.histories}
          />
        ))}
      </div>
    </div>
  );
}
export default HistoryByDate;
