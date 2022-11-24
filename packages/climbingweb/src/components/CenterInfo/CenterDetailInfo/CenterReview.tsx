import { useFindReviewByCenter } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { ReviewComment } from '../../Comments/ReviewComment';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';
import { StarRating } from '../../common/StarRating';

interface ReviewProps {
  id: string;
}

export const CenterReview = ({ id }: ReviewProps) => {
  const {
    data,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFindReviewByCenter(id);
  const count = 5;

  // infinite scroll 핸들러
  const target = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  if (isError) return <ErrorContent error={error} />;

  if (data)
    return (
      <div className="w-full px-5">
        {data.pages[0].otherReviewsPagination.totalCount === 0 ? (
          <EmptyContent message="아직 리뷰가 없습니다." />
        ) : (
          <>
            <div className="flex flex-row justify-between items-center py-5">
              <div className="flex items-center gap-2">
                <span className="text-black text-sm">
                  <span className="text-purple-500">
                    {data.pages[0].rank}/{count}
                  </span>
                </span>
                <StarRating count={count} initialValue={3} size="sm" />
              </div>
              <button className="w-16 h-6 bg-purple-500 rounded-lg text-white text-xs">
                리뷰 작성
              </button>
            </div>
            <div>
              {
                <>
                  {data.pages[0].selfReview ? (
                    <ReviewComment
                      key={data.pages[0].selfReview.reviewId}
                      content={data.pages[0].selfReview.content}
                      createdAt={data.pages[0].selfReview.createdAt}
                      rank={data.pages[0].selfReview.rank}
                      reviewerNickname={
                        data.pages[0].selfReview.reviewerNickname
                      }
                      reviewerProfileImage={
                        data.pages[0].selfReview.reviewerProfileImage
                      }
                      updatedAt={data.pages[0].selfReview.updatedAt}
                    />
                  ) : (
                    <EmptyContent message="아직 내가 리뷰를 남기지 않았습니다." />
                  )}
                  <div className="border-b border-gray-300" />
                </>
              }
              {data.pages.map((page) => {
                return page.otherReviewsPagination.results.map(
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
                );
              })}
            </div>
            {!isFetchingNextPage ? (
              <div className="h-[1px]" ref={target}></div>
            ) : (
              <Loading />
            )}
          </>
        )}
      </div>
    );

  return <Loading />;
};
