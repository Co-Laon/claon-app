import TelIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_tel_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_instagram.svg';
import WebIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_web_gray800.svg';
import YoutubeIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_youtube.svg';
import PinIcon from 'climbingweb/src/assets/icon/ic_18_pin_gray600.svg';

interface HeadProps {
  title: string;
  address: string;
}

export const CenterInfoHead = ({ title, address }: HeadProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-extrabold leading-6 mb-3">{title}</h2>
      <p className="text-sm flex items-center">
        <PinIcon />
        {address}
      </p>
      <div className="w-full flex flex-row px-1 pt-5">
        <div className="w-3/12 rounded-l-lg border flex items-center justify-center p-1.5">
          <TelIcon />
        </div>
        <div className="w-3/12 border flex items-center justify-center p-1.5">
          <WebIcon />
        </div>
        <div className="w-3/12 border flex items-center justify-center p-1.5">
          <InstaIcon />
        </div>
        <div className="w-3/12 rounded-r-lg border flex items-center justify-center p-1.5">
          <YoutubeIcon />
        </div>
      </div>
    </div>
  );
};
