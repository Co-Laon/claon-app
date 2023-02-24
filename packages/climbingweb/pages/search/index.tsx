import CenterResult from 'climbingweb/src/components/common/CenterResult/CenterResult';
import { Input } from 'climbingweb/src/components/common/Input';
import UserResult from 'climbingweb/src/components/SearchResult/UserResult/UserResult';
import React, { useCallback } from 'react';
import { useState } from 'react';
import SearchIcon from 'climbingweb/src/assets/icon/ic_24_search_gray800.svg';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { AppLogo } from 'climbingweb/src/components/common/AppBar/IconButton';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import { useSearchCenter } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useSearchUser } from 'climbingweb/src/hooks/queries/user/queryKey';
import { useIntersectionObserver } from 'climbingweb/src/hooks/useIntersectionObserver';

const SearchPage = () => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  //search input value state
  const [inputValue, setInputValue] = useState<string>('');

  //search 유저 결과 state
  const {
    isLoading: isSearchUserListLoading,
    data: searchUserList,
    isError: isSearchUserListError,
    error: searchUserError,
    fetchNextPage: fetchNextSearchUser,
    isFetchingNextPage: isFetchingSearchUser,
    hasNextPage: hasNextSearchUser,
  } = useSearchUser(inputValue);

  //search 암장 결과 state
  const {
    isLoading: isSearchCenterListLoading,
    data: searchCenterList,
    isError: isSearchCenterListError,
    error: searchCenterListError,
    fetchNextPage: fetchNextSearchCenter,
    isFetchingNextPage: isFetchingSearchCenter,
    hasNextPage: hasNextSearchCenter,
  } = useSearchCenter(inputValue);

  //search input value change handler
  const handleSearchInputChange = useCallback(() => {
    if (searchInputRef.current) {
      setInputValue(searchInputRef.current.value);
    }
  }, []);

  //intersect 핸들러
  const searchUserTarget = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextSearchUser) {
        fetchNextSearchUser();
      }
    },
    { threshold: 1 }
  );

  //intersect 핸들러
  const searchCenterTarget = useIntersectionObserver(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextSearchCenter) {
        fetchNextSearchCenter();
      }
    },
    { threshold: 1 }
  );

  console.dir(searchCenterList);

  return (
    <div className="w-full flex flex-col item-center 'mb-footer overflow-auto scrollbar-hide'">
      <AppBar leftNode={<AppLogo />} />
      <div className="px-5">
        <Input
          refObj={searchInputRef}
          onKeyDown={handleSearchInputChange}
          leftNode={<SearchIcon />}
        />
      </div>
      {isSearchCenterListLoading ? (
        <Loading />
      ) : isSearchCenterListError ? (
        <ErrorContent error={searchCenterListError} />
      ) : searchCenterList !== undefined &&
        searchCenterList.pages.length !== 0 ? (
        <div className="flex flex-col ml-5 mt-5">
          <span className="mb-3">암장</span>
          <div className="flex 'mb-footer overflow-auto scrollbar-hide'">
            {searchCenterList.pages.map((page) => {
              return page.results.map((value, index) => (
                <CenterResult
                  key={`CenterResult${index}`}
                  reviewRank={value.reviewRank}
                  thumbnailUrl={value.thumbnailUrl}
                  name={value.name}
                  id={value.id}
                />
              ));
            })}
            {!isFetchingSearchCenter ? (
              <div className="w-[1px]" ref={searchCenterTarget} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : null}
      {searchCenterList !== undefined &&
      searchCenterList.pages[0].results.length !== 0 &&
      searchUserList !== undefined &&
      searchUserList.pages[0].results.length !== 0 ? (
        <div className="bg-gray-400 w-full h-[1px] mx-[20px] my-3"></div>
      ) : null}
      {isSearchUserListLoading ? (
        <Loading />
      ) : isSearchUserListError ? (
        <ErrorContent error={searchUserError} />
      ) : searchUserList !== undefined && searchUserList.pages.length !== 0 ? (
        <div className="flex flex-col ml-2 mt-5">
          <span className="mb-3">라온</span>
          <div className="flex mb-footer overflow-auto scrollbar-hide">
            {searchUserList.pages.map((page) => {
              return page.results.map((value, index) => (
                <UserResult
                  key={`RaonResult${index}`}
                  imagePath={value.imagePath}
                  isLaon={value.isLaon}
                  nickname={value.nickname}
                />
              ));
            })}
            {!isFetchingSearchUser ? (
              <div className="w-[1px]" ref={searchUserTarget} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
