import React from 'react';
import SearchIcon from 'climbingweb/src/assets/icon/ic_24_search_gray800.svg';
import Image from 'next/image';

const SearchBar = () => (
  <div className="flex justify-center items-start p-0 gap-2 w-[320px] h-[30px] border-gray-300 border-2 rounded-md">
    <button className="mx-2">
      <Image src={SearchIcon} alt="searchIcon" />
    </button>
    <input className="w-[256px] h-full hover:" type={'search'} />
  </div>
);

export default SearchBar;
