import { ServerBusinessError, ServerError } from 'climbingweb/types/common';

export const getErrorMessageToResponse = (error: unknown) => {
  const target = error as ServerError | ServerBusinessError;
  if (target.hasOwnProperty('errorCode')) {
    const serverBusinessError = target as ServerBusinessError;
    console.dir('serverBusinessError');
    if (serverBusinessError.violations) {
      return serverBusinessError.violations.join(', ');
    } else {
      return serverBusinessError.message;
    }
  } else if (target.hasOwnProperty('error')) {
    const serverError = error as ServerError;
    return serverError.error;
  }
  return '알수 없는 에러';
};
