import Image from 'next/image';
import { LaonProps } from './type';

export const LaonItem = ({ laonNickName, laonProfileImage, rightNode }: LaonProps) => {


    return (
        <li className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
                <div className='h-10 w-10 relative'>
                    <Image className='rounded-full' layout='fill' objectFit='cover' src={laonProfileImage} alt='laonProfileImage' />
                </div>
                <p className='text-sm font-bold'>{laonNickName}</p>
            </div>
            {rightNode}
        </li>
    );
};