import React, { useState, useEffect } from 'react';
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
  const [realContent, setRealContent] = useState(content);

  useEffect(() => {
    if (content.length > 50 && !moreRead) {
      setRealContent(content.slice(0, 51));
    } else {
      setRealContent(content);
    }
  }, []);

  const onTouchMoreRead = () => {
    setMoreRead(true);
  };

  return (
    <section className="px-[30px] pt-4 text-sm">
      <div className={'flex justify-between'}>
        <span className={'flex font-medium content-center'}>
          {isLiked ? (
            <SolidHeart
              onTouchEnd={onClickHeartIcon}
              className="animate-larger mr-1 w-[32px] h-[32px]"
              viewBox="0 0 32 32"
            />
          ) : (
            <LineHeart
              onTouchEnd={onClickHeartIcon}
              className="animate-none mr-1 w-[32px] h-[32px]"
              viewBox="0 0 32 32"
            />
          )}
          {`${likeCount}명이 좋아해요`}
        </span>
        <span className="font-medium text-[#BFBFBF]">{createdAt}</span>
      </div>
      {content.length > 50 && !moreRead ? (
        <div className="h-10 pl-[6px] my-2">
          <span className={' inline'}>{`${realContent}... `}</span>
          <span
            className="text-[#BFBFBF] tinline float-right"
            onTouchEnd={onTouchMoreRead}
          >
            더 보기
          </span>
        </div>
      ) : (
        <p className="py-2 font-medium pl-[6px]">{content}</p>
      )}
      {
        <p
          onTouchEnd={onClickMoreComment}
          className="font-medium text-[#BFBFBF] text-sm pl-[6px]"
        >
          {replyCount === 0 ? '댓글 달기' : `댓글 ${replyCount}개 더 보기`}
        </p>
      }
    </section>
  );
};

export default FeedContent;
