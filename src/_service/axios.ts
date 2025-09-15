'use client';
import axios from 'axios';
import queryString from 'query-string';

// 클라이언트용 axios 인스턴스
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // process.env.NODE_ENV === 'production'
  //   ? process.env.NEXT_PUBLIC_API_URL
  //   : process.env.NODE_ENV === 'test'
  //   ? process.env.NEXT_PUBLIC_STAGING_API_URL
  //   : process.env.NEXT_PUBLIC_DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status < 400 || status === 401;
  },
  withCredentials: true,
  paramsSerializer: (params) => {
    /**
     * Axios에서 HTTP 요청의 쿼리 문자열을 구성할 때, 객체 형태의 params를 URL에 사용할 수 있는 쿼리 문자열 형식으로 변환하는 역할
     * 특히, 배열 형태의 값을 가지는 쿼리 문자열을 구성할 때 유용합니다.
     * const params = {
     *   userId: 123,
     *   filter: ['active', 'new'],
     * };
     * queryString.stringify(params);
     * => "userId=123&filter=active&filter=new"
     *
     * 참고로 Axios의 기본 직렬화 방식에서는 배열이 다음과 같이 변환됩니다.
     * /api/v1/users?filter[]=active&filter[]=new
     */
    return queryString.stringify(params);
  },
});

// client.interceptors.response.use(async (res) => {
//   const { status } = res;
//   if (status === 401) {
//     await refreshTokens();
//     throw new Error('refresh token', { cause: { status: status } });
//   }

//   return res;
// });

// 서버용 axios 인스턴스 (서버 컴포넌트에서 사용)
export const serverClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.API_URL // 서버 환경변수를 사용 (NEXT_PUBLIC_ 접두사가 없음)
      : process.env.NODE_ENV === 'test'
      ? process.env.STAGING_API_URL
      : process.env.DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status < 400 || status === 401;
  },
  // Node.js 환경에서 withCredentials 설정은 작동 방식이 다름
  // 쿠키는 직접 헤더에 추가해야 함
  withCredentials: true,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});
