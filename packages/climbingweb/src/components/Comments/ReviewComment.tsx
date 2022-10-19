import Image from 'next/image';
import { useState } from 'react';
import { StarRating } from '../common/StarRating';

// interface ReviewCommmentProps {
//   commentId?: string;
//   content: string;
//   isDeleted: boolean;
//   postId?: string;
//   writerNickName: string;
//   writerProfileImage: string;
//   createAt?: string;
//   updateAt?: string;
// }

interface ReviewCommentProps {
  content: string;
  createdAt: string;
  rank: number;
  reviewerNickname: string;
  reviewerProfileImage: string;
  updatedAt: string;
}

export const ReviewComment = ({
  content,
  createdAt,
  rank,
  reviewerNickname,
  reviewerProfileImage,
  updatedAt,
}: ReviewCommentProps) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row py-4 gap-2">
        <div className="min-w-10 min-h-10 h-10 w-10 relative">
          <Image
            className="rounded-full"
            layout="fill"
            objectFit="cover"
            src={reviewerProfileImage}
            alt="comment"
          />
        </div>
        <div className=" gap-2">
          <div className="h-10 flex flex-row justify-between items-center">
            <div>
              <p className="text-sm font-bold">{reviewerNickname}</p>
              <p className="text-gray-400 text-sm">
                {updatedAt ? updatedAt : createdAt}{' '}
              </p>
            </div>
            <StarRating
              readOnly={true}
              size="sm"
              count={rank}
              initialValue={4}
            />
          </div>
          <div className="">
            <p className={`text-sm ${readMore ? '' : 'line-clamp-3'}`}>
              {content}
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
