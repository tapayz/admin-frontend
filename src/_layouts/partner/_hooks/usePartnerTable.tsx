"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useCallback } from "react";
import React from "react";
import useTable from "@/_hooks/table/useTable";
import Badge from "@/_components/Badge/Badge";
import { GetAgencyListResponseDto } from "../_dtos/getPartnerListResponse.dto";
import { useLocale } from "@/_hooks/useLocale";
import { ChevronRight, ChevronDown } from "lucide-react";
import theme from "@/_theme";
import { css } from "@emotion/react";

interface FlattenedNode extends GetAgencyListResponseDto {
  isExpanded?: boolean;
  hasChildren: boolean;
  depth: number;
}

interface UsePartnerTableProps {
  PartnerList: GetAgencyListResponseDto | null;
}

const flattenHierarchy = (
  nodes: GetAgencyListResponseDto[],
  depth = 0,
  expandedNodes: Set<string> = new Set()
): FlattenedNode[] => {
  const flattened: FlattenedNode[] = [];

  nodes.forEach((node) => {
    const flatNode: FlattenedNode = {
      ...node,
      depth,
      hasChildren: (node?.children?.length ?? 0) > 0,
      isExpanded: expandedNodes.has(node?.id),
    };

    flattened.push(flatNode);

    if (expandedNodes.has(node?.id) && (node?.children?.length ?? 0) > 0) {
      flattened.push(
        ...flattenHierarchy(node.children, depth + 1, expandedNodes)
      );
    }
  });

  return flattened;
};

export const usePartnersTable = ({
  PartnerList: hierarchyTree,
}: UsePartnerTableProps) => {
  const columnHelper = createColumnHelper<FlattenedNode>();
  const { t } = useLocale();

  // 디버깅: hierarchyTree 데이터 확인
  console.log("useHierarchyTreeTable - hierarchyTree:", hierarchyTree);

  // 모든 자식이 있는 노드들을 재귀적으로 찾아 확장 상태로 설정하는 함수
  const getAllExpandableNodeIds = (
    nodes: GetAgencyListResponseDto[]
  ): string[] => {
    const expandableIds: string[] = [];

    const traverse = (nodeList: GetAgencyListResponseDto[]) => {
      nodeList.forEach((node) => {
        if ((node?.children?.length ?? 0) > 0) {
          expandableIds.push(node.id);
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return expandableIds;
  };

  // 확장된 노드들을 추적하는 상태 (초기에 모든 자식이 있는 노드들이 펼쳐진 상태)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // hierarchyTree가 변경될 때마다 모든 자식이 있는 노드들을 펼친 상태로 설정
  React.useEffect(() => {
    if (hierarchyTree?.id) {
      const expandableNodeIds = getAllExpandableNodeIds([hierarchyTree]);
      console.log(
        "Setting all expandable nodes as expanded:",
        expandableNodeIds
      );
      setExpandedNodes(new Set(expandableNodeIds));
    }
  }, [hierarchyTree?.id]);

  const data = useMemo(() => {
    if (!hierarchyTree) return [];
    return flattenHierarchy([hierarchyTree], 0, expandedNodes);
  }, [hierarchyTree, expandedNodes]);

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // 레벨에 따른 배지 타입 결정 함수
  const getBadgeTypeByLevel = (level: number) => {
    switch (level) {
      case 0:
        return "infoDanger"; // 빨간색 - 최상위 레벨
      case 1:
        return "infoWarning"; // 주황색 - 1레벨
      case 2:
        return "infoSuccess"; // 초록색 - 2레벨
      case 3:
        return "infoDefault"; // 기본 정보색 - 4레벨
      case 4:
        return "point"; // 포인트색 - 3레벨
      default:
        return "default"; // 기본색 - 5레벨 이상
    }
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          header: "ID",
          size: 150,
          id: "id",
          cell: ({ row }) => {
            return <div className="text-center">{row.original.id}</div>;
          },
        }),

        columnHelper.display({
          header: t("partner.list.level"),
          size: 80,
          id: "level",
          cell: ({ row }) => {
            return (
              <div className="text-center">
                <Badge type={getBadgeTypeByLevel(row.original.level)}>
                  Level {row.original.level}
                </Badge>
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("profile.name"),
          size: 250,
          id: "hierarchyInfo",
          cell: ({ row }) => {
            const { name, hasChildren, isExpanded, depth, idCode } =
              row.original;
            const indentWidth = depth * 20;

            return (
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  padding-left: ${indentWidth}px;
                  cursor: ${hasChildren ? "pointer" : "default"};
                `}
                onClick={() => hasChildren && toggleNode(row.original.id)}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown size={16} style={{ marginRight: "8px" }} />
                  ) : (
                    <ChevronRight size={16} style={{ marginRight: "8px" }} />
                  )
                ) : (
                  <span style={{ width: "24px", marginRight: "8px" }}>→</span>
                )}

                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Badge
                      type={getBadgeTypeByLevel(depth)}
                      cssStyle={css`
                        font-weight: bold;
                      `}
                    >
                      {name}
                    </Badge>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Badge type="default">{t("profile.id")}</Badge>
                    <span
                      style={{
                        fontSize: "12px",
                        color: theme.colors.coolGray600,
                      }}
                    >
                      {idCode}
                    </span>
                  </div>
                </div>
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("fee.exchangeFee"),
          size: 120,
          id: "exchangeFeeRate",
          cell: ({ row }) => {
            const feeRate = row.original.exchangeFeeRate;
            if (!feeRate) return <div className="text-center">-</div>;
            const percentage = parseFloat(feeRate) * 100;
            const displayValue = percentage % 1 === 0 ? percentage.toString() + "%" : percentage.toFixed(2) + "%";
            return (
              <div className="text-center">
                {displayValue}
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("fee.transactionFee"),
          size: 120,
          id: "txFeeRate",
          cell: ({ row }) => {
            const feeRate = row.original.txFeeRate;
            if (!feeRate) return <div className="text-center">-</div>;
            const percentage = parseFloat(feeRate) * 100;
            const displayValue = percentage % 1 === 0 ? percentage.toString() + "%" : percentage.toFixed(2) + "%";
            return (
              <div className="text-center">
                {displayValue}
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("partner.list.childrenAgent"),
          size: 100,
          id: "childrenCount",
          cell: ({ row }) => {
            return (
              <div className="text-center">
                <Badge type="infoSuccess">
                  {row.original._count?.children}
                </Badge>
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("partner.list.memberCount"),
          size: 100,
          id: "memberCount",
          cell: ({ row }) => {
            return (
              <div className="text-center">
                <Badge type="default">
                  {row.original._count?.Customer ?? 0}
                </Badge>
              </div>
            );
          },
        }),

        columnHelper.display({
          header: t("partner.table.status"),
          size: 100,
          id: "status",
          cell: ({ row }) => {
            return (
              <div className="text-center">
                <Badge
                  type={row.original.isActive ? "infoSuccess" : "infoDanger"}
                >
                  {row.original.isActive
                    ? t("partner.list.active")
                    : t("partner.list.inactive")}
                </Badge>
              </div>
            );
          },
        }),
      ] as ColumnDef<FlattenedNode>[],
    [columnHelper, t, toggleNode]
  );

  const { table } = useTable({
    data,
    columns,
  });

  return { table, toggleNode };
};
