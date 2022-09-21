import Image from 'next/image';
const DefaultCenterImage = '/assets/default_image.svg';

interface ListProps {
  imageList?: string[];
}

export const ImageGridList = ({ imageList }: ListProps) => {
  return (
    <div className="w-full grid grid-cols-3">
      {imageList?.map((image, idx) => (
        <div key={image + idx} className="h-32 relative">
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
