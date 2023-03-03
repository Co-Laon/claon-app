import { useState } from 'react';
import { Input } from '../common/Input';
import { StringCount } from '../common/Input/StringCount';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { NormalButton, SmmallNodeButton } from '../common/button/Button';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import { UserRequest } from 'climbingweb/types/request/user';
import { useModifyUser } from 'climbingweb/src/hooks/queries/user/queryKey';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useRouter } from 'next/router';

interface InfoProps {
  userRequest: UserRequest;
}

export const EditMyInfo = ({ userRequest }: InfoProps) => {
  // userRequest client state
  const [userRequestData, setUserRequestData] =
    useState<UserRequest>(userRequest);

  const { toast } = useToast();
  const router = useRouter();

  // modifyUer server mutation
  const { mutate: modifyUserMutate } = useModifyUser({
    onSuccess: () => {
      toast('수정되었습니다.');
      router.push('/users/me');
    },
    onError: () => {
      toast('수정에 실패했습니다.');
      window.location.reload();
    },
  });

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
    if (changedNickname.length > 20) return;
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
    modifyUserMutate(userRequestData);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-2 mx-3">
        <h2 className="font-bold text-gray-800">프로필 사진</h2>
        <ProfileImage src={userRequest.imagePath} icon="default" size={60} />
      </div>
      <div className="flex flex-col gap-2 mx-4">
        <h2 className="font-bold text-sm text-gray-800">닉네임</h2>
        <Input
          value={nickname}
          onChange={handleChangeNicknameInput}
          rightNode={
            <StringCount maxCount={20} count={nickname ? nickname.length : 0} />
          }
        />
      </div>
      <div className="flex flex-col gap-2 mx-3">
        <div>
          <span className="font-bold text-sm text-gray-800">신장</span>
          <span className="font-bold text-gray-800 text-xs"> (Height)</span>
        </div>
        <Input value={height} onChange={handleChangeHeightInput} />
      </div>
      <div className="flex flex-col gap-2 mx-3">
        <div>
          <span className="font-bold text-sm text-gray-800">암리치</span>
          <span className="font-bold text-gray-800 text-xs"> (Arm reach)</span>
        </div>
        <Input value={armReach} onChange={handleChangeArmReachInput} />
      </div>
      <div className="flex justify-between w-[45%] mx-3">
        <h2 className="font-bold text-gray-800 text-sm">{'Ape Index'}</h2>
        <h2 className="font-bold text-gray-800 text-sm">
          {armReach && height
            ? armReach - height > 0
              ? `+${armReach - height}`
              : armReach - height
            : 0}
        </h2>
      </div>
      <div className="flex flex-col gap-2 mx-3">
        <h2 className="font-bold text-sm text-gray-800 mb-4">
          인스타그램 계정
        </h2>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center text-sm font-bold gap-1">
            <InstaIcon alt="instagram" />
            {instagramUserName ? instagramUserName : '연동되지 않았습니다.'}
          </div>
          <SmmallNodeButton onClick={handleInstagramConnectClick}>
            변경
          </SmmallNodeButton>
        </div>
      </div>
      <div className="bottom-0 mx-3">
        <NormalButton onClick={handleModifyButtonClick}>수정</NormalButton>
      </div>
    </div>
  );
};
