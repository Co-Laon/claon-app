import { useMutation, UseMutationOptions } from 'react-query';
import ReportData from 'climbingweb/src/interface/ReportData';
import axios from 'axios';

const createReport = async (reportData: ReportData) => {
  const { data } = await axios.post(
    `/posts/${reportData.postId}/report`,
    reportData
  );
  return data;
};

export const useCreateReport = (
  reportData: ReportData,
  options?: Omit<
    UseMutationOptions<unknown, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  return useMutation(() => createReport(reportData), options);
};
