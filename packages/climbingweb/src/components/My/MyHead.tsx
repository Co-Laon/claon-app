import { ProfileImage } from '../common/profileImage/ProfileImage';

interface HeaderProps {
  height: number;
  armReach: number;
  apeIndex: number;
  imagePath: string;
  climbCount: number;
  laonCount: number;
  postCount: number;
}

export const MyHead = ({
  height,
  armReach,
  apeIndex,
  imagePath,
  climbCount,
  laonCount,
  postCount,
}: HeaderProps) => {
  const countNameList = [
    { name: '게시글', count: postCount },
    { name: '라온', count: laonCount },
    { name: '등반', count: climbCount },
  ];

  return (
    <div className="flex flex-col gap-4 px-6 py-4 shadow-sm my-4 rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <div className="w-16 flex flex-col items-center">
          <ProfileImage src={imagePath} icon="insta" />
        </div>
        <div className="flex flex-col gap-1.5 w-52">
          <div className="flex flex-row justify-between">
            {countNameList.map((value) => (
              <div
                key={value.name}
                className="w-auto h-auto flex flex-col items-center"
              >
                <p className="text-purple-500 font-bold">{value.count}</p>
                <p className="font-medium">{value.name}</p>
              </div>
            ))}
          </div>
          <button className="w-full bg-purple-500 rounded-lg w-30 text-white">
            내 라온
          </button>
        </div>
      </div>
      <div className="font- text-sm text-gray-500 leading-4 w-[40%]">
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
          <span>+{apeIndex}</span>
        </p>
      </div>
    </div>
  );
};
