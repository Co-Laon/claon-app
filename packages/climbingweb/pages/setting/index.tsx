import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { BackButton, Empty } from 'climbingweb/src/components/common/IconButton';
import { useState } from 'react';
import { VersionInfo } from 'climbingweb/src/components/SettingInfo/VersionInfo';
import { SettingList } from 'climbingweb/src/components/SettingInfo/SettingList';

export default function SettingPage() {
    const titleList: string[] = ['프로필 비공개', '개인 정보 수정', '차단 리스트', '공지 사항', '버전 정보', '이용 약관', '개인정보 처리 방침', '로그아웃', '탈퇴하기'];
    const defaultTitle = '설정';
    const [titleName, setTitleName] = useState<string>(defaultTitle);
    const handleClick = (choice: string) => {
        if (choice !== 'titleName')
            setTitleName(choice);

    };
    const handleGoToBack = () => {
        setTitleName('설정');
    };

    return (
        <div className='h-screen flex flex-col'>
            <AppBar leftNode={<BackButton onClick={handleGoToBack} />} title={titleName} rightNode={<Empty />} />
            {titleName === '설정' && < SettingList titleList={titleList} onClick={e => handleClick(e.target.innerText)} />}
            {titleName === '프로필 비공개' && <>프로필비공개</>}
            {titleName === '개인 정보 수정' && <>개인 정보 수정</>}
            {titleName === '차단 리스트' && <>차단 리스트</>}
            {titleName === '공지 사항' && <>공지 사항</>}
            {titleName === '버전 정보' && <VersionInfo />}
            {titleName === '이용 약관' && <>이용 약관</>}
            {titleName === '개인정보 처리 방침' && <>개인정보 처리 방침</>}
        </div>
    );
}