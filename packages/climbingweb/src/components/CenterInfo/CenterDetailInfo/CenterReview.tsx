import { useFindReviewByCenter } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import { useRouter } from 'next/router';
import { MyReviewComment, ReviewComment } from '../../Comments/ReviewComment';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';
import { StarRating } from '../../common/StarRating';

interface ReviewProps {
  centerId: string;
}

export const CenterReview = ({ centerId }: ReviewProps) => {
  const {
    data,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFindReviewByCenter(centerId);

  // 리뷰 별점 최대 개수
  const count = 5;

  const router = useRouter();

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

  const handleWriteReviewButtonClick = () => {
    router.push(`/center/${centerId}/review`);
  };

  if (isError) return <ErrorContent error={error} />;

  if (data)
    return (
      <div className="w-full px-5">
        <div className="flex flex-row justify-between items-center py-5">
          <div className="flex items-center gap-2">
            <span className="text-black text-sm font-normal tracking-widest">
              <span className="text-purple-500">
                {data.pages[0].rank ? data.pages[0].rank : 0}
              </span>
              /{count}
            </span>
            <StarRating
              initialValue={data.pages[0].rank ? data.pages[0].rank : 0}
              count={count}
              readOnly
            />
          </div>
          {!data.pages[0].selfReview ? (
            <button
              className="w-16 h-6 bg-purple-500 rounded-lg text-white text-xs"
              onClick={handleWriteReviewButtonClick}
            >
              리뷰 작성
            </button>
          ) : null}
        </div>
        {data.pages[0].selfReview ? (
          <MyReviewComment
            key={data.pages[0].selfReview.reviewId}
            centerId={centerId}
            reviewId={data.pages[0].selfReview.reviewId}
            content={data.pages[0].selfReview.content}
            createdAt={data.pages[0].selfReview.createdAt}
            rank={data.pages[0].selfReview.rank}
            reviewerNickname={data.pages[0].selfReview.reviewerNickname}
            reviewerProfileImage={data.pages[0].selfReview.reviewerProfileImage}
            updatedAt={data.pages[0].selfReview.updatedAt}
          />
        ) : data.pages[0].otherReviewsPagination.totalCount === 0 ? (
          <EmptyContent message="아직 리뷰가 없습니다." />
        ) : (
          <EmptyContent message="아직 내가 리뷰를 남기지 않았습니다." />
        )}
        {
          <>
            <div>
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
                      centerId={centerId}
                      reviewId={reviewId}
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
        }
      </div>
    );

  return <Loading />;
};
