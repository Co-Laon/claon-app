import { AppBar } from 'climbingweb/src/components/common/AppBar';
import CenterResultList from 'climbingweb/src/components/common/CenterResult/CenterResultList';
import {
  AppLogo,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { useGetCenterList } from 'climbingweb/src/hooks/queries/center/useGetCenterList';

export default function CenterPage({}) {
  //새로운 세팅 리스트 useQuery state
  const {
    isLoading: isNewSettingLoading,
    data: newSettingData,
    isError: isNewSettingError,
    error: newSettingError,
  } = useGetCenterList('new_setting');
  //즐겨찾는 암장 리스트 useQuery state
  const {
    isLoading: isBookmarkLoading,
    data: bookmarkData,
    isError: isBookmarkError,
    error: bookmarkError,
  } = useGetCenterList('bookmark');
  //새로운 암장 리스트 useQuery state
  const {
    isLoading: isNewlyRegisteredLoading,
    data: newlyRegisteredData,
    isError: isNewlyRegisteredError,
    error: newlyRegisteredError,
  } = useGetCenterList('newly_registered');

  return (
    <section className="mb-footer">
      <AppBar leftNode={<AppLogo />} title=" " rightNode={<Empty />} />
      <div className="pl-4 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-extrabold leading-6">{'새로운 세팅'}</h2>
          {isNewSettingLoading ? (
            <div>로딩 중</div>
          ) : isNewSettingError ? (
            <div>{newSettingError}</div>
          ) : newSettingData ? (
            <CenterResultList centerList={newSettingData.results} />
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-extrabold leading-6">
            {'즐겨찾는 암장'}
          </h2>
          {isBookmarkLoading ? (
            <div>로딩 중</div>
          ) : isBookmarkError ? (
            <div>{bookmarkError}</div>
          ) : bookmarkData ? (
            <CenterResultList centerList={bookmarkData.results} />
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-extrabold leading-6">{'새로운 암장'}</h2>
          {isNewlyRegisteredLoading ? (
            <div>로딩 중</div>
          ) : isNewlyRegisteredError ? (
            <div>{newlyRegisteredError}</div>
          ) : newlyRegisteredData ? (
            <CenterResultList centerList={newlyRegisteredData.results} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
