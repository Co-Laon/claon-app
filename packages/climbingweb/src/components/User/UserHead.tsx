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
    <div className="flex flex-col gap-4 px-5 py-4 shadow-sm my-4 rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="w-16 flex flex-col items-center">
          <ProfileImage
            src={imagePath}
            icon={instagramUrl ? 'insta' : 'default'}
            onClickIcon={handleProfileIconClick}
            size={60}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-52 ml-8">
          <div className="flex flex-row justify-between">
            {countNameList.map((value) => (
              <div
                key={value.name}
                className="w-auto h-auto flex flex-col items-center"
              >
                <p className="text-purple-500 font-bold">{value.count}</p>
                <p className="text-xs leading-4 font-medium">{value.name}</p>
              </div>
            ))}
          </div>
          <button
            className="w-full h-5 bg-purple-500 font-medium text-xs rounded-xl  text-white disabled:bg-slate-300"
            onClick={onClickHeaderButton}
            disabled={isLaon}
          >
            {isMyPage ? '내 라온' : '라온'}
          </button>
        </div>
      </div>
      {!isPrivate || isMyPage ? (
        <div className="font- text-xs text-gray-600 leading-4 w-[40%]">
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
