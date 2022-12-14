import Image from 'next/image';
import React, { useState } from 'react';
import { TouchEvent } from 'react';

const ImageSlider = ({ imageList }: { imageList: string[] }) => {
  //피드에서 현재 보여질 이미지 index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageWidth = window.innerWidth;

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].pageX;
    if (touchX > 200) {
      if (selectedImageIndex < imageList.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    } else {
      if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].pageX;
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
      className={`bg-black relative w-full h-[${imageWidth}px] overflow-hidden`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`h-[${imageWidth}px] w-[3000px] relative -ml-[${
          selectedImageIndex * imageWidth
        }px] transition-all 0.5s`}
      >
        {imageList.map((value, index) =>
          value ? (
            <Image
              key={`sectorInfo${index}`}
              src={value}
              width={`${imageWidth}px`}
              height={`${imageWidth}px`}
              alt={'sliderImage'}
            />
          ) : (
            <div
              key={`sectorInfo${index}`}
              className={`w-[${imageWidth}px] h-[${imageWidth}px]`}
            >
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
