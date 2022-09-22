import Hold from 'climbingweb/src/interface/Hold';
import MinusButton from 'climbingweb/src/assets/icon/createFeed/ic_24_minus_gray800.svg';
import React from 'react';
import Image from 'next/image';

interface ImageProps {
  indexHold: Hold;
  count: number;
  handleSeletHold?: any;
  handleDeleteHold?: any;
}

const HoldImage = ({
  indexHold,
  count,
  handleSeletHold,
  handleDeleteHold,
}: ImageProps) => {
  return (
    <div className="rounded-lg border border-solid h-20 w-20 mx-1.5 min-w-20 relative">
      <Image
        className="rounded-lg"
        layout="fill"
        objectFit="scale-down"
        src={indexHold.image}
        alt={indexHold.name}
        onClick={handleSeletHold}
      />
      {handleDeleteHold ? (
        <div className="h-6 w-6 top-1 right-1 absolute">
          <MinusButton onClick={handleDeleteHold} />
        </div>
      ) : null}
      <div className="h-6 w-6 bottom-1 right-1 absolute">{count}</div>
    </div>
  );
};

export default HoldImage;
