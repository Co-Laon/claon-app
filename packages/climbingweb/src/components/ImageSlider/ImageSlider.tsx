import Image from 'next/image';
import React from 'react';
import defaultProfileImg from '../../assets/profile_gray400.svg';
import pencilImg from '../../assets/pencil_gray800.svg';
import { TouchEvent } from 'react';

const ImageSlider = ({
  imageList,
  selectedImageIndex,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: {
  imageList: (string | null | undefined)[];
  selectedImageIndex: number;
  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (event: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void;
}) => {
  console.dir(selectedImageIndex);
  return (
    <div
      className={`bg-black relative w-full h-[360px] overflow-hidden`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`h-[360px] -ml-[${
          selectedImageIndex * 360
        }px] transition-all 0.5s`}
      >
        {imageList.map((value, index) =>
          value ? (
            <Image
              key={`sectorInfo${index}`}
              src={index == 0 ? defaultProfileImg : pencilImg}
              width={`360px`}
              height={`360px`}
            />
          ) : (
            <div className={`w-[360px] h-[360px]`}>
              <div
                className={`border-t-transparent
      animate-spin
      inline-block
      w-8
      h-8
      border-4
      rounded-full
    `}
              />
            </div>
          )
        )}
      </div>
      <div
        className={`flex w-full my-4 absolute left-0 bottom-0 justify-center`}
      >
        {imageList.map((value, index) => (
          <div
            key={`justDot${index}`}
            className={`w-2 h-2 m-1 rounded-full bg-white ${
              selectedImageIndex === index ? `opacity-100` : `opacity-40`
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
