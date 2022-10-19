import ArrowBack from 'climbingweb/src/assets/icon/ic_24_appbar_back_gray800.svg';
import Pencil from 'climbingweb/src/assets/icon/ic_24_pencil_gray800.svg';
import Logo from 'climbingweb/src/assets/icon/appbar_logo.svg';
import Setting from 'climbingweb/src/assets/icon/ic_24_setting_gray_800.svg';
import BookMarkWhite from 'climbingweb/src/assets/icon/ic_24_bookmark_white.svg';
import BookMarkYellow from 'climbingweb/src/assets/icon/ic_24_bookmark_yellow.svg';
import Option from 'climbingweb/src/assets/icon/ic_24_option_gray800.svg';
import { useRouter } from 'next/router';

interface ButtonProps {
  onClick?: ({}: any) => void;
}

interface BookMark extends ButtonProps {
  isBookMarked?: boolean;
}

export const BackButton = ({ onClick }: ButtonProps) => {
  return <ArrowBack onClick={onClick} alt="back" />;
};

export const ModifiedButton = ({ onClick }: ButtonProps) => {
  return <Pencil onClick={onClick} alt="modified" />;
};

export const AppLogo = () => {
  const router = useRouter();
  const handleLogoTouch = () => {
    router.push('/');
  };
  return <Logo onClick={handleLogoTouch} alt="logo" />;
};

export const SettingButton = ({ onClick }: ButtonProps) => {
  return <Setting onClick={onClick} alt="setting" />;
};

export const BookMarkButton = ({ onClick, isBookMarked }: BookMark) => {
  return isBookMarked ? (
    <BookMarkYellow onClick={onClick} />
  ) : (
    <BookMarkWhite onClick={onClick} alt="bookmark" />
  );
};

export const OptionButton = ({ onClick }: ButtonProps) => {
  return <Option onClick={onClick} alt="option" />;
};

export const Empty = () => {
  return <div className="w-6 h-6" />;
};
