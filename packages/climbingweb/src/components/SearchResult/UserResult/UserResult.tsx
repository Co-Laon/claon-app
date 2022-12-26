import { useCreateLaon } from 'climbingweb/src/hooks/queries/laon/queryKey';
import { useRouter } from 'next/router';
import React from 'react';
import { ProfileImage } from '../../common/profileImage/ProfileImage';

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
  const router = useRouter();

  //라온 신청 mutation
  const { mutate: createLaonMutate } = useCreateLaon();

  // 라온 신청 버튼 클릭 핸들링 함수
  const handleRaonButtonClick = () => {
    createLaonMutate(nickname);
  };
  // 라온 검색 결과 클릭 핸들링 함수
  const handleUserResultClick = () => {
    router.push(`/users/name/${nickname}`);
  };
  return (
    <div className="relative flex flex-col mx-2 items-center text-center w-[75px] h-[110px] rounded-[4px] border-gray-400 border-2 text-[8px] p-1">
      <div onClick={handleUserResultClick}>
        <ProfileImage src={imagePath} size={45} />
        {nickname}
      </div>
      <button
        className="absolute bg-purple-500 text-center bottom-0 my-[6px] w-[36px] h-[16px] rounded-full text-white disabled:bg-slate-400"
        onClick={handleRaonButtonClick}
        disabled={isLaon}
      >
        라온
      </button>
    </div>
  );
};

export default UserResult;
