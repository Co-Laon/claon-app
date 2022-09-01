import HomeLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_home_gray400.svg';
import HomeActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_home_purple500.svg';
import MapLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_map_gray400.svg';
import MapActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_map_purple500.svg';
import MyLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_my_gray400.svg';
import MyActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_my_purple500.svg';
import SearchLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_search_gray400.svg';
import SearchActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_search_purple500.svg';
import Image from 'next/image';

const navButtons = [
  {
    label: '홈',
    path: '/',
    icon: <Image src={HomeLogo} alt="home" />,
    activedIcon: <Image src={HomeActivedLogo} alt="home-actived" />,
  },
  {
    label: '검색',
    path: '/search',
    icon: <Image src={SearchLogo} alt="search" />,
    activedIcon: <Image src={SearchActivedLogo} alt="search-actived" />,
  },
  {
    label: '암장',
    path: '/center',
    icon: <Image src={MapLogo} alt="center" />,
    activedIcon: <Image src={MapActivedLogo} alt="center-actived" />,
  },
  {
    label: '마이',
    path: '/my',
    icon: <Image src={MyLogo} alt="setting" />,
    activedIcon: <Image src={MyActivedLogo} alt="setting-actived" />,
  },
];

export default navButtons;
