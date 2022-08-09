import Image from 'next/image';
import ArrowBack from 'climbingweb/src/assets/icon/ic_24_appbar_back_gray800.svg';
import Pencil from 'climbingweb/src/assets/icon/ic_24_pencil_gray800.svg';
import Logo from 'climbingweb/src/assets/icon/appbar_logo.svg';
import Setting from 'climbingweb/src/assets/icon/ic_24_setting_gray_800.svg';
import BookMarkWhite from 'climbingweb/src/assets/icon/ic_24_bookmark_white.svg';
import BookMarkYellow from 'climbingweb/src/assets/icon/ic_24_bookmark_yellow.svg';
import Option from 'climbingweb/src/assets/icon/ic_24_option_gray800.svg';

interface ButtonProps {
    onClick?: ({ }: any) => void;
}

interface BookMark extends ButtonProps {
    isBookMarked?: boolean;
}

export const BackButton = ({ onClick }: ButtonProps) => {
    return < Image src={ArrowBack} onClick={onClick} alt="back" />;
};

export const ModifiedButton = ({ onClick }: ButtonProps) => {
    return < Image src={Pencil} onClick={onClick} alt="modified" />;
};

export const AppLogo = ({ onClick }: ButtonProps) => {
    return < Image src={Logo} onClick={onClick} alt="logo" />;
};

export const SettingButton = ({ onClick }: ButtonProps) => {
    return < Image src={Setting} onClick={onClick} alt="setting" />;
};

export const BookMarkButton = ({ onClick, isBookMarked }: BookMark) => {
    return < Image src={isBookMarked ? BookMarkYellow : BookMarkWhite} onClick={onClick} alt="bookmark" />;
};

export const OptionButton = ({ onClick }: ButtonProps) => {
    return < Image src={Option} onClick={onClick} alt="option" />;
};