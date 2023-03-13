import { ServerBusinessError, ServerError } from 'climbingweb/types/common';

export const getErrorMessageToResponse = (error: unknown) => {
  const target = error as ServerError | ServerBusinessError;
  if (target.hasOwnProperty('errorCode')) {
    const serverBusinessError = target as ServerBusinessError;
    if (serverBusinessError.violations) {
      return serverBusinessError.violations[0];
    } else {
      return serverBusinessError.message;
    }
  } else if (target.hasOwnProperty('error')) {
    const serverError = error as ServerError;
    return serverError.error;
  }
  return '알수 없는 에러';
};
