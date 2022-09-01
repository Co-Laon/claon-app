import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { DropDown } from '../common/DropDown';
import 'react-spring-bottom-sheet/dist/style.css';
import { AreaSheet } from '../common/BottomSheetContents/areaSheet/AreaSheet';
import { Input } from '../common/Input';
import { StringCount } from '../common/Input/StringCount';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { NormalButton, SmmallNodeButton } from '../common/button/Button';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import Image from 'next/image';


interface InfoProps {
  instagramId?: string;
}

export const EditMyInfo = ({ instagramId }: InfoProps) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [areaList, setAreaList] = useState<string[]>(['']);
  const basicLocalActiveAreaHeader = '시.도 선택';
  const metropolitanActiveAreaHeader = '시.군.구 선택';
  const basicLocalActiveAreaList = ['서울 특별시'];
  const metropolitanActiveAreaList = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
  ];

  const onDismiss = () => setSheetOpen(false);
  const onBasicAreaChoiced = () => {
    setHeaderTitle(basicLocalActiveAreaHeader);
    setAreaList(basicLocalActiveAreaList);
    setSheetOpen(true);
  };
  const onMetropolitanAreaChoiced = () => {
    setHeaderTitle(metropolitanActiveAreaHeader);
    setAreaList(metropolitanActiveAreaList);
    setSheetOpen(true);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">프로필 사진</h2>
        <ProfileImage icon="default" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">닉네임</h2>
        <Input rightNode={<StringCount maxCount={20} count={1} />} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">주요 활동 지역</h2>
        <div className="flex flex-row">
          <DropDown onSheetOpen={onBasicAreaChoiced} />
          <DropDown onSheetOpen={onMetropolitanAreaChoiced} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-gray-800">인스타그램 계정</h2>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center font-bold gap-1'>
            <Image src={InstaIcon} alt='instagram' />
            {instagramId}
          </div>
          <SmmallNodeButton>변경</SmmallNodeButton>
        </div>
      </div>
      <div className="bottom-0">
        <NormalButton>수정</NormalButton>
      </div>
      {/*bottomSheet  */}
      <BottomSheet
        open={sheetOpen}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight}
      >
        <AreaSheet headerTitle={headerTitle} areaList={areaList} />
      </BottomSheet>
    </div>
  );
};
