import { useGetCenterPosts } from 'climbingweb/src/hooks/queries/center/useGetCenterPosts';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import Image from 'next/image';
import { useRouter } from 'next/router';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';

interface CenterPostsProps {
  centerId: string;
}

export const CenterPost = ({ centerId }: CenterPostsProps) => {
  const {
    data,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetCenterPosts(centerId);
  const router = useRouter();

  const handleThumbnailClick = (id: string) => {
    router.push(`/feed/${id}`);
  };

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
    return data.pages[0].totalCount !== 0 ? (
      <>
        <div className="w-full grid grid-cols-3">
          {data.pages.map((page) => {
            return page.results.map((value) => (
              <div
                key={`CenterPosts_${value.postId}`}
                className="h-32 relative"
                onClick={() => handleThumbnailClick(value.postId)}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  priority
                  src={value.thumbnailUrl}
                  alt={value.postId}
                />
              </div>
            ));
          })}
        </div>
        {!isFetchingNextPage ? (
          <div className="h-[1px] bg-slate-300" ref={target}></div>
        ) : (
          <Loading />
        )}
      </>
    ) : (
      <EmptyContent message="아직 게시글이 없습니다." />
    );

  return <Loading />;
};
