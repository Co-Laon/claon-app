import { AppBar } from 'climbingweb/src/components/common/AppBar';
import CenterResultList from 'climbingweb/src/components/common/CenterResult/CenterResultList';
import {
  AppLogo,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import EmptyContent from 'climbingweb/src/components/common/EmptyContent/EmptyContent';
import { useGetCenterList } from 'climbingweb/src/hooks/queries/center/queryKey';

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

  if (isNewSettingError) return <ErrorContent error={newSettingError} />;
  if (isBookmarkError) return <ErrorContent error={bookmarkError} />;
  if (isNewlyRegisteredError)
    return <ErrorContent error={newlyRegisteredError} />;

  if (newSettingData && bookmarkData && newlyRegisteredData)
    return (
      <section className="mb-footer">
        <AppBar
          leftNode={<AppLogo />}
          title=" "
          rightNode={<Empty />}
          className="h-[7.82vh] pl-[20px]"
        />
        <div className="pl-4 flex flex-col gap-[23px] pt-[13px]">
          <div className="flex flex-col gap-[13px]">
            <h2 className="text-base font-bold ">{'새로운 세팅'}</h2>
            {isNewSettingLoading ? (
              <Loading />
            ) : newSettingData.totalCount !== 0 ? (
              <CenterResultList centerList={newSettingData.results} />
            ) : (
              <EmptyContent message="새로운 세팅을 한 암장이 없습니다." />
            )}
          </div>
          <div className="flex flex-col gap-[13px]">
            <h2 className="text-base font-bold ">{'즐겨찾는 암장'}</h2>
            {isBookmarkLoading ? (
              <Loading />
            ) : bookmarkData.totalCount !== 0 ? (
              <CenterResultList centerList={bookmarkData.results} />
            ) : (
              <EmptyContent message="즐겨찾기 한 암장이 없습니다." />
            )}
          </div>
          <div className="flex flex-col gap-[13px]">
            <h2 className="text-base font-bold ">{'새로운 암장'}</h2>
            {isNewlyRegisteredLoading ? (
              <Loading />
            ) : newlyRegisteredData.totalCount !== 0 ? (
              <CenterResultList centerList={newlyRegisteredData.results} />
            ) : (
              <EmptyContent message="새로운 암장이 없습니다." />
            )}
          </div>
        </div>
      </section>
    );

  return <Loading />;
}
