import ArrowBack from 'climbingweb/src/assets/icon/ic_24_appbar_back_gray800.svg';
import Image from 'next/image';

interface Props {
    title: string;
}

export function AppBar({ title }: Props) {

    return (
        <div className='flex flex-row justify-between p-4'>
            <Image src={ArrowBack} alt="back" />
            <h1>{title}</h1>
            <div className='w-6 h-6' />
        </div>
    );
}