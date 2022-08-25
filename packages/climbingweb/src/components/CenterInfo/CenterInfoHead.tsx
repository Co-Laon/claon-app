import TelIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_tel_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_instagram.svg';
import WebIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_web_gray800.svg';
import YoutubeIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_youtube.svg';
import Image from 'next/image';

interface HeadProps {
    title: string;
    address: string;
}

export const CenterInfoHead = ({ title, address }: HeadProps) => {

    return <div>
        <h2 className='text-lg font-extrabold leading-6'>{title}</h2>
        <p className='text-sm'>{address}</p>
        <div className='w-full flex flex-row'>
            <div className='w-3/12 rounded-l-lg border flex items-center justify-center p-1.5'><Image src={TelIcon} alt='tel' /></div>
            <div className='w-3/12 border flex items-center justify-center p-1.5'><Image src={WebIcon} alt='web' /></div>
            <div className='w-3/12 border flex items-center justify-center p-1.5'><Image src={InstaIcon} alt='insta' /></div>
            <div className='w-3/12 rounded-r-lg border flex items-center justify-center p-1.5'><Image src={YoutubeIcon} alt='youtube' /></div>
        </div>
    </div>;
};