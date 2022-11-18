import { ServerError, ServerBusinessError } from 'climbingweb/types/common';
import { useMutation, UseMutationOptions } from 'react-query';
import axios from 'axios';
import { PostReportRequest } from 'climbingweb/types/request/post';
import { PostReportResponse } from 'climbingweb/types/response/post';

/**
 *
 * @param postId
 * @param reportData
 * @returns
 */
const createReport = async (postId: string, reportData: PostReportRequest) => {
  try {
    const { data } = await axios.post<PostReportResponse>(
      `/posts/${postId}/report`,
      reportData
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 *
 * @param postId
 * @param reportData
 * @param options
 * @returns
 */
export const useCreateReport = (
  postId: string,
  reportData: PostReportRequest,
  options?: Omit<
    UseMutationOptions<
      PostReportResponse,
      ServerError | ServerBusinessError,
      void,
      unknown
    >,
    'mutationFn'
  >
) => {
  return useMutation<PostReportResponse, ServerError | ServerBusinessError>(
    () => createReport(postId, reportData),
    options
  );
};
