export interface Agent {
  id: number;
  username: string;
  nickname: string;
  pots_exchange_rate_percent: number;
  [key: string]: any;
}

export interface GetAgencyInfoResponse {
  agent: Agent;
  totalCountOfUnderAgent: number;
  totalPotsOfUnderAgent: number;
  totalCountOfUnderUser: number;
  totalBalanceOfUnderUser: number;
}
