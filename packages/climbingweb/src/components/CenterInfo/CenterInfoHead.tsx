import TelIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_tel_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_instagram.svg';
import WebIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_web_gray800.svg';
import YoutubeIcon from 'climbingweb/src/assets/icon/center_channel/ic_24_youtube.svg';
import PinIcon from 'climbingweb/src/assets/icon/ic_18_pin_gray600.svg';
import { sendReactNativeMessage } from 'climbingweb/src/utils/reactNativeMessage';
import { StarButton } from '../common/AppBar/IconButton';
import {
  useCreateCenterBookmark,
  useDeleteCenterBookmark,
} from 'climbingweb/src/hooks/queries/center/queryKey';
import { useCallback } from 'react';

interface HeadProps {
  name: string;
  address: string;
  tel?: string;
  instagramUrl?: string;
  webUrl?: string;
  youtubeUrl?: string;
  isBookMarked: boolean;
  centerId: string;
}

export const CenterInfoHead = ({
  name,
  address,
  tel,
  instagramUrl,
  webUrl,
  youtubeUrl,
  isBookMarked,
  centerId,
}: HeadProps) => {
  const sendLinkToRN = (link: string) => {
    sendReactNativeMessage({ type: 'link', payload: link });
  };

  //pinIcon click 핸들러
  const handlePinIconClick = () => {
    console.dir(address);
  };
  //telIcon click 핸들러
  const handleTelIconClick = () => {
    sendLinkToRN(`tel:${tel}`);
  };
  //webIcon click 핸들러
  const handleWebIconClick = () => {
    sendLinkToRN(`${webUrl}`);
  };
  //instaIcon click 핸들러
  const handleInstaIconClick = () => {
    sendLinkToRN(`${instagramUrl}`);
  };
  //youtubeIcon click핸들러
  const handleYoutubeIconClick = () => {
    sendLinkToRN(`${youtubeUrl}`);
  };

  //암장 즐겨찾기 useMutation
  const { mutate: createCenterBookmarkMutate } =
    useCreateCenterBookmark(centerId);

  //암장 즐겨찾기 취소 useMutation
  const { mutate: deleteCenterBookmarkMutate } =
    useDeleteCenterBookmark(centerId);

  //암장 즐겨찾기 아이콘 클릭 핸들러
  const handleLikeIconClick = useCallback(() => {
    if (isBookMarked) {
      deleteCenterBookmarkMutate();
    } else {
      createCenterBookmarkMutate();
    }
  }, [isBookMarked, deleteCenterBookmarkMutate, createCenterBookmarkMutate]);

  return (
    <div className="p-[18px] pt-[3px]">
      <div className="flex items-center gap-[5px]">
        <StarButton onClick={handleLikeIconClick} isBookMarked={isBookMarked} />
        <h2 className="text-base font-extrabold ">{name}</h2>
      </div>
      <p className="text-sm flex items-center">
        <PinIcon onClick={handlePinIconClick} />
        {address}
      </p>
      <div className="w-full rounded-lg border flex flex-row justify-evenly mx-1 mt-5">
        {tel ? (
          <div className="w-full my-1 border-x flex items-center justify-center p-1.5">
            <TelIcon onClick={handleTelIconClick} />
          </div>
        ) : null}
        {webUrl ? (
          <div className="w-full my-1 border-x flex items-center justify-center p-1.5">
            <WebIcon onClick={handleWebIconClick} />
          </div>
        ) : null}
        {instagramUrl ? (
          <div className="w-full my-1 border-x flex items-center justify-center p-1.5">
            <InstaIcon onClick={handleInstaIconClick} />
          </div>
        ) : null}
        {youtubeUrl ? (
          <div className="w-full my-1 border-x flex items-center justify-center p-1.5">
            <YoutubeIcon onClick={handleYoutubeIconClick} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
