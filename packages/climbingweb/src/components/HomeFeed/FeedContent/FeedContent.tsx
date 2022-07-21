import React, { useState } from 'react';
import solidHeart from '../../../assets/heart_solid_red500.svg';
import lineHeart from '../../../assets/heart_line_gray800.svg';
import Image from 'next/image';

const FeedContent = ({
  isLiked,
  likeCount,
  postTime,
  content,
  replyCount,
  onTouchHeartIcon,
}: {
  isLiked: boolean;
  likeCount: number;
  postTime: number;
  content: string;
  replyCount: number;
  onTouchHeartIcon: () => void;
}) => {
  const [moreRead, setMoreRead] = useState(false);

  const onTouchMoreRead = () => {
    console.log('onTouchMoreRead');
    setMoreRead(true);
  };

  return (
    <section>
      <div className={'flex justify-between'}>
        <span className={'flex'}>
          <Image
            className={`${isLiked ? 'animate-larger' : 'animate-none'}`}
            src={isLiked ? solidHeart : lineHeart}
            width={'32px'}
            height={'32px'}
            onTouchEnd={() => onTouchHeartIcon()}
            alt={'heartIcon'}
          />
          {`${likeCount} 명이 좋아해요`}
        </span>
        <span>{postTime === 0 ? '방금 전' : `${postTime}시간 전`}</span>
      </div>
      {content.length > 50 && !moreRead ? (
        <>
          <p className={'h-8 truncate'}>{content}</p>
          <p onTouchEnd={onTouchMoreRead}>더보기</p>
        </>
      ) : (
        <p>{content}</p>
      )}
      {replyCount ? <p>{`댓글 ${replyCount}개 더 보기`}</p> : null}
    </section>
  );
};

export default FeedContent;
