import { useState } from 'react';
import { UploadImage } from './UploadImage';
import { UploadImageButton } from './UploadImageButton';

export function UploadImageList() {

    const [mediaBase64, setMediaBase64] = useState<string[]>([]);
    return (
        <div className='w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide'>
            <UploadImageButton media={mediaBase64} setMedia={setMediaBase64} />
            {mediaBase64?.map(image => <UploadImage key='' src={image} />)}
        </div>
    );
}