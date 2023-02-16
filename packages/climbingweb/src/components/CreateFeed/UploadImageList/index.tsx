import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
import { UploadImage } from './UploadImage';
import { UploadImageButton } from './UploadImageButton';

export function UploadImageList() {
  const { postImageList } = useCreatePostForm();
  return (
    <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide ">
      <UploadImageButton />
      {postImageList?.map(
        ({ thumbNail, active }, idx) =>
          active && <UploadImage key={`key${idx}`} src={thumbNail} id={idx} />
      )}
    </div>
  );
}
