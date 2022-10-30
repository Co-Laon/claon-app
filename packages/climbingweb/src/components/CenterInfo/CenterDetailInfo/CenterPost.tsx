import { useGetCenterPosts } from 'climbingweb/src/hooks/queries/center/useGetCenterPosts';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface CenterPostsProps {
  centerId: string;
}

export const CenterPost = ({ centerId }: CenterPostsProps) => {
  const { data, isError, error } = useGetCenterPosts(centerId);
  const router = useRouter();

  const handleThumbnailClick = (id: string) => {
    router.push(`/feed/${id}`);
  };

  if (isError) return <div>{error}</div>;

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
      <div> 게시글이 없습니다. </div>
    );

  return <div>로딩 중...</div>;
};
