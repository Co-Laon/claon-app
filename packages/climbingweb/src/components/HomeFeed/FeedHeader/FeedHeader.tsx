import React from 'react';
import OptionDotImg from 'climbingweb/src/assets/option_gray800.svg';
import { ProfileImage } from '../../common/profileImage/ProfileImage';
import { useRouter } from 'next/router';

interface FeedHeaderProps {
  userImage?: string;
  userName: string;
  userLocation: string;
  handleOptionDotClick: () => void;
  isOwner?: boolean;
  className?: string;
}

const FeedHeader = ({
  userImage,
  userName,
  userLocation,
  handleOptionDotClick,
  className,
  isOwner = false,
}: FeedHeaderProps) => {
  const router = useRouter();
  const handleProfileClick = () => {
    if (isOwner) router.push('/users/me');
    else router.push(`/users/name/${userName}`);
  };
  return (
    <header className={`flex w-full h-[69px]  justify-between ${className}`}>
      <div className={'flex items-center'} onClick={handleProfileClick}>
        <ProfileImage src={userImage} className="w-[40px]  mx-2" />
        <div>
          <p className={'text-sm font-bold'}>{userName}</p>
          <p className={'text-sm text-[#666666] font-medium'}>{userLocation}</p>
        </div>
      </div>
      <button className={'w-[24px] h-[24px] self-center mr-[19px]'}>
        <OptionDotImg onClick={handleOptionDotClick} />
      </button>
    </header>
  );
};

export default FeedHeader;
