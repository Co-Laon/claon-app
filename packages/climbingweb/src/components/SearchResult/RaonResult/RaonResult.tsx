import Image from 'next/image';
import React from 'react';
import DefaultRaonImage from 'climbingweb/src/assets/icon/ic_72_profile_gray400.svg';

const RaonResult = ({ image, name }: { image?: string; name: string }) => {
  return (
    <div className="relative flex flex-col items-center text-center w-[75px] h-[110px] rounded-[4px] border-gray-400 border-2 text-[8px] mr-[15px]">
      {image ? (
        <Image
          className="rounded-full my-1"
          src={image}
          alt={'raonImage'}
          width={'45px'}
          height={'45px'}
        />
      ) : (
        <DefaultRaonImage />
      )}
      {name}
      <button className="absolute bg-purple-500 text-center bottom-0 my-[6px] w-[36px] h-[16px] rounded-[4px]">
        라온
      </button>
    </div>
  );
};

export default RaonResult;
