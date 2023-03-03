import { useState } from 'react';
import { Input } from '../common/Input';
import { StringCount } from '../common/Input/StringCount';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { NormalButton, SmmallNodeButton } from '../common/button/Button';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import { UserRequest } from 'climbingweb/types/request/user';
import {
  useModifyUser,
  useRetrieveMe,
} from 'climbingweb/src/hooks/queries/user/queryKey';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useRouter } from 'next/router';
import { useGetPostContentsList } from 'climbingweb/src/hooks/queries/post/queryKey';
import PageLoading from '../common/Loading/PageLoading';
import DelButton from 'climbingweb/src/assets/icon/createFeed/ic_24_del_gray800.svg';

interface InfoProps {
  userRequest: UserRequest;
}

export const EditMyInfo = ({ userRequest }: InfoProps) => {
  // userRequest client state
  const [userRequestData, setUserRequestData] =
    useState<UserRequest>(userRequest);

  const { data: userData } = useRetrieveMe();

  const [userImage, setUserImage] = useState(userData?.imagePath);
  const [userImageFile, setUserImageFile] = useState<File>();

  const { toast } = useToast();
  const router = useRouter();

  // modifyUer server mutation
  const { mutate: modifyUserMutate, isLoading: isModifyUserMutateLoading } =
    useModifyUser({
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
    mutate: uploadUserImageMutate,
    isLoading: isUploadUserImageMutateLoading,
  } = useGetPostContentsList({
    onSuccess: (data) => {
      modifyUserMutate({ ...userRequestData, imagePath: data[0].url });
    },
    onError: () => {
      toast('이미지 업로드에 실패했습니다.');
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
  const handleUploadFileInput = (e: any) => {
    const files: File[] = Array.from(e.target.files);
    if (files.length > 1) {
      toast('이미지는 1개만 업로드 가능합니다.');
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result?.toString();
      setUserImage(base64Image);
      setUserImageFile(file);
    };
  };

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

  const handleDeleteMedia = () => {
    setUserImage(undefined);
    setUserImageFile(undefined);
    setUserRequestData({ ...userRequestData, imagePath: null });
  };

  // 인스타그램 연동 버튼 클릭 핸들러
  const handleInstagramConnectClick = () => {};

  // 수정 버튼 클릭 핸들러
  const handleModifyButtonClick = () => {
    if (userImageFile) uploadUserImageMutate([userImageFile]);
    else {
      console.dir('no image');
      modifyUserMutate(userRequestData);
    }
  };

  return (
    <>
      {isModifyUserMutateLoading || isUploadUserImageMutateLoading ? (
        <PageLoading />
      ) : null}
      <div className="h-full flex flex-col gap-6">
        <div className="flex flex-col gap-2 mx-3">
          <h2 className="font-bold text-gray-800">프로필 사진</h2>
          <div className="relative h-[72px] w-[72px]">
            {userImage ? (
              <div className="h-6 w-6 top-1 right-1 absolute z-10">
                <DelButton alt="delete" onClick={handleDeleteMedia} />
              </div>
            ) : null}
            <label
              htmlFor="upload"
              className="rounded-lg h-[72px] w-[72px] min-w-[72px] border-[#E6E6E6] flex items-center justify-center"
            >
              <input
                id="upload"
                type="file"
                name="uploadImage"
                className="hidden"
                onChange={handleUploadFileInput}
                accept="images/*|videos/*"
                multiple
              />
              <ProfileImage
                src={userImage ? userImage : undefined}
                icon="default"
                size={60}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 mx-3">
          <h2 className="font-bold text-sm text-gray-800">닉네임</h2>
          <Input
            value={nickname}
            onChange={handleChangeNicknameInput}
            rightNode={
              <StringCount
                maxCount={20}
                count={nickname ? nickname.length : 0}
              />
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
            <span className="font-bold text-gray-800 text-xs">
              {' '}
              (Arm reach)
            </span>
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
    </>
  );
};
