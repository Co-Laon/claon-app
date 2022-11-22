import { useGetCenterPosts } from 'climbingweb/src/hooks/queries/center/useGetCenterPosts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import EmptyContent from '../../common/EmptyContent/EmptyContent';
import ErrorContent from '../../common/Error/ErrorContent';
import Loading from '../../common/Loading/Loading';

interface CenterPostsProps {
  centerId: string;
}

export const CenterPost = ({ centerId }: CenterPostsProps) => {
  const { data, isError, error } = useGetCenterPosts(centerId);
  const router = useRouter();

  const handleThumbnailClick = (id: string) => {
    router.push(`/feed/${id}`);
  };

  if (isError) return <ErrorContent error={error} />;

  if (!!data)
    return data.totalCount !== 0 ? (
      <div className="w-full grid grid-cols-3">
        {data.results.map((value, idx) => (
          <div
            key={`CenterPosts_${idx}`}
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
        ))}
      </div>
    ) : (
      <EmptyContent message="게시글이 없습니다." />
    );

  return <Loading />;
};
