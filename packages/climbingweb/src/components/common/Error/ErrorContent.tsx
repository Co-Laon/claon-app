import { ServerError } from 'climbingweb/types/common';
import React from 'react';

interface ErrorContentProps {
  error: ServerError;
}

// 공통 error 컴포넌트, 추후 변경 예정
const ErrorContent = ({ error }: ErrorContentProps) => <div>{error}</div>;

export default ErrorContent;
