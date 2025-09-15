// 기존 리스트 형태의 에이전트 정보
export interface GetAgencyListResponseDto {
  id: string;
  idCode: string;
  name: string;
  icon: string;
  level: number;
  isActive: boolean;
  exchangeFeeRate: string;
  txFeeRate: string;
  _count: {
    children: number;
    Customer: number;
  };
  children: GetAgencyListResponseDto[];
}

// 새로운 계층 구조 API 응답
export interface AgencyListResponseType {
  hierarchyTree: GetAgencyListResponseDto;
  targetAgent?: GetAgencyListResponseDto;
  total?: number;
  totalPages?: number;
}
