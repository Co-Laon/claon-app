import axios, { AxiosInstance } from 'axios';

/**
 * web 테스트용 마스터 토큰 인스턴스
 * 나중에 반드시 삭제 할 것
 * @returns 마스터 토큰 인스턴스
 */
export default function makeMasterTokenInstance(): AxiosInstance {
  const tokens = {
    'access-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyYzlhODc5MzgyNDI5OTI5MDE4MjQyOWRhZWJlMDAwMSIsImlhdCI6MTY2MTc1MjY1MSwiZXhwIjoxNjY0MzQ0NjUxfQ.Hl5qlkDfR6pStYsXPIFmaYRo4u523NdhF0sybLnYoQY',
    'refresh-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyYzlhODc5MzgyNDI5OTI5MDE4MjQyOWRhZWJlMDAwMSIsImlhdCI6MTY2MTc1MjY1MSwiZXhwIjoxNjY5NTI4NjUxfQ.zA6rEXdX5fIkrdiPz2n7aDiP5feME4pMZaRnDh_5aIo',
    isCompletedSignUp: false,
  };

  const axiosInstance = axios.create({
    headers: tokens,
    baseURL: 'http://claon.life:8080/api/v1',
  });

  return axiosInstance;
}
