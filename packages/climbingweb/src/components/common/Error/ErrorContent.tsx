import { ServerBusinessError, ServerError } from 'climbingweb/types/common';
import React from 'react';

interface ErrorContentProps {
  error: ServerError | ServerBusinessError;
}

// 공통 error 컴포넌트, 추후 변경 예정
const ErrorContent = ({ error }: ErrorContentProps) => {
  if (error.hasOwnProperty('errorCode')) {
    const { message } = error as ServerBusinessError;
    return <div>{message}</div>;
  } else {
    const { error: message } = error as ServerError;
    return <div>{message}</div>;
  }
};

export default ErrorContent;
