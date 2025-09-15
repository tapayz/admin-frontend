import { InvoiceItemDto } from "../_dtos/getInvoiceListResponse.dto";

export const mockInvoiceListData: InvoiceItemDto = {
  id: "invoice-001",
  state: "pending",
  customer: {
    id: 12345,
    partnerId: "partner-001",
    idCode: "CUST001"
  },
  title: "청구 제목",
  stdPrice: 10000,
  cashAmount: 5000,
  cryptoAmount: 0.05,
  detail: "상세 내용",
  createdAt: "2025-08-25T10:00:00.000Z"
};
