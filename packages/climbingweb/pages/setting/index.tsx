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
import { sendReactNativeMessage } from 'climbingweb/src/utils/reactNativeMessage';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import {
  useChangePublicScope,
  useRetrieveMe,
} from 'climbingweb/src/hooks/queries/user/queryKey';
import { useToken } from 'climbingweb/src/hooks/useToken';
import { useBnbHide } from 'climbingweb/src/hooks/useBnB';
// import { useDeleteUser } from 'climbingweb/src/hooks/queries/user/useDeleteUser';

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
  //바텀 시트 on/off state
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  //devToken state
  const { logout } = useToken();

  //user 개인 data useQuery
  const {
    data: userData,
    isError: isUserDataError,
    error: userDataError,
  } = useRetrieveMe();

  //프로필 비공개 관련 useMutation
  const { mutate: changePublicScopeMutate } = useChangePublicScope();

  //회원 탈퇴 관련 useMutation
  // const { mutate: deleteUserMutate } = useDeleteUser();

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
    if (titleName !== '설정') setTitleName('설정');
    else window.history.back();
  };

  // 바텀 시트 닫기 핸들러
  const onBottomSheetDismiss = () => {
    setOpenSheet(false);
  };

  // 바텀 시트 확인 버튼 핸들러
  const onBottomSheetConfirm = () => {
    if (sheetKey === 'logout') {
      //로그아웃
      sendReactNativeMessage({ type: 'logout' });
      logout();
      setOpenSheet(false);
    } else if (sheetKey === 'leave') {
      //회원 탈퇴
      //deleteUserMutate();
      setOpenSheet(false);
    }
  };

  useBnbHide();

  if (isUserDataError) return <ErrorContent error={userDataError} />;

  if (userData)
    return (
      <div className="h-screen flex flex-col">
        <AppBar
          leftNode={<BackButton onClick={handleGoToBack} />}
          title={titleName}
          rightNode={<Empty />}
          className="pl-5"
        />
        <div className="p-5 pl-2 pr-4 h-full">
          {titleName === '설정' && (
            <ul className="flex flex-col flex-end gap-y-6 pl-9 pr-2 pt-5">
              <li className="flex w-full justify-between font-normal text-sm">
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
            <EditMyInfo userRequest={userData} setTitleName={setTitleName} />
          )}
          {titleName === '차단 리스트' && <BanList />}
          {titleName === '공지 사항' && <NotificationList />}
          {titleName === '버전 정보' && <VersionInfo />}
          {titleName === '이용 약관' && <>이용 약관</>}
          {titleName === '개인정보 처리 방침' && <>개인정보 처리 방침</>}
        </div>
        <BottomSheet open={openSheet} onDismiss={onBottomSheetDismiss}>
          <ButtonSheet
            text={
              sheetKey === 'leave'
                ? 'CLAON에서 하강하시겠습니까?'
                : sheetKey === 'logout'
                ? '로그아웃 하시겠습니까?'
                : ''
            }
            onCancel={onBottomSheetDismiss}
            onConfirm={onBottomSheetConfirm}
          />
        </BottomSheet>
      </div>
    );

  return <Loading />;
}
