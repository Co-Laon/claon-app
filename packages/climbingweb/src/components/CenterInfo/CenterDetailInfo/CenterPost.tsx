import {
  useFindHoldInfoByCenter,
  useGetCenterPosts,
} from 'climbingweb/src/hooks/queries/center/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';
import CenterPostFilter from './CenterPostFilter';

interface CenterPostsProps {
  centerId: string;
}

export const CenterPost = ({ centerId }: CenterPostsProps) => {
  const [filter, setFilter] = useState<string>('null');
  const {
    data,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetCenterPosts(centerId, filter);

  const { data: holdData } = useFindHoldInfoByCenter(centerId);
  const router = useRouter();

  const changeHoldFilter = useCallback((id: string) => {
    setFilter(id);
  }, []);

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
    return (
      <>
        <CenterPostFilter
          holdList={holdData || []}
          setFilter={changeHoldFilter}
        />
        {data.pages[0].totalCount !== 0 ? (
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
              <div className="h-[1px]" ref={target}></div>
            ) : (
              <Loading />
            )}
          </>
        ) : (
          <EmptyContent message="아직 게시글이 없습니다." />
        )}
      </>
    );

  return <Loading />;
};
