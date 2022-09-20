import Image from 'next/image';
const DefaultCenterImage = '/assets/default_image.svg';

interface ListProps {
  imageList?: string[];
}

export const ImageList = ({ imageList }: ListProps) => {
  return (
    <div className="w-full flex flex-row overflow-x-auto scrollbar-hide">
      {imageList?.map((image, idx) => (
        <div key={image + idx} className="min-w-40 w-40 h-32 relative">
          <Image
            key={image + idx}
            layout="fill"
            objectFit="cover"
            priority
            src={image ? image : DefaultCenterImage}
            alt={image}
          />
        </div>
      ))}
    </div>
  );
};
