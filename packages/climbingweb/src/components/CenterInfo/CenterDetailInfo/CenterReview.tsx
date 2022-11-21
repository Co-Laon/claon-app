import { useFindReviewByCenter } from 'climbingweb/src/hooks/queries/center/useFindReviewByCenter';
import { ReviewComment } from '../../Comments/ReviewComment';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';
import { StarRating } from '../../common/StarRating';

interface ReviewProps {
  id: string;
}

export const CenterReview = ({ id }: ReviewProps) => {
  const { data, isError, error } = useFindReviewByCenter(id);
  const count = 5;

  if (isError) return <ErrorContent error={error} />;

  if (data)
    return data ? (
      <div className="w-full px-5">
        {data.reviewFindResponseDtoPagination.totalCount === 0 ? (
          <div>리뷰가 없습니다.</div>
        ) : (
          <>
            <div className="flex flex-row justify-between items-center py-5">
              <div className="flex items-center gap-2">
                <span className="text-black text-sm">
                  <span className="text-purple-500">{data.rank}</span>/ {count}
                </span>
                <StarRating count={count} initialValue={3} size="sm" />
              </div>
              <button className="w-16 h-6 bg-purple-500 rounded-lg text-white text-xs">
                리뷰 작성
              </button>
            </div>
            <div>
              {data.reviewFindResponseDtoPagination.results.map(
                ({
                  content,
                  createdAt,
                  rank,
                  reviewId,
                  reviewerNickname,
                  reviewerProfileImage,
                  updatedAt,
                }) => (
                  <ReviewComment
                    key={reviewId}
                    content={content}
                    createdAt={createdAt}
                    rank={rank}
                    reviewerNickname={reviewerNickname}
                    reviewerProfileImage={reviewerProfileImage}
                    updatedAt={updatedAt}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    ) : null;

  return <Loading />;
};
