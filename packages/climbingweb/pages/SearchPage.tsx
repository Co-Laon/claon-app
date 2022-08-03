import CenterResult from 'climbingweb/src/components/SearchResult/CenterResult/CenterResult';
import RaonResult from 'climbingweb/src/components/SearchResult/RaonResult/RaonResult';
import SearchBar from 'climbingweb/src/components/SearchResult/SearchBar/SearchBar';
import React, { useEffect } from 'react';
import { useState } from 'react';

interface Center {
  name: string;
  image?: string;
  star: number;
}

interface Raon {
  name: string;
  image?: string;
}

const centerListExample = [
  { name: '더클라이밍 마곡', star: 4.5 },
  { name: '더클라이밍 홍대점', star: 4.5 },
];

const raonListExample = [
  { name: '더클라이밍 94' },
  { name: '더클라이밍 2' },
  { name: '더클라이밍 22' },
  { name: '더클라이밍 55' },
];

const SearchPage = () => {
  const [centerList, setCenterList] = useState<Center[]>([]);
  const [raonList, setRaonList] = useState<Raon[]>([]);
  useEffect(() => {
    setCenterList(centerListExample);
    setRaonList(raonListExample);
  }, []);
  return (
    <div className="w-full flex flex-col item-center">
      <SearchBar />
      <div className="flex flex-col ml-[20px]">
        <span className="mb-3">암장</span>
        <div className="flex">
          {centerList.map((value, index) => (
            <CenterResult
              key={`CenterResult${index}`}
              star={value.star}
              image={value.image}
              name={value.name}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-400 w-full h-[1px] mx-[20px] my-3"></div>
      <div className="flex flex-col ml-[20px]">
        <span className="mb-3">라온</span>
        <div className="flex">
          {raonList.map((value, index) => (
            <RaonResult key={`RaonResult${index}`} name={value.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
