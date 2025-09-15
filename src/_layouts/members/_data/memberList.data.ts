import { MemberListResponseType } from "../_dtos/getMemberListResponse.dto";

export const mockMemberListData: MemberListResponseType = {
  list: [
    {
      id: 1,
      name: "홍길동",
      icon: "/images/customer.svg",
      country: "KR",
      createdAt: "2025-08-27T10:30:00.000Z",
      CustomerContact: []
    },
    {
      id: 2,
      name: "김철수",
      icon: "/images/customer.svg",
      country: "KR",
      createdAt: "2025-08-26T15:20:00.000Z",
      CustomerContact: []
    },
    {
      id: 3,
      name: "이영희",
      icon: "/images/customer.svg",
      country: "KR",
      createdAt: "2025-08-25T09:15:00.000Z",
      CustomerContact: []
    },
  ],
  total: 3,
  totalPages: 1,
};
