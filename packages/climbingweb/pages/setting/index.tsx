import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/IconButton';
import { useState } from 'react';
import { VersionInfo } from 'climbingweb/src/components/SettingInfo/VersionInfo';
import { SettingList } from 'climbingweb/src/components/SettingInfo/SettingList';
import { EditMyInfo } from 'climbingweb/src/components/SettingInfo/EditMyInfo';
import { NotificationList } from 'climbingweb/src/components/SettingInfo/Notification/NotificationList';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { LeaveSheet } from 'climbingweb/src/components/common/BottomSheetContents/LeaveSheet';
import { BanList } from 'climbingweb/src/components/SettingInfo/BanList';

export default function SettingPage() {
  const titleList: string[] = [
    '프로필 비공개',
    '개인 정보 수정',
    '차단 리스트',
    '공지 사항',
    '버전 정보',
    '이용 약관',
    '개인정보 처리 방침',
    '로그아웃',
    '탈퇴하기',
  ];
  const defaultTitle = '설정';
  const [titleName, setTitleName] = useState<string>(defaultTitle);
  const [sheetKey, setSheetKey] = useState<string>();
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const handleClick = (choice: string) => {
    if (choice === '로그아웃') {
      setSheetKey('logout');
      setOpenSheet(true);
      return;
    }
    if (choice === '탈퇴하기') {
      setSheetKey('leave');
      setOpenSheet(true);
      return;
    }
    if (choice !== 'titleName') setTitleName(choice);
  };
  const handleGoToBack = () => {
    setTitleName('설정');
  };
  const testNoti = {
    title:
      '[앱 공지사항] 공지사항 테스트 긴글 테스트 12345678 9 길게 길게 적어봅시다.',
    date: '22.01.23',
    content:
      '클라온 앱 공지사항 입니다. 확인을 해주세요~ 전기통신사업법 제22조 5 제1항에 따라 불법촬영물등의 유통방지 및 이용자보호를 위한 다음의 기술적, 관리적 조치가 시행될 에정임을 안내 드립니다.',
  };
  const notiList = [testNoti, testNoti, testNoti];

  const onDismiss = () => {
    setOpenSheet(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <AppBar
        leftNode={<BackButton onClick={handleGoToBack} />}
        title={titleName}
        rightNode={<Empty />}
      />
      <div className="p-4">
        {titleName === '설정' && (
          <SettingList
            titleList={titleList}
            onClick={(e) => handleClick(e.target.innerText)}
          />
        )}
        {titleName === '프로필 비공개' && <>프로필비공개</>}
        {titleName === '개인 정보 수정' && <EditMyInfo />}
        {titleName === '차단 리스트' && <BanList />}
        {titleName === '공지 사항' && <NotificationList notiList={notiList} />}
        {titleName === '버전 정보' && <VersionInfo />}
        {titleName === '이용 약관' && <>이용 약관</>}
        {titleName === '개인정보 처리 방침' && <>개인정보 처리 방침</>}
      </div>
      <BottomSheet open={openSheet} onDismiss={onDismiss}>
        <LeaveSheet
          text={
            sheetKey === 'leave'
              ? 'CLAON에서 하강하시겠습니까?'
              : sheetKey === 'logout'
              ? '로그아웃 하시겠습니까?'
              : ''
          }
        />
      </BottomSheet>
    </div>
  );
}
