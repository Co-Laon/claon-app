import VersionLogo from 'climbingweb/src/assets/version_logo.svg';
import { NormalButton } from '../common/button/Button';

export const VersionInfo = () => {
  return (
    <div className="h-screen overscroll-none w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <VersionLogo alt="version_logo" />
        <p>현재버전: {'1.0.0'}</p>
        <p>최신버전: {'1.0.0'}</p>
        <NormalButton>업데이트</NormalButton>
      </div>
    </div>
  );
};
