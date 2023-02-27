import Image from 'next/image';
import { CenterImageSkeleton } from '../skeleton/CenterImageSkeleton';
const DefaultCenterImage = '/assets/default_image.svg';

interface ListProps {
  imageList?: string[];
}

export const ImageList = ({ imageList }: ListProps) => {
  return (
    <div className="w-full flex flex-row overflow-x-auto scrollbar-hide">
      {imageList?.map((image, idx) =>
        image ? (
          <div
            key={image + idx}
            className="min-w-40 w-40 h-32 relative w-[41.6vw] h-[16.7vh]"
          >
            <Image
              key={image + idx}
              layout="fill"
              objectFit="cover"
              priority
              src={image ? image : DefaultCenterImage}
              alt={image}
            />
          </div>
        ) : (
          <CenterImageSkeleton />
        )
      )}
    </div>
  );
};
