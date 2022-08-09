import React from 'react';
import SearchIcon from 'climbingweb/src/assets/icon/ic_24_search_gray800.svg';
import Image from 'next/image';

const SearchBar = () => (
  <div className="flex items-start p-0 gap-2 w-full h-[30px] border-gray-300 border-2 rounded-md m-5">
    <button className="mx-4">
      <Image src={SearchIcon} alt="searchIcon" />
    </button>
    <input className="w-[256px] h-full hover:" type={'search'} />
  </div>
);

export default SearchBar;
