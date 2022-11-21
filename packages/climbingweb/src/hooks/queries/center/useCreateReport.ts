import { CenterReportResponse } from './../../../../types/response/center/index.d';
import axios from 'axios';
import { CenterReportCreateRequest } from './../../../../types/request/center/index.d';
import { useMutation, UseMutationOptions } from 'react-query';
import { ServerBusinessError, ServerError } from 'climbingweb/types/common';

interface CreateCenterReportProps {
  centerId: string;
  reportCreateRequest: CenterReportCreateRequest;
}

/**
 * POST /center/{centerId}/report api 의 query 함수
 *
 * @param centerId 수정 신청할 센터의 id
 * @param reportCreateRequest 수정 신청 내용
 * @returns axiosReponse.data
 */
const createCenterReport = async ({
  centerId,
  reportCreateRequest,
}: CreateCenterReportProps) => {
  try {
    const { data } = await axios.post<CenterReportResponse>(
      `/centers/${centerId}/report`,
      reportCreateRequest
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

/**
 * createCenterReport api 의 useMutation hooks
 *
 * @param options useMutation 추가 옵션
 * @returns createCenterReport api 의 useMutation return 값
 */
export const useCreateCenterReport = (
  options?: Omit<
    UseMutationOptions<
      CenterReportCreateRequest,
      ServerError | ServerBusinessError,
      CreateCenterReportProps,
      unknown
    >,
    'mutationFn'
  >
) => {
  return useMutation<
    CenterReportCreateRequest,
    ServerError | ServerBusinessError,
    CreateCenterReportProps
  >(['createCenterReport'], createCenterReport, options);
};
