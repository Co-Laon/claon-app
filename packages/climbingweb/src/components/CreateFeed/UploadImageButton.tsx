import UploadIcon from 'climbingweb/src/assets/icon/createFeed/ic_24_photo_gray800.svg';
import Image from 'next/image';

interface ButtonProps {
    onClick?: any;
    count?: string;
    media?: any;
    setMedia?: any;
}

export function UploadImageButton({ media, setMedia }: ButtonProps) {

    const count = media.length;
    const maxCount = 10;

    const handleUploadFile = (e: any) => {

        if (count < maxCount) {
            const files: File[] = Array.from(e.target.files);
            console.log(files);
            files.map(file => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64 = reader.result;
                    console.log('base64: ', base64);
                    if (base64) {
                        setMedia((originMedia: string[]) => [...originMedia, base64.toString()]);
                    }
                };
            });
        } else {
            alert('초과했습니다.');
        }

    };

    return (
        <label htmlFor='upload' className='rounded-lg border border-solid h-20 w-20 min-w-20 border-[#E6E6E6] flex items-center justify-center'>
            <input id='upload' type='file' name='uploadImage' className='hidden' onChange={handleUploadFile} accept='images/*|videos/*' multiple />
            <div className='items-center flex flex-col'>
                <Image src={UploadIcon} alt='upload' />
                <div>
                    <span className='text-[#5953FF]'>{count ? count : 0}</span><span> / {maxCount}</span>
                </div>
            </div>
        </label>
    );
}