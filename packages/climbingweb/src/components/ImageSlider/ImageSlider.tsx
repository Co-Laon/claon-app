import Image from 'next/image';
import React, { useState } from 'react';
import DefaultProfileImg from 'climbingweb/src/assets/profile_gray400.svg';
import PencilImg from 'climbingweb/src/assets/pencil_gray800.svg';
import { TouchEvent } from 'react';

const ImageSlider = ({
  imageList,
}: {
  imageList: (string | null | undefined)[];
}) => {
  //피드에서 현재 보여질 이미지 index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].pageX;
    console.log('onTouchStart: ');
    console.log(event);
    if (touchX > 200) {
      if (selectedImageIndex < imageList.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    } else {
      if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    console.log(`onTouchMove: ${event.changedTouches}`);
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].pageX;
    console.log(`onTouchEnd: ${event.changedTouches}`);
    if (touchX > 200) {
      if (selectedImageIndex < imageList.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    } else {
      if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <div
      className={'bg-black relative w-full h-[360px] overflow-hidden'}
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
              src={index == 0 ? DefaultProfileImg : PencilImg}
              width={'360px'}
              height={'360px'}
              alt={'sliderImage'}
            />
          ) : (
            <div key={`sectorInfo${index}`} className={'w-[360px] h-[360px]'}>
              <div
                className={
                  'border-t-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full'
                }
              />
            </div>
          )
        )}
      </div>
      <div
        className={'flex w-full my-4 absolute left-0 bottom-0 justify-center'}
      >
        {imageList.map((value, index) => (
          <div
            key={`justDot${index}`}
            className={`w-2 h-2 m-1 rounded-full bg-white ${
              selectedImageIndex === index ? 'opacity-100' : 'opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
