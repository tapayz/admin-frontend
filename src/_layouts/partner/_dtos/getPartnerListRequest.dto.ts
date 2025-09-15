export type SortByType = "username" | "created_at" | "id" | "pots";

export interface GetPartnerListRequestDto {
  page: number;
  limit: number;
  searchString?: string;
  sortDirection?: string;
  sortBy?: SortByType;
  searchType?: string;
  agent?: string;
}
