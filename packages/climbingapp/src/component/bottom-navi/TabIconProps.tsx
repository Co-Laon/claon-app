import React from 'react';
import HomeLogo from '../../assets/icon/bottom_navi/ic_24_navi_home_gray400.svg';
import HomeClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_home_purple500.svg';
import MapLogo from '../../assets/icon/bottom_navi/ic_24_navi_map_gray400.svg';
import MapClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_map_purple500.svg';
import MyLogo from '../../assets/icon/bottom_navi/ic_24_navi_my_gray400.svg';
import MyClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_my_purple500.svg';
import SearchLogo from '../../assets/icon/bottom_navi/ic_24_navi_search_gray400.svg';
import SearchClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_search_purple500.svg';


export const tabIcons = {
    icons: [
        {
            id: 1,
            name: '홈',
            focused: <HomeClickedLogo />,
            default: <HomeLogo />,
        },
        {
            id: 2,
            name: '검색',
            focused: <SearchClickedLogo />,
            default: <SearchLogo />,
        },
        {
            id: 3,
            name: '암장',
            focused: <MapClickedLogo />,
            default: <MapLogo />,
        },
        {
            id: 4,
            name: '마이',
            focused: <MyClickedLogo />,
            default: <MyLogo />,
        },
    ],
};