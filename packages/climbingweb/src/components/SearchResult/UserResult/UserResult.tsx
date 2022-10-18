import { useCreateLaon } from 'climbingweb/src/hooks/queries/laon-controller/useCreateLaon';
import Image from 'next/image';
import React from 'react';

interface UserProps {
  imagePath: string;
  isLaon: boolean;
  nickname: string;
}

/**
 * search 페이지에서 라온 검색 결과를 보여주는 컴포넌트
 * 라온 버튼 클릭 시, 라온 추가 신청이 된다.
 */
const UserResult = ({ imagePath, isLaon, nickname }: UserProps) => {
  //라온 신청 mutation
  const {
    mutate: createLaonMutate,
    isSuccess: createLaonIsSuccess,
    isError: createLaonIsError,
    error: createLaonError,
  } = useCreateLaon(nickname);

  // 라온 신청 버튼 클릭 핸들링 함수
  const handleRaonButtonClick = () => {
    createLaonMutate();
    if (createLaonIsSuccess) {
      alert('라온 신청 완료');
    } else if (createLaonIsError) {
      alert(createLaonError);
    }
  };
  return (
    <div className="relative flex flex-col items-center text-center w-[75px] h-[110px] rounded-[4px] border-gray-400 border-2 text-[8px] p-1">
      <Image
        className="rounded-full"
        src={imagePath}
        alt={'raonImage'}
        width={'45px'}
        height={'45px'}
      />
      {nickname}
      <button
        className="absolute bg-purple-500 text-center bottom-0 my-[6px] w-[36px] h-[16px] rounded-full text-white"
        onClick={handleRaonButtonClick}
        disabled={isLaon}
      >
        라온
      </button>
    </div>
  );
};

export default UserResult;
