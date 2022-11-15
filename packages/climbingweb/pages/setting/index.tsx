import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { useState } from 'react';
import { VersionInfo } from 'climbingweb/src/components/SettingInfo/VersionInfo';
import { EditMyInfo } from 'climbingweb/src/components/SettingInfo/EditMyInfo';
import { NotificationList } from 'climbingweb/src/components/SettingInfo/Notification/NotificationList';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { ButtonSheet } from 'climbingweb/src/components/common/BottomSheetContents/ButtonSheet';
import { BanList } from 'climbingweb/src/components/SettingInfo/BanList';
import { useChangePublicScope } from 'climbingweb/src/hooks/queries/user/useChangePublicScope';
import { useGetUser } from 'climbingweb/src/hooks/queries/user/useGetUser';

export default function SettingPage() {
  const titleList: string[] = [
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
  //Setting title 이름의 state
  const [titleName, setTitleName] = useState<string>(defaultTitle);
  const [sheetKey, setSheetKey] = useState<string>();
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  //user 개인 data useQuery
  const {
    data: userData,
    isError: isUserDataError,
    error: userDataError,
  } = useGetUser();

  //프로필 비공개 관련 useMutation
  const { mutate: changePublicScopeMutate } = useChangePublicScope();

  //프로필 비공개 토글버튼 클릭 핸들러
  const handleToggleClick = () => {
    changePublicScopeMutate();
  };

  //설정 리스트 클릭 핸들러
  const handleListClick = (choice: string) => {
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

  //뒤로가기 버튼 클릭 핸들러
  const handleGoToBack = () => {
    setTitleName('설정');
  };

  const onDismiss = () => {
    setOpenSheet(false);
  };

  if (isUserDataError) return <div>{userDataError}</div>;

  if (userData)
    return (
      <div className="h-screen flex flex-col">
        <AppBar
          leftNode={<BackButton onClick={handleGoToBack} />}
          title={titleName}
          rightNode={<Empty />}
        />
        <div className="p-4">
          {titleName === '설정' && (
            <ul className="mt-10 h-screen w-screen pl-7 flex flex-col flex-end gap-y-6">
              <li className="flex w-full justify-between pr-6 font-normal text-sm">
                <div>프로필 비공개</div>
                <input
                  type={'checkbox'}
                  className="toggle toggle-primary"
                  defaultChecked={userData.isPrivate}
                  onClick={handleToggleClick}
                ></input>
              </li>
              {titleList.map((title, idx) => (
                <li
                  key={`title${idx}`}
                  className="font-normal text-sm"
                  onClick={() => handleListClick(title)}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
          {titleName === '개인 정보 수정' && (
            <EditMyInfo userRequest={userData} />
          )}
          {titleName === '차단 리스트' && <BanList />}
          {titleName === '공지 사항' && <NotificationList />}
          {titleName === '버전 정보' && <VersionInfo />}
          {titleName === '이용 약관' && <>이용 약관</>}
          {titleName === '개인정보 처리 방침' && <>개인정보 처리 방침</>}
        </div>
        <BottomSheet open={openSheet} onDismiss={onDismiss}>
          <ButtonSheet
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

  return <div>로딩 중...</div>;
}
