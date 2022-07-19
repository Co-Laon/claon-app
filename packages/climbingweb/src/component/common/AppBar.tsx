import ArrowBack from 'climbingweb/src/assets/icon/ic_24_appbar_back_gray800.svg';
import Image from 'next/image';

export function AppBar() {

    return (
        <div className='flex bg'>
            <Image src={ArrowBack} alt="back" />
            <h1>댓글</h1>
        </div>
    );
}