export enum TxState {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  INVOICE_DEPOSIT = 'INVOICE_DEPOSIT'
}

export interface GetTransactionListRequestDto {
  // 페이지 당 항목 수
  size?: number;
  
  // 페이지 번호
  page?: number;
  
  // 조회 시작일(YYYY-MM-DD)
  startAt?: Date;
  
  // 조회 종료일(YYYY-MM-DD)
  endAt?: Date;
  
  // 특정 고객의 거래만 조회 (선택사항)
  customerId?: number;
  
  // 거래 타입 필터 - 입금: DEPOSIT, 출금: WITHDRAW, 인보이스: INVOICE_DEPOSIT
  type?: TxState;
}