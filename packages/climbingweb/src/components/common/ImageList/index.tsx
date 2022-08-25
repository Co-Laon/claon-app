import Image from 'next/image';

interface ListProps {
    imageList?: string[];
}

export const ImageList = ({ imageList }: ListProps) => {

    return <div className='w-full h-30'>
        {imageList?.map(image => <Image key={image} className='w-5/12 h-full' src={image} alt={image} />)}
    </div>;
};