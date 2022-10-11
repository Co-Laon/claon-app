import _ from 'lodash';
import { useQuery } from 'react-query';
import makeMasterTokenInstance from '../../mocks/makeMasterTokenInstance';

const searchCenterName = _.debounce(async (centerName: string) => {
  const axiosInstance = makeMasterTokenInstance();
  console.dir(centerName);
  const { data } = await axiosInstance.get(`/centers/name/${centerName}`);
  return data;
}, 300);

/**
 * 위 함수의 Mock 함수
 *
 */
const searchCenterNameMock = async (centerName: string) => {
  return new Promise((resolve, reject) => {
    console.dir(centerName);
    setTimeout(() => {
      const response = {
        data: [
          {
            id: '402888908377aaed018377ab6105013a',
            name: 'v10클라이밍 장안점',
          },
          {
            id: '402888908377aaed018377ab6042012e',
            name: 'v10클라이밍 천호본점',
          },
          {
            id: '402888908377aaed018377ab6bdf01e7',
            name: '강동클라이밍짐',
          },
        ],
      };
      resolve(response);
      reject('error');
    }, 1);
  });
};

/**
 * /centers/name/${centerName} api 를 통해 center 이름 리스트를 가지고 오는 useQuery hooks
 *
 * @param centerName /centers/name/${centerName} api 의 centerName 에 해당하는 검색 값
 * @param options useQuery 추가 옵션, retry: 0, enabled: !!centerName 적용 중
 * @returns /centers/name/${centerName} api 의 useQuery 를 return
 */
export const useSearchCenterName = (centerName: string, options?: any) => {
  return useQuery(
    ['centerName', centerName],
    () => searchCenterName(centerName),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerName,
      ...options,
    }
  );
};

export const useSearchCenterNameMock = (centerName: string, options?: any) => {
  return useQuery(
    ['centerName', centerName],
    () => searchCenterNameMock(centerName),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerName,
      ...options,
    }
  );
};
