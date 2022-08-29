import React from 'react';
import Image from 'next/image';
import defaultProfileImg from '../../../assets/profile_gray400.svg';
import optionDotImg from '../../../assets/option_gray800.svg';

const FeedHeader = ({
  userImage,
  userName,
  userLocation,
}: {
  userImage: string | null | undefined;
  userName: string;
  userLocation: string;
}) => {
  return (
    <header className={'flex w-full h-[56px] my-1 justify-between'}>
      <div className={'flex'}>
        <Image
          src={userImage ? userImage : defaultProfileImg}
          className={'w-[40px] h-[40px] m-2'}
          alt="UserProfile"
        />
        <div>
          <p className={'text-sm'}>{userName}</p>
          <p className={'text-sm text-gray-600'}>{userLocation}</p>
        </div>
      </div>
      <button className={'w-[24px] h-[24px] self-center'}>
        <Image src={optionDotImg} alt="..." />
      </button>
    </header>
  );
};

export default FeedHeader;
