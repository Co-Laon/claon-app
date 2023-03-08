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
      <div className={'flex justify-between items-center'}>
        <span className={'flex font-medium items-center'}>
          {isLiked ? (
            <SolidHeart
              onClick={onClickHeartIcon}
              className="animate-larger mr-1"
              width="32px"
              height="32px"
              viewBox="0 0 26 23"
            />
          ) : (
            <LineHeart
              onClick={onClickHeartIcon}
              className="animate-none mr-1 w-[32px] h-[32px]"
              width="32px"
              height="32px"
              viewBox="0 0 26 23"
            />
          )}
          {`${likeCount}명이 좋아해요`}
        </span>
        <span className="font-medium text-[#BFBFBF]">{createdAt}</span>
      </div>
      {content.length > 50 && !moreRead ? (
        <div className="min-h-10 pl-[6px] my-2">
          <span className={' inline'}>{`${realContent}... `}</span>
          <span
            className="text-[#BFBFBF] inline block"
            onClick={onTouchMoreRead}
          >
            더 보기
          </span>
        </div>
      ) : (
        <p className="py-2 font-medium pl-[6px]">{content}</p>
      )}
      {
        <div className="flex">
          <p onClick={onClickMoreComment} className="font-medium text-gray-400">
            {replyCount === 0 ? '댓글 달기' : `댓글 ${replyCount}개 더 보기`}
          </p>
        </div>
      }
    </section>
  );
};

export default FeedContent;
