import { useQuery } from 'react-query';
import makeMasterTokenInstance from '../../mocks/makeMasterTokenInstance';

/**
 * /centers/${centerId}/hold api 의 axios response 함수
 *
 * @param centerId /centers/${centerId}/hold api 의 centerId 에 해당하는 검색 값
 * @returns /centers/${centerId}/hold api 의 axios.get 프로미스 값
 */
const findHoldInfoByCenter = async (centerId?: string) => {
  const axiosInstance = makeMasterTokenInstance();
  const { data } = await axiosInstance.get(`/centers/${centerId}/hold`);
  return data;
};

/**
 * 위 함수의 Mock 함수
 */
const findHoldInfoByCenterMock = async (centerId?: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.dir(centerId);
      const response = {
        data: [
          {
            id: '1',
            image:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/white.svg',
            name: '1번홀드',
            count: 0,
            crayonImage:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/crayon/white.svg',
          },
          {
            id: '2',
            image:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/yellow.svg',
            name: '2번홀드',
            count: 0,
            crayonImage:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/crayon/yellow.svg',
          },
          {
            id: '3',
            image:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/blue.svg',
            name: '3번홀드',
            count: 0,
            crayonImage:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/crayon/blue.svg',
          },
          {
            id: '4',
            image:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/green.svg',
            name: '4번홀드',
            count: 0,
            crayonImage:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/crayon/green.svg',
          },
          {
            id: '5',
            image:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/hold/red.svg',
            name: '5번홀드',
            count: 0,
            crayonImage:
              'https://claon-server.s3.ap-northeast-2.amazonaws.com/center/seoul/theclimb_magok/crayon/red.svg',
          },
        ],
      };
      resolve(response);
      reject('error');
    }, 1);
  });
};

/**
 * /centers/${centerId}/hold api 를 통해 홀드 리스트 값을 가지고 오는 useQuery hooks
 *
 * @param centerId /centers/${centerId}/hold api 의 centerId 에 해당하는 검색 값
 * @param options useQuery 추가 옵션, retry: 0, enabled: !!centerId 적용 중
 * @returns /centers/${centerId}/hold api 의 useQuery return 값
 */
export const useFindHoldInfoByCenter = (centerId?: string, options?: any) => {
  return useQuery(
    ['centerId', centerId],
    () => findHoldInfoByCenter(centerId),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerId,
      ...options,
    }
  );
};

/**
 * /centers/${centerId}/hold api 를 통해 홀드 리스트 값을 가지고 오는 useQuery hooks 의 Mock 함수
 *
 * @param centerId /centers/${centerId}/hold api 의 centerId 에 해당하는 검색 값
 * @param options useQuery 추가 옵션, retry: 0, enabled: !!centerId 적용 중
 * @returns /centers/${centerId}/hold api 의 useQuery return 값
 */
export const useFindHoldInfoByCenterMock = (
  centerId: string,
  options?: any
) => {
  return useQuery(
    ['centerId', centerId],
    () => findHoldInfoByCenterMock(centerId),
    {
      initialData: [],
      retry: 0,
      enabled: !!centerId,
      ...options,
    }
  );
};
