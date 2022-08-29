import React, { useState } from 'react';
import solidHeart from '../../../assets/heart_solid_red500.svg';
import lineHeart from '../../../assets/heart_line_gray800.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  return (
    <section className='px-5 pt-7 text-sm'>
      <div className={'flex justify-between'}>
        <span className={'flex font-medium'}>
          <Image
            className={`${isLiked ? 'animate-larger' : 'animate-none'}`}
            src={isLiked ? solidHeart : lineHeart}
            width={'32px'}
            height={'32px'}
            onTouchEnd={() => onTouchHeartIcon()}
            alt={'heartIcon'}
          />
          {`${likeCount}명이 좋아해요`}
        </span>
        <span className='font-medium text-gray-400'>{postTime === 0 ? '방금 전' : `${postTime}시간 전`}</span>
      </div>
      {content.length > 50 && !moreRead ? (
        <div className='h-10'>
          <span className={'line-clamp-2 inline'}>{content}</span>
          <span className='text-gray-400 inline float-right' onTouchEnd={onTouchMoreRead}>더보기</span>
        </div>
      ) : (
        <p className='py-2 font-medium'>{content}</p>
      )}
      {replyCount ? <p onTouchEnd={() => router.push('/CommentPage')} className='font-medium text-gray-400'>{`댓글 ${replyCount}개 더 보기`}</p> : null}
    </section>
  );
};

export default FeedContent;
