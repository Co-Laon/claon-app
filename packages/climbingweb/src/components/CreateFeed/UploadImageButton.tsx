import UploadIcon from 'climbingweb/src/assets/icon/createFeed/ic_24_photo_gray800.svg';
import Image from 'next/image';

interface ButtonProps {
    onClick?: any;
    count?: string;
}

export function UploadImageButton({ onClick, count }: ButtonProps) {
    const maxCount = 10;

    return (
        <div className='rounded-lg border border-solid h-20 w-20 border-[#E6E6E6] flex items-center justify-center' onClick={onClick}>
            <div className='items-center flex flex-col'>
                <Image src={UploadIcon} alt='upload' />
                <div>
                    <span className='text-[#5953FF]'>{count ? count : 0}</span><span> / {maxCount}</span>
                </div>
            </div>
        </div>
    );
}