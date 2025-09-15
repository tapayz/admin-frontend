export interface HierarchyInfo {
  id: number;
  username: string;
  depth: number;
  idcode: string;
  status: string;
  _count: {
    users: number;
    children: number;
  };
  children: HierarchyInfo[];
}

export interface GetHierarchyInfoResponseDto {
  root: HierarchyInfo;
}
