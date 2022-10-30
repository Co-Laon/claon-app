import React from 'react';
import Image from 'next/image';
import DefaultProfileImg from 'climbingweb/src/assets/profile_gray400.svg';
import OptionDotImg from 'climbingweb/src/assets/option_gray800.svg';

const FeedHeader = ({
  userImage,
  userName,
  userLocation,
}: {
  userImage: string | null | undefined;
  userName: string;
  userLocation: string;
}) => {
  // 헤더 도트 옵션 클릭 시 핸들러
  const handleOptionDotClick = () => {};

  return (
    <header className={'flex w-full h-[56px] my-1 justify-between'}>
      <div className={'flex items-center'}>
        {userImage ? (
          <Image
            src={userImage}
            className="w-[40px] h-[40px] m-2"
            alt="UserProfile"
          />
        ) : (
          <DefaultProfileImg />
        )}
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
