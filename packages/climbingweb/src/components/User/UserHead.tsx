import { UserDetailResponse } from 'climbingweb/types/response/user';
import { useRouter } from 'next/router';
import { ProfileImage } from '../common/profileImage/ProfileImage';

interface HeaderProps {
  userDetailData: UserDetailResponse;
  onClickHeaderButton: () => void;
  isMyPage: boolean;
}

export const UserHead = ({
  userDetailData,
  onClickHeaderButton,
  isMyPage,
}: HeaderProps) => {
  const {
    height,
    armReach,
    apeIndex,
    imagePath,
    climbCount,
    laonCount,
    postCount,
    instagramUrl,
    isPrivate,
    isLaon,
  } = userDetailData;

  const countNameList = [
    { name: '게시글', count: postCount },
    { name: '라온', count: laonCount },
    { name: '등반', count: climbCount },
  ];

  const router = useRouter();

  const handleProfileIconClick = () => {
    if (instagramUrl) router.push(instagramUrl);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3 shadow-sm mb-4 rounded-lg border border-[#FAFAFA] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-row items-center justify-between p-2">
        <div className="w-15 flex flex-col items-center">
          <ProfileImage
            src={imagePath}
            icon={instagramUrl ? 'insta' : 'default'}
            onClickIcon={handleProfileIconClick}
            size={60}
            className="w-[60px]"
            isPrivate={isPrivate}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-52 ml-9">
          <div className="flex flex-row justify-between">
            {countNameList.map((value) => (
              <div
                key={value.name}
                className="w-auto h-auto flex flex-col items-center"
              >
                <p className="text-purple-500 font-bold text-sm">
                  {value.count}
                </p>
                <p className="text-xs leading-[18px] font-medium">
                  {value.name}
                </p>
              </div>
            ))}
          </div>
          <button
            className="w-full h-5 bg-[#5953FF] font-medium text-xs rounded-xl  text-white disabled:bg-slate-300 leading-[18px]"
            onClick={onClickHeaderButton}
            disabled={isLaon}
          >
            {isMyPage ? '내 라온' : '라온'}
          </button>
        </div>
      </div>
      {!isPrivate || isMyPage ? (
        <div className="font- text-xs text-gray-600 leading-[18px] w-[40%] pl-2">
          <p className="flex w-full justify-between">
            <span>신장</span>
            <span>{height}cm</span>
          </p>
          <p className="flex w-full justify-between">
            <span>암리치</span>
            <span>{armReach}cm</span>
          </p>
          <p className="flex w-full justify-between">
            <span>Ape Index</span>
            <span>{apeIndex > 0 ? `+${apeIndex}` : apeIndex}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};
