import Image from 'next/image';
import CameraIcon from 'climbingweb/src/assets/icon/ic_24_camera_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import ProfileSkeleton from 'climbingweb/src/assets/icon/ic_72_profile_gray400.svg';
import LockSvg from 'climbingweb/src/assets/icon/LockSvg';

interface ProfileProps {
  src?: string;
  icon?: 'default' | 'insta';
  onClickIcon?: () => void;
  size?: number;
  isPrivate?: boolean;
  className?: string;
  isMyPage?: boolean;
}

export const ProfileImage = ({
  src,
  icon,
  onClickIcon,
  size,
  className,
  isPrivate,
  isMyPage,
}: ProfileProps) => {
  return (
    <div className={`w-16 relative ${className}`}>
      <div className="w-15 h-15 rounded-xl relative flex items-center justify-center">
        {src ? (
          <Image
            className="relative rounded-full"
            src={src}
            alt="profile"
            height={size ? size : 40}
            width={size ? size : 40}
          />
        ) : (
          <ProfileSkeleton width={size ? size : 40} height={size ? size : 40} />
        )}
      </div>
      {isPrivate ? (
        isMyPage ? (
          <div className="absolute bottom-0 right-0">
            <LockSvg onClick={onClickIcon} />
          </div>
        ) : null
      ) : icon ? (
        icon == 'default' ? (
          <div className="absolute bottom-0 right-0">
            <CameraIcon alt="cameraIcon" onClick={onClickIcon} />
          </div>
        ) : (
          <div className="absolute bottom-0 right-0">
            <InstaIcon alt="instaIcon" onClick={onClickIcon} />
          </div>
        )
      ) : null}
    </div>
  );
};
