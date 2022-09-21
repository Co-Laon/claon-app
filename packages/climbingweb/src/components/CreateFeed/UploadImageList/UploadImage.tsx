import Image from 'next/image';
import DelButton from 'climbingweb/src/assets/icon/createFeed/ic_24_del_gray800.svg';

interface ImageProps {
  src: string;
  media: string[];
  setMedia: ({}: any) => void;
}

export function UploadImage({ src, media, setMedia }: ImageProps) {
  const handleDeleteMedia = () => {
    const deletedMedia = media.filter((m) => m !== src);
    setMedia(deletedMedia);
  };

  return (
    <>
      <div className="h-20 w-20 min-w-20 relative">
        <Image
          className="rounded-lg"
          layout="fill"
          objectFit="cover"
          src={src}
          alt="comment"
        />
        <div className="h-6 w-6 top-1 right-1 absolute">
          <DelButton alt="delete" onClick={handleDeleteMedia} />
        </div>
      </div>
    </>
  );
}
