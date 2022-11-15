import { useState } from 'react';
import { Input } from '../common/Input';
import { StringCount } from '../common/Input/StringCount';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { NormalButton, SmmallNodeButton } from '../common/button/Button';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import { UserRequest } from 'climbingweb/types/request/user';
import { useModifyUser } from 'climbingweb/src/hooks/queries/user/useModifyUser';

interface InfoProps {
  userRequest: UserRequest;
}

export const EditMyInfo = ({ userRequest }: InfoProps) => {
  // userRequest client state
  const [userRequestData, setUserRequestData] =
    useState<UserRequest>(userRequest);

  // modifyUer server mutation
  const { mutate: modifyUserMutate } = useModifyUser(userRequestData);

  const {
    armReach,
    height,
    // imagePath,
    // instagramOAuthId,
    instagramUserName,
    nickname,
  } = userRequestData;

  // 데이터 변경 핸들러들
  const handleChangeNicknameInput = (changedNickname: string) => {
    setUserRequestData({ ...userRequestData, nickname: changedNickname });
  };
  const handleChangeHeightInput = (changedHeight: number) => {
    setUserRequestData({ ...userRequestData, height: changedHeight });
  };
  const handleChangeArmReachInput = (changedArmReach: number) => {
    setUserRequestData({ ...userRequestData, armReach: changedArmReach });
  };

  // 인스타그램 연동 버튼 클릭 핸들러
  const handleInstagramConnectClick = () => {};

  // 수정 버튼 클릭 핸들러
  const handleModifyButtonClick = () => {
    modifyUserMutate();
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">프로필 사진</h2>
        <ProfileImage icon="default" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">닉네임</h2>
        <Input
          value={nickname}
          onChange={handleChangeNicknameInput}
          rightNode={
            <StringCount maxCount={20} count={nickname ? nickname.length : 0} />
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">신장 (Height)</h2>
        <Input value={height} onChange={handleChangeHeightInput} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">암리치 (Arm reach)</h2>
        <Input value={armReach} onChange={handleChangeArmReachInput} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">{`Ape Index: ${
          armReach && height
            ? armReach - height > 0
              ? `+${armReach - height}`
              : armReach - height
            : 0
        }`}</h2>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">인스타그램 계정</h2>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center font-bold gap-1">
            <InstaIcon alt="instagram" />
            {instagramUserName}
          </div>
          <SmmallNodeButton onClick={handleInstagramConnectClick}>
            변경
          </SmmallNodeButton>
        </div>
      </div>
      <div className="bottom-0">
        <NormalButton onClick={handleModifyButtonClick}>수정</NormalButton>
      </div>
    </div>
  );
};
