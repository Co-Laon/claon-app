import TelIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_tel_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_instagram.svg';
import WebIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_web_gray800.svg';
import YoutubeIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_youtube.svg';
import PinIcon from 'climbingweb/src/assets/icon/ic_18_pin_gray600.svg';

interface HeadProps {
  name: string;
  address: string;
  tel: string;
  instagramUrl: string;
  webUrl: string;
  youtubeUrl: string;
}

export const CenterInfoHead = ({
  name,
  address,
  tel,
  instagramUrl,
  webUrl,
  youtubeUrl,
}: HeadProps) => {
  //pinIcon click 핸들러
  const handlePinIconClick = () => {
    console.dir(address);
  };
  //telIcon click 핸들러
  const handleTelIconClick = () => {
    console.dir(tel);
  };
  //webIcon click 핸들러
  const handleWebIconClick = () => {
    console.dir(webUrl);
  };
  //instaIcon click 핸들러
  const handleInstaIconClick = () => {
    console.dir(instagramUrl);
  };
  //youtubeIcon click핸들러
  const handleYoutubeIconClick = () => {
    console.dir(youtubeUrl);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-extrabold leading-6 mb-3">{name}</h2>
      <p className="text-sm flex items-center">
        <PinIcon onClick={handlePinIconClick} />
        {address}
      </p>
      <div className="w-full flex flex-row px-1 pt-5">
        <div className="w-3/12 rounded-l-lg border flex items-center justify-center p-1.5">
          <TelIcon onClick={handleTelIconClick} />
        </div>
        <div className="w-3/12 border flex items-center justify-center p-1.5">
          <WebIcon onClick={handleWebIconClick} />
        </div>
        <div className="w-3/12 border flex items-center justify-center p-1.5">
          <InstaIcon onClick={handleInstaIconClick} />
        </div>
        <div className="w-3/12 rounded-r-lg border flex items-center justify-center p-1.5">
          <YoutubeIcon onClick={handleYoutubeIconClick} />
        </div>
      </div>
    </div>
  );
};
