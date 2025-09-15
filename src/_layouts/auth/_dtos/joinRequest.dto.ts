export interface JoinRequestDto {
  /** 파트너 ID (영문, 숫자, 언더스코어 조합, 5-24자) */
  id: string;
  /** 비밀번호 (4-30자) */
  password: string;
  /** 비밀번호 확인 */
  rePassword: string;
  /** 파트너 회사명/상호명 (2-50자) */
  name: string;
}