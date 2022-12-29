import Router from 'next/router';
import { ProfileImage } from '../profileImage/ProfileImage';
import { LaonProps } from './type';

export const LaonItem = ({
  laonNickName,
  laonProfileImage,
  rightNode,
  disabled,
}: LaonProps) => {
  /**
   * 라온 리스트 클릭 핸들러
   * @description 라온 클릭시 해당 라온의 개인 페이지로 이동
   */
  const handleLaonItemClick = () => {
    Router.push(`/users/name/${laonNickName}`);
  };

  return (
    <li className="flex flex-row items-center justify-between">
      <div
        className="flex flex-row items-center gap-2"
        onClick={!disabled ? handleLaonItemClick : undefined}
      >
        <ProfileImage src={laonProfileImage} />
        <p className="text-sm font-bold">{laonNickName}</p>
      </div>
      {rightNode}
    </li>
  );
};
