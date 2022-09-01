import { Divder } from '../common/divder/Divder';
import { ProfileImage } from '../common/profileImage/ProfileImage';

interface HeaderProps {
  height: number;
  armReach: number;
  apeIndex: number;
}

export const MyHead = ({ height, armReach, apeIndex }: HeaderProps) => {
  const countNameList = ['게시글', '라온', '좋아요'];

  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-row items-center justify-between">
          <div className="w-16 flex flex-col items-center">
            <ProfileImage icon="insta" />
            <p className=" font-bold text-sm">als95</p>
          </div>
          <div className="flex flex-col gap-1.5 w-52">
            <div className="flex flex-row justify-between">
              {countNameList.map((name) => (
                <div
                  key={name}
                  className=" w-auto h-auto flex flex-col items-center"
                >
                  <p className="text-purple-500 font-bold">3</p>
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
            <button className="w-full bg-purple-500 rounded-lg w-30 text-white">
              내 라온 리스트
            </button>
          </div>
        </div>

        <div className="text-sm font-bold leading-4">
          <p>
            키<span className=" text-[10px]">(Height)</span>: {height}cm
          </p>
          <p>
            암리치<span className=" text-[10px]">(Arm reach)</span>: {armReach}
            cm
          </p>
          <p>Ape Index + {apeIndex}</p>
        </div>
        <Divder/>
      </div>
    </>
  );
};
