import CenterResult from 'climbingweb/src/components/common/CenterResult/CenterResult';
import { Input } from 'climbingweb/src/components/common/Input';
import UserResult from 'climbingweb/src/components/SearchResult/UserResult/UserResult';
import React from 'react';
import { useState } from 'react';
import SearchIcon from 'climbingweb/src/assets/icon/ic_24_search_gray800.svg';
import { useSearchUser } from 'climbingweb/src/hooks/queries/user/useSearchUser';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppLogo } from 'climbingweb/src/components/common/AppBar/IconButton';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import { useSearchCenter } from 'climbingweb/src/hooks/queries/center/queryKey';

const SearchPage = () => {
  //search input value state
  const [inputValue, setInputValue] = useState<string>('');

  //search 유저 결과 state
  const {
    isLoading: isUserDataListLoading,
    data: userDataList,
    isError: isUserDataListError,
    error: userDataListError,
  } = useSearchUser(inputValue);

  //search 암장 결과 state
  const {
    isLoading: isCenterDataListLoading,
    data: centerDataList,
    isError: isCenterDataListError,
    error: centerDataListError,
  } = useSearchCenter(inputValue);

  return (
    <div className="w-full flex flex-col item-center 'mb-footer overflow-auto scrollbar-hide'">
      <AppBar leftNode={<AppLogo />} />
      <div className="px-5">
        <Input
          value={inputValue}
          onChange={setInputValue}
          leftNode={<SearchIcon />}
        />
      </div>
      {isCenterDataListLoading ? (
        <Loading />
      ) : isCenterDataListError ? (
        <ErrorContent error={centerDataListError} />
      ) : centerDataList !== undefined &&
        centerDataList.results.length !== 0 ? (
        <div className="flex flex-col ml-5 mt-5">
          <span className="mb-3">암장</span>
          <div className="flex 'mb-footer overflow-auto scrollbar-hide'">
            {centerDataList.results.map((value, index) => (
              <CenterResult
                key={`CenterResult${index}`}
                reviewRank={value.reviewRank}
                thumbnailUrl={value.thumbnailUrl}
                name={value.name}
                id={value.id}
              />
            ))}
          </div>
        </div>
      ) : null}
      {centerDataList !== undefined &&
      centerDataList.results.length !== 0 &&
      userDataList !== undefined &&
      userDataList.results.length !== 0 ? (
        <div className="bg-gray-400 w-full h-[1px] mx-[20px] my-3"></div>
      ) : null}
      {isUserDataListLoading ? (
        <Loading />
      ) : isUserDataListError ? (
        <ErrorContent error={userDataListError} />
      ) : userDataList !== undefined && userDataList.results.length !== 0 ? (
        <div className="flex flex-col ml-2 mt-5">
          <span className="mb-3">라온</span>
          <div className="flex mb-footer overflow-auto scrollbar-hide">
            {userDataList.results.map((value, index) => (
              <UserResult
                key={`RaonResult${index}`}
                imagePath={value.imagePath}
                isLaon={value.isLaon}
                nickname={value.nickname}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
