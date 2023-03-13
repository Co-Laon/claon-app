import { getErrorMessageToResponse } from 'climbingweb/src/utils/getErrorMessageToResponse';
import React from 'react';

interface ErrorContentProps {
  error: unknown;
}

// 공통 error 컴포넌트, 추후 변경 예정
const ErrorContent = ({ error }: ErrorContentProps) => {
  return <div>{getErrorMessageToResponse(error)}</div>;
};

export default ErrorContent;
