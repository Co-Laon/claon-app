import Image from 'next/image';
import DelButton from 'climbingweb/src/assets/icon/createFeed/ic_24_del_gray800.svg';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';

interface ImageProps {
  src: string;
  id: number;
}

export function UploadImage({ id, src }: ImageProps) {
  const { deleteImageList, postImageList, addInActiveImage } =
    useCreatePostForm();
  const handleDeleteMedia = () => {
    if (postImageList[id].file === null) {
      addInActiveImage(postImageList[id].thumbNail);
    }
    deleteImageList(id);
  };

  return (
    <>
      <div className="h-[72px] w-[72px] min-w-[72px] relative">
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
