import HomeLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_home_gray400.svg';
import HomeActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_home_purple500.svg';
import MapLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_map_gray400.svg';
import MapActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_map_purple500.svg';
import MyLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_my_gray400.svg';
import MyActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_my_purple500.svg';
import SearchLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_search_gray400.svg';
import SearchActivedLogo from 'climbingweb/src/assets/icon/bottom_navi/ic_24_navi_search_purple500.svg';

const navButtons = [
  {
    label: '홈',
    path: '/',
    icon: <HomeLogo alt="home" />,
    activedIcon: <HomeActivedLogo alt="home-actived" />,
  },
  {
    label: '검색',
    path: '/search',
    icon: <SearchLogo alt="search" />,
    activedIcon: <SearchActivedLogo alt="search-actived" />,
  },
  {
    label: '암장',
    path: '/center',
    icon: <MapLogo alt="center" />,
    activedIcon: <MapActivedLogo alt="center-actived" />,
  },
  {
    label: '마이',
    path: '/my',
    icon: <MyLogo alt="setting" />,
    activedIcon: <MyActivedLogo alt="setting-actived" />,
  },
];

export default navButtons;
