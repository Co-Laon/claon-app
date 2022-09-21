import React from 'react';
import StarIcon from 'climbingweb/src/assets/icon/ic_12_rate_black.svg';
import { CenterProps } from './type';
import { useRouter } from 'next/router';
import Image from 'next/image';
const DefaultCenterImage = '/assets/default_image.svg';

const CenterResult = ({ star, image, name, id }: CenterProps) => {
  const router = useRouter();
  const handleGoToCenterDetail = () => {
    router.push(`/center/${id}`);
  };

  return (
    <div
      onTouchEnd={handleGoToCenterDetail}
      className="relative min-w-[150px] min-h-[120px] rounded-lg bg-gray-800 mr-[5px]"
    >
      <div className="flex items-center justify-between m-1 px-2 py-[2px] z-10 gap-1 absolute bg-yellow-500 rounded-lg text-xs font-bold">
        <StarIcon />
        {star}
      </div>
      <Image
        src={image ?? DefaultCenterImage}
        alt={'centerImage'}
        layout="fill"
      />
      <div className="m-1 px-2 py-[2px] right-0 bottom-0 absolute bg-purple-500 text-white rounded-full text-xs">
        {name}
      </div>
    </div>
  );
};

export default CenterResult;
