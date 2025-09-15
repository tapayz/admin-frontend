import { 
  CustomerDetailResponseDto, 
  PartnerBasicInfoDto,
  CustomerMemoResponseDto,
  CustomerContactResponseDto 
} from './customerResponse.dto';

// Legacy interfaces for backward compatibility  
export interface MemberDetailPartnerDto extends PartnerBasicInfoDto {
  id: string;
}

export interface MemberDetailCustomerDto {
  id: number;
  name: string;
  icon: string;
}

export interface MemberDetailWalletDto {
  address: string;
  network: string;
}

export interface MemberDetailMemoDto {
  id: number;
  content: string;
  createdAt: string;
}

export interface MemberDetailContactDto {
  id: number;
  type: string;
  value: string;
  desc: string;
  createdAt: string;
}

// Updated main DTO extending the new structure
export interface GetMemberDetailResponseDto extends Omit<CustomerDetailResponseDto, 'id' | 'partner' | 'createdAt' | 'updatedAt' | 'name' | 'icon' | 'partnerId' | 'country' | 'idCode' | 'isActive' | 'isHidden' | 'CustomerMemo' | 'CustomerContact'> {
  id: string; // Keep as string for backward compatibility
  state?: string;
  customer?: MemberDetailCustomerDto;
  title?: string;
  stdPrice?: string;
  cashAmount?: string;
  cryptoAmount?: string;
  wallet?: MemberDetailWalletDto;
  bitAddress?: string;
  ethAddress?: string;
  trxAddress?: string;
  callback?: string;
  memos?: MemberDetailMemoDto[];
  contacts?: MemberDetailContactDto[];
  detail?: any[];
  expiredAt?: string;
  createdAt?: string; // Keep as string for backward compatibility
  updatedAt?: Date;
  Transaction?: any[];
  partner: MemberDetailPartnerDto;
  // New fields from CustomerDetailResponseDto (optional for backward compatibility)
  name?: string;
  icon?: string;
  partnerId?: string;
  country?: string;
  idCode?: string;
  isActive?: boolean;
  isHidden?: boolean;
  CustomerMemo?: CustomerMemoResponseDto[];
  CustomerContact?: CustomerContactResponseDto[];
}