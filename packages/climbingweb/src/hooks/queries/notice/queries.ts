import { NoticeReponse } from './../../../../types/response/notice/index.d';
import { Pagination } from 'climbingweb/types/common';
import axios from 'axios';

/**
 * GET /notices api의 query 함수
 *
 * @returns axiosResponse.data
 */
export const getNoticeList = async (pageParam = 0) => {
  const { data } = await axios.get<Pagination<NoticeReponse>>('/notices', {
    params: {
      page: pageParam,
    },
  });

  console.log(data);
  return data;
};
