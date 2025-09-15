import { CustomerListItemDto, CustomerListResponseDto } from './customerResponse.dto';

export type GetMemberListResponseDto = CustomerListItemDto;

export interface MemberListResponseType extends CustomerListResponseDto {
  totalPages: number;
}
