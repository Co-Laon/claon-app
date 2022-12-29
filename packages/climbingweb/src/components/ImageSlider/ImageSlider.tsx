import Image from 'next/image';
import React, { useState } from 'react';
import { TouchEvent } from 'react';
import Loading from '../common/Loading/Loading';

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`;
};

const ImageSlider = ({ imageList }: { imageList: string[] }) => {
  //피드에서 현재 보여질 이미지 index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageWidth = window.innerWidth;

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].pageX;
    if (touchX > imageWidth / 2) {
      if (selectedImageIndex < imageList.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    } else {
      if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <div
      className={'relative w-full aspect-square overflow-hidden bg-black'}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={'w-[1000%] relative'}
        style={{
          transform: `translateX(-${selectedImageIndex * imageWidth}px)`,
          transition: 'transform 0.5s',
        }}
      >
        {imageList.map((value) =>
          value ? (
            <Image
              key={value}
              src={value}
              width={`${imageWidth}px`}
              height={`${imageWidth}px`}
              objectFit={'contain'}
              alt={'sliderImage'}
              loader={imageLoader}
            />
          ) : (
            <div key={value} className={'w-full aspect-square'}>
              <Loading />
            </div>
          )
        )}
      </div>
      <div
        className={'flex w-full my-4 absolute left-0 bottom-0 justify-center'}
      >
        <div className="flex rounded-full bg-black bg-opacity-50">
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
    </div>
  );
};

export default ImageSlider;
