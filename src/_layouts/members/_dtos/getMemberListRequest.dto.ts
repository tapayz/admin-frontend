export interface GetMemberListRequestDto {
  // 검색 타입 - 'name', 'email', 'phone', 'id', '' 중 하나
  searchType?: 'name' | 'email' | 'phone' | 'id' | '';
  
  // 검색어
  search?: string;
  
  // 정렬 기준 필드 - 'name', 'createdAt', 'updatedAt', '' 중 하나
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | '';
  
  // 정렬 방향 - 'asc', 'desc', '' 중 하나
  sortOrder?: 'asc' | 'desc' | '';
  
  // 페이지 번호 (1부터 시작)
  page?: number;
  
  // 페이지당 항목 수 (1-100)
  size?: number;
}
