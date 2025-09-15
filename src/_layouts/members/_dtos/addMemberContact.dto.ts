import { ContactType } from './customerResponse.dto';

export interface AddMemberContactDto {
  targetId: number;
  type: ContactType;
  value: string;
  desc: string;
}