import React from 'react';
import HomeLogo from '../../assets/icon/bottom_navi/ic_24_navi_home_gray400.svg';
import HomeClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_home_purple500.svg';
import BoardLogo from '../../assets/icon/bottom_navi/ic_24_navi_board_gray400.svg';
import BoardClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_board_purple500.svg';
import CrewLogo from '../../assets/icon/bottom_navi/ic_24_navi_crew_gray400.svg';
import CrewClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_crew_purple500.svg';
import MapLogo from '../../assets/icon/bottom_navi/ic_24_navi_map_gray400.svg';
import MapClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_map_purple500.svg';
import MyLogo from '../../assets/icon/bottom_navi/ic_24_navi_my_gray400.svg';
import MyClickedLogo from '../../assets/icon/bottom_navi/ic_24_navi_my_purple500.svg';

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
            name: '게시판',
            focused: <BoardClickedLogo />,
            default: <BoardLogo />,
        },
        {
            id: 3,
            name: '크루',
            focused: <CrewClickedLogo />,
            default: <CrewLogo />,
        },
        {
            id: 4,
            name: '지도',
            focused: <MapClickedLogo />,
            default: <MapLogo />,
        },
        {
            id: 5,
            name: '마이',
            focused: <MyClickedLogo />,
            default: <MyLogo />,
        },
    ],
};