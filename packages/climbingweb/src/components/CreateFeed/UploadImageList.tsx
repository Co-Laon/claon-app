import { UploadImage } from './UploadImage';
import { UploadImageButton } from './UploadImageButton';


interface ListProps {
    imageList: string[];
}

export function UploadImageList({ imageList }: ListProps) {

    return (
        <div className='w-full flex flex-row gap-2'>
            <UploadImageButton />
            {imageList?.map(image => <UploadImage key='' src={image} />)}
        </div>
    );
}