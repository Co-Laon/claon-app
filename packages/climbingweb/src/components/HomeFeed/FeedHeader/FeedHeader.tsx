import React from 'react';
import OptionDotImg from 'climbingweb/src/assets/option_gray800.svg';
import { ProfileImage } from '../../common/profileImage/ProfileImage';
import { useRouter } from 'next/router';

interface FeedHeaderProps {
  userImage?: string;
  userName: string;
  userLocation: string;
  handleOptionDotClick: () => void;
}

const FeedHeader = ({
  userImage,
  userName,
  userLocation,
  handleOptionDotClick,
}: FeedHeaderProps) => {
  const router = useRouter();
  const handleProfileClick = () => {
    router.push(`/users/name/${userName}`);
  };
  return (
    <header className={'flex w-full h-[69px]  justify-between'}>
      <div className={'flex items-center'} onClick={handleProfileClick}>
        <ProfileImage src={userImage} className="w-[40px] ml-[20px] mr-2" />
        <div>
          <p className={'text-sm'}>{userName}</p>
          <p className={'text-sm text-gray-600'}>{userLocation}</p>
        </div>
      </div>
      <button className={'w-[24px] h-[24px] self-center mr-[19px]'}>
        <OptionDotImg onClick={handleOptionDotClick} />
      </button>
    </header>
  );
};

export default FeedHeader;
