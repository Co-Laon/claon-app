import CenterResult from 'climbingweb/src/components/common/CenterResult/CenterResult';
import { Input } from 'climbingweb/src/components/common/Input';
import UserResult from 'climbingweb/src/components/SearchResult/UserResult/UserResult';
import { useBTSheet } from 'climbingweb/src/hooks/useBtSheet';
import React from 'react';
import { useState } from 'react';
import SearchIcon from 'climbingweb/src/assets/icon/ic_24_search_gray800.svg';
import { useSearchCenter } from 'climbingweb/src/hooks/queries/center/useSearchCenter';
import { useSearchUser } from 'climbingweb/src/hooks/queries/user/useSearchUser';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppLogo } from 'climbingweb/src/components/common/AppBar/IconButton';

const SearchPage = () => {
  const { renderSheet } = useBTSheet();
  //search input value state
  const [inputValue, setInputValue] = useState<string>('');

  //search 유저 결과 state
  const {
    isLoading: isUserListLoading,
    data: userData,
    isError: isUserListError,
  } = useSearchUser(inputValue);

  //search 암장 결과 state
  const {
    isLoading: isCenterListLoading,
    data: centerData,
    isError: isCenterListError,
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
      {isCenterListLoading ? (
        <div>로딩 중</div>
      ) : isCenterListError ? (
        <div>에러</div>
      ) : centerData !== undefined && centerData.results.length !== 0 ? (
        <div className="flex flex-col ml-5 mt-5">
          <span className="mb-3">암장</span>
          <div className="flex 'mb-footer overflow-auto scrollbar-hide'">
            {centerData.results.map((value, index) => (
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
      {centerData !== undefined &&
      centerData.results.length !== 0 &&
      userData !== undefined &&
      userData.results.length !== 0 ? (
        <div className="bg-gray-400 w-full h-[1px] mx-[20px] my-3"></div>
      ) : null}
      {isUserListLoading ? (
        <div>로딩 중</div>
      ) : isUserListError ? (
        <div>에러</div>
      ) : userData !== undefined && userData.results.length !== 0 ? (
        <div className="flex flex-col ml-5 mt-5">
          <span className="mb-3">라온</span>
          <div className="flex 'mb-footer overflow-auto scrollbar-hide'">
            {userData.results.map((value, index) => (
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
      {renderSheet()}
    </div>
  );
};

export default SearchPage;
