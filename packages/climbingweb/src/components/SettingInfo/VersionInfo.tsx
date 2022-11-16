import VersionLogo from 'climbingweb/src/assets/version_logo.svg';
import { useGetAppVersion } from 'climbingweb/src/hooks/queries/user/useGetAppVersion';
import { NormalButton } from '../common/button/Button';
import ErrorContent from '../common/Error/ErrorContent';
import Loading from '../common/Loading/Loading';

export const VersionInfo = () => {
  // appVersion server state
  const {
    data: appVersionData,
    isError: isAppVersionError,
    error: appVersionError,
  } = useGetAppVersion('aos');

  // appVersion client state
  const clientAppVersion = '1.0.0';

  if (isAppVersionError) return <ErrorContent error={appVersionError} />;

  if (appVersionData)
    return (
      <div className="h-screen overscroll-none w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <VersionLogo alt="version_logo" />
          <p>현재버전: {clientAppVersion}</p>
          <p>최신버전: {appVersionData.version}</p>
          <NormalButton disabled={clientAppVersion === appVersionData.version}>
            업데이트
          </NormalButton>
        </div>
      </div>
    );

  return <Loading />;
};
