import Image from 'next/image';
import Router from 'next/router';
import { LaonProps } from './type';

export const LaonItem = ({
  laonNickName,
  laonProfileImage,
  rightNode,
}: LaonProps) => {
  /**
   * 라온 리스트 클릭 핸들러
   * @description 라온 클릭시 해당 라온의 개인 페이지로 이동
   */
  const handleLaonItemClick = () => {
    Router.push(`/users/name/${laonNickName}`);
  };

  return (
    <li
      className="flex flex-row items-center justify-between"
      onClick={handleLaonItemClick}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="h-10 w-10 relative">
          <Image
            className="rounded-full"
            layout="fill"
            objectFit="cover"
            src={laonProfileImage}
            alt="laonProfileImage"
          />
        </div>
        <p className="text-sm font-bold">{laonNickName}</p>
      </div>
      {rightNode}
    </li>
  );
};
