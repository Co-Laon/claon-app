import Image from 'next/image';
import { useState } from 'react';
import { StarRating } from '../common/StarRating';

interface Props {
  commentId?: string;
  content: string;
  isDeleted: boolean;
  postId?: string;
  writerNickName: string;
  writerProfileImage: string;
  createAt?: string;
  updateAt?: string;
}

export const ReviewCommment = ({
  content,
  isDeleted,
  writerNickName,
  writerProfileImage,
  createAt,
  updateAt,
}: Props) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row py-4 gap-2">
        <div className="min-w-10 min-h-10 h-10 w-10 relative">
          <Image
            className="rounded-full"
            layout="fill"
            objectFit="cover"
            src={writerProfileImage}
            alt="comment"
          />
        </div>
        <div className=" gap-2">
          <div className="h-10 flex flex-row justify-between items-center">
            <div>
              <p className="text-sm font-bold">{writerNickName}</p>
              <p className="text-gray-400 text-sm">
                {updateAt ? updateAt : createAt}{' '}
              </p>
            </div>
            <StarRating readOnly={true} size="sm" count={5} initialValue={4} />
          </div>
          <div className="">
            <p className={`text-sm ${readMore ? '' : 'line-clamp-3'}`}>
              {isDeleted ? '삭제된 게시글 입니다' : content}
            </p>
            <span
              className="text-gray-400 inline float-right text-sm"
              onTouchEnd={() => setReadMore(!readMore)}
            >
              {readMore ? '접기' : '더보기'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
