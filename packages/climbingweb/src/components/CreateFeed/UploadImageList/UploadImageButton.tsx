import UploadIcon from 'climbingweb/src/assets/icon/createFeed/ic_24_photo_gray800.svg';
import { useCreatePostForm } from 'climbingweb/src/hooks/useCreatePostForm';
const MAX_COUNT = 10;

export function UploadImageButton() {
  const { postImageList, selectImageList } = useCreatePostForm();
  const count = postImageList.length;

  const handleUploadFile = (e: any) => {
    const files: File[] = Array.from(e.target.files);
    selectImageList(files);
  };

  return (
    <label
      htmlFor="upload"
      className="rounded-lg border border-solid h-[72px] w-[72px] min-w-[72px] border-[#E6E6E6] flex items-center justify-center"
    >
      <input
        id="upload"
        type="file"
        name="uploadImage"
        className="hidden"
        onChange={handleUploadFile}
        accept="images/*|videos/*"
        multiple
      />
      <div className="items-center flex flex-col">
        <UploadIcon alt="upload" />
        <div className="text-[12px] leading-[18px] font-medium">
          <span className="text-[#5953FF]">{count ? count : 0}</span>
          <span> / {MAX_COUNT}</span>
        </div>
      </div>
    </label>
  );
}
