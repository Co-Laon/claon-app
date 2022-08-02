import Image from 'next/image';
import React from 'react';
import StarIcon from 'climbingweb/src/assets/icon/ic_10_rate_black.svg';
import DefaultCenterImage from 'climbingweb/src/assets/default_image.svg';

const CenterResult = ({
  star,
  image,
  name,
}: {
  star: number;
  image?: string;
  name: string;
}) => {
  return (
    <div className="relative w-[150px] h-[120px] rounded-[4px] bg-gray-800">
      <div className="m-1 px-2 py-[2px] z-10 absolute bg-yellow-500 rounded-full">
        <Image src={StarIcon} alt={'starIcon'} />
        {star}
      </div>
      <Image
        src={image ?? DefaultCenterImage}
        alt={'centerImage'}
        layout="fill"
      />
      <div className="m-1 px-2 py-[2px] right-0 bottom-0 absolute bg-purple-500 rounded-full">
        {name}
      </div>
    </div>
  );
};

export default CenterResult;
