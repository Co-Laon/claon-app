import React from 'react';

interface EmptyContentProps {
  message: string;
}

// 데이터가 없을 때 사용하는 공통 empty 컴포넌트, message를 받아서 empty 메시지를 띄워준다.
const EmptyContent = ({ message }: EmptyContentProps) => (
  <div className="flex w-full justify-center items-center h-[16.7vh]">
    {message}
  </div>
);

export default EmptyContent;
