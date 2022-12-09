import Image from 'next/image';
import CameraIcon from 'climbingweb/src/assets/icon/ic_24_camera_gray800.svg';
import InstaIcon from 'climbingweb/src/assets/icon/ic_24_instagram.svg';
import ProfileSkeleton from 'climbingweb/src/assets/icon/ic_72_profile_gray400.svg';

interface ProfileProps {
  src?: string;
  icon?: 'default' | 'insta';
  onClickIcon?: () => void;
}

export const ProfileImage = ({ src, icon, onClickIcon }: ProfileProps) => {
  return (
    <div className="w-16 relative">
      <div className="w-15 h-15 rounded-xl relative">
        {src ? (
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              className="relative rounded-full"
              src={src}
              alt="profile"
              height={40}
              width={40}
            />
          </div>
        ) : (
          <ProfileSkeleton />
        )}
      </div>
      {icon ? (
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
