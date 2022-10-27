import React, { useState } from 'react';
import SolidHeart from 'climbingweb/src/assets/heart_solid_red500.svg';
import LineHeart from 'climbingweb/src/assets/heart_line_gray800.svg';

const FeedContent = ({
  isLiked,
  likeCount,
  createdAt,
  content,
  replyCount,
  onClickHeartIcon,
  onClickMoreComment,
}: {
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  content: string;
  replyCount: number;
  onClickHeartIcon: () => void;
  onClickMoreComment: () => void;
}) => {
  const [moreRead, setMoreRead] = useState(false);

  const onTouchMoreRead = () => {
    setMoreRead(true);
  };

  return (
    <section className="px-5 pt-7 text-sm">
      <div className={'flex justify-between'}>
        <span className={'flex font-medium'}>
          {isLiked ? (
            <SolidHeart
              onTouchEnd={onClickHeartIcon}
              className="animate-larger"
            />
          ) : (
            <LineHeart onTouchEnd={onClickHeartIcon} className="animate-none" />
          )}
          {`${likeCount}명이 좋아해요`}
        </span>
        <span className="font-medium text-gray-400">{createdAt}</span>
      </div>
      {content.length > 50 && !moreRead ? (
        <div className="h-10">
          <span className={'line-clamp-2 inline'}>{content}</span>
          <span
            className="text-gray-400 inline float-right"
            onTouchEnd={onTouchMoreRead}
          >
            더보기
          </span>
        </div>
      ) : (
        <p className="py-2 font-medium">{content}</p>
      )}
      {replyCount ? (
        <p
          onTouchEnd={onClickMoreComment}
          className="font-medium text-gray-400"
        >{`댓글 ${replyCount}개 더 보기`}</p>
      ) : null}
    </section>
  );
};

export default FeedContent;
