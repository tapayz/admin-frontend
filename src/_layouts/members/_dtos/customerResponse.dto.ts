// CustomerResponseDtos.ts - 새로 생성할 파일
export enum ContactType {
  PHONE = "PHONE",
  EMAIL = "EMAIL"
}

// 연락처 DTO
export interface CustomerContactResponseDto {
  id: number;
  customerId: number;
  type: ContactType;
  value: string;
  desc: string;
  isActive: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

// 메모 DTO
export interface CustomerMemoResponseDto {
  id: number;
  customerId: number;
  memo: string;
  createdAt: string;
  isDeleted: boolean;
}

// 파트너 기본 정보 DTO
export interface PartnerBasicInfoDto {
  name: string;
  icon: string;
}

// 고객 목록용 DTO (간소화된 정보)
export interface CustomerListItemDto {
  id: number;
  name: string;
  icon: string;
  country: string;
  createdAt: string;
  CustomerContact: CustomerContactResponseDto[];
}

// 고객 목록 응답 DTO
export interface CustomerListResponseDto {
  total: number;
  list: CustomerListItemDto[];
}

// 고객 상세 정보 DTO
export interface CustomerDetailResponseDto {
  id: number;
  partnerId: string;
  name: string;
  icon: string;
  country: string;
  idCode: string;
  isActive: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  CustomerMemo: CustomerMemoResponseDto[];
  CustomerContact: CustomerContactResponseDto[];
  partner: PartnerBasicInfoDto;
}

// 메모 작업 응답 DTO
export interface MemoOperationResponseDto {
  id: number;
  customerId: number;
  memo: string;
  createdAt: Date;
  isDeleted?: boolean;
}

// 연락처 작업 응답 DTO
export interface ContactOperationResponseDto {
  id: number;
  customerId: number;
  type: ContactType;
  value: string;
  desc: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 아이콘 업로드 응답 DTO
export interface IconUploadResponseDto {
  id: number;
  name: string;
  icon: string;
  updatedAt: Date;
}

// 이름 수정 응답 DTO
export interface NameEditResponseDto {
  id: number;
  name: string;
  updatedAt: Date;
}