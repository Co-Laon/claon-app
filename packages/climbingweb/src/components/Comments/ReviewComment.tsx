import { useDeleteReview } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useEffect, useState } from 'react';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { StarRating } from '../common/StarRating';

interface ReviewCommentProps {
  reviewId: string;
  centerId: string;
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
  const [realContent, setRealContent] = useState(content);

  useEffect(() => {
    if (content.length > 67 && !readMore) {
      setRealContent(content.slice(0, 68));
    } else {
      setRealContent(content);
    }
  }, [readMore, content]);

  return (
    <div className="flex flex-row py-2 pr-1 gap-2 w-full">
      <ProfileImage src={reviewerProfileImage} size={30} />
      <div className="w-full gap-2">
        <div className="h-10 flex flex-row justify-between items-center ">
          <div>
            <p className="text-xs font-bold leading-[18px]">
              {reviewerNickname}
            </p>
            <span className="text-[#808080] text-xs leading-[18px] font-medium">
              {updatedAt ? updatedAt : createdAt}{' '}
            </span>
          </div>
          <StarRating disabled size="sm" count={5} initialValue={rank} />
        </div>
        <div className="flex">
          <p className="text-xs leading-[18px] font-medium">
            {readMore ? `${realContent}... ` : realContent}
          </p>
          <span
            className="text-gray-400 inline float-right text-sm"
            onTouchEnd={() => setReadMore(!readMore)}
          >
            {content.length > 67 ? (readMore ? '접기' : '더보기') : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MyReviewComment = ({
  reviewId,
  centerId,
  content,
  createdAt,
  rank,
  reviewerNickname,
  reviewerProfileImage,
  updatedAt,
}: ReviewCommentProps) => {
  const [readMore, setReadMore] = useState(false);
  const [realContent, setRealContent] = useState(content);

  const { toast } = useToast();

  const { mutate: deleteReview } = useDeleteReview(centerId, reviewId);

  useEffect(() => {
    console.log(content.length);
    if (content.length > 67 && !readMore) {
      setRealContent(content.slice(0, 68));
    } else {
      setRealContent(content);
    }
  }, [readMore, content]);

  const handleModifyReviewClick = () => {
    console.log('수정');
  };

  const handleDeleteReviewClick = () => {
    deleteReview();
    toast('리뷰가 삭제되었습니다.');
  };

  return (
    <div className="flex flex-row py-2 pr-1 gap-2 w-full">
      <ProfileImage src={reviewerProfileImage} size={30} />
      <div className="w-full gap-2">
        <div className="h-10 flex flex-row justify-between items-center ">
          <div>
            <p className="text-xs leading-[18px] font-bold">
              {reviewerNickname}
            </p>
            <span className="text-xs leading-[18px] font-medium text-[#808080]">
              {updatedAt ? updatedAt : createdAt}{' '}
            </span>

            <span
              className="text-xs leading-[18px] font-medium text-[#5953FF]"
              onClick={handleModifyReviewClick}
            >
              ·수정
            </span>
            <span
              className="text-xs leading-[18px] font-medium text-[#5953FF]"
              onClick={handleDeleteReviewClick}
            >
              ·삭제
            </span>
          </div>
          <StarRating disabled size="sm" count={5} initialValue={rank} />
        </div>
        <div className="">
          <span className={'text-xs leading-[18px] font-medium inline'}>
            {content.length <= 67
              ? realContent
              : readMore
              ? realContent
              : `${realContent}... `}
          </span>
          <span
            className={`text-gray-400 inline text-sm ${
              readMore ? 'float-right' : null
            }`}
            onTouchEnd={() => setReadMore(!readMore)}
          >
            {content.length > 67 ? (readMore ? '접기' : '더보기') : null}
          </span>
        </div>
      </div>
    </div>
  );
};
