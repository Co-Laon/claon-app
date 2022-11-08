import React from 'react';
import OptionDotImg from 'climbingweb/src/assets/option_gray800.svg';
import { ProfileImage } from '../../common/profileImage/ProfileImage';

interface FeedHeaderProps {
  userImage: string;
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
  return (
    <header className={'flex w-full h-[56px] my-1 justify-between'}>
      <div className={'flex items-center'}>
        <div className={'ml-4 mr-2'}>
          <ProfileImage src={userImage} />
        </div>
        <div>
          <p className={'text-sm'}>{userName}</p>
          <p className={'text-sm text-gray-600'}>{userLocation}</p>
        </div>
      </div>
      <button className={'w-[24px] h-[24px] self-center'}>
        <OptionDotImg onClick={handleOptionDotClick} />
      </button>
    </header>
  );
};

export default FeedHeader;
