import { ServerError } from 'climbingweb/types/common';
import React from 'react';

interface ErrorContentProps {
  error: ServerError;
}

const ErrorContent = ({ error }: ErrorContentProps) => <div>{error}</div>;

export default ErrorContent;
