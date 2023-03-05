import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { BackButton } from 'climbingweb/src/components/common/AppBar/IconButton';
import PageSubTitle from 'climbingweb/src/components/common/PageSubTitle/PageSubTitle';
import { Tab } from 'climbingweb/src/components/common/TabBar/type';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import CalendarPurple from 'climbingweb/src/assets/icon/ic_24_calendar_purple.svg';
import CalnedarWhite from 'climbingweb/src/assets/icon/ic_24_calendar_white.svg';
import MapPurple from 'climbingweb/src/assets/icon/ic_24_navi_map_purple500.svg';
import MapWhite from 'climbingweb/src/assets/icon/ic_24_navi_map_white.svg';
import RecordByDate from 'climbingweb/src/components/History/HistoryByDate';
import RecordByCenter from 'climbingweb/src/components/History/HistoryByCenter';
import { TabBar } from 'climbingweb/src/components/common/TabBar';

function RecordPage() {
  const router = useRouter();
  const { uname } = router.query;

  const nickName = useMemo(() => uname as string, [uname]);
  const onClickBackButton = useCallback(() => {
    router.back();
  }, []);


  const tabList: Tab[] = useMemo(
    () => [
      {
        id: 1,
        tabIcon: (focus: boolean) =>
          focus ? <CalendarPurple /> : <CalnedarWhite />,
        tabContent: <RecordByDate nickName={nickName} />,
      },
      {
        id: 2,
        tabIcon: (focus: boolean) => (focus ? <MapPurple /> : <MapWhite />),
        tabContent: <RecordByCenter />,
      },
    ],
    [nickName]
  );

  return (
    <div>
      <AppBar
        leftNode={
          <div className="flex">
            <BackButton onClick={onClickBackButton} />
            <PageSubTitle title={nickName} />
          </div>
        }
        className="p-5 h-14"
      />
      <TabBar tabList={tabList} className="h-10" />
    </div>
  );
}

export default RecordPage;
