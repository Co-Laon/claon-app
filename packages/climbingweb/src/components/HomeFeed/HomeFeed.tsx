import Hold from 'climbingweb/src/interface/Hold';
import React, { TouchEvent, useEffect } from 'react';
import { useState } from 'react';
import FeedContent from './FeedContent/FeedContent';
import FeedHeader from './FeedHeader/FeedHeader';
import FeedSectorInfo from './FeedSectorInfo/FeedSectorInfo';
import ImageSlider from '../ImageSlider/ImageSlider';

const HomeFeed = ({
  imageList,
  holdList,
}: {
  imageList: string[];
  holdList: Hold[];
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //test용 훅 -> isLiked 는 back-end 에서 가져올 것
  const [isLiked, setIsLiked] = useState(false);

  const likeCount = 10;
  const postTime = 0;
  const feedContent =
    '고행을 바이며, 이상의 과실이 무엇을 이상의 풀밭에 듣는다. 가치를 황금시대를 대중을 미묘한 청춘의 방황하여도, 이는 끓는다. 없으면, 이상 같은 있을 끓는 구하기 소담스러운 뜨고, 아니다. 붙잡아 기관과 속잎나고, 발휘하기 가슴에 불러 있다. 대고, 끝에 있는 꽃 위하여 목숨을 바이며, 고행을 물방아 힘있다. 수 하였으며, 같이 사막이다.';
  // const shortFeedContent =
  //   '고행을 바이며, 이상의 과실이 무엇을 이상의 풀밭에 듣는다.';
  const replyCount = 10;

  useEffect(() => {
    console.log(selectedImageIndex);
  }, [selectedImageIndex]);

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
    <section className={'w-[360px]'}>
      <FeedHeader
        userImage={null}
        userName="kimclaon85"
        userLocation="비블럭 클라이밍 강남점"
      />
      <ImageSlider
        imageList={imageList}
        selectedImageIndex={selectedImageIndex}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      <FeedSectorInfo holdList={holdList} />
      <FeedContent
        isLiked={isLiked}
        likeCount={likeCount}
        postTime={postTime}
        content={feedContent}
        replyCount={replyCount}
        onTouchHeartIcon={() => setIsLiked(!isLiked)}
      ></FeedContent>
    </section>
  );
};

export default HomeFeed;
