import { ServerBusinessError, ServerError } from 'climbingweb/types/common';
import React from 'react';

interface ErrorContentProps {
  error: unknown;
}

// 공통 error 컴포넌트, 추후 변경 예정
const ErrorContent = ({ error }: ErrorContentProps) => {
  const target = error as ServerError | ServerBusinessError;
  if (target.hasOwnProperty('errorCode')) {
    const { message } = error as ServerBusinessError;
    return <div>{message}</div>;
  } else {
    const { error: message } = error as ServerError;
    return <div>{message}</div>;
  }
};

export default ErrorContent;
