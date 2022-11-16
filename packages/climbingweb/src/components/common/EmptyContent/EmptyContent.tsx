import React from 'react';

interface EmptyContentProps {
  message: string;
}

// 데이터가 없을 때 사용하는 공통 empty 컴포넌트, message를 받아서 empty 메시지를 띄워준다.
const EmptyContent = ({ message }: EmptyContentProps) => (
  <div className="w-full text-center leading-[10]">{message}</div>
);

export default EmptyContent;
