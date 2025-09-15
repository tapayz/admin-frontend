import React, { useEffect, useRef } from "react";
import {
  hierachyInfoListItemCss,
  depthColor,
  depthColorCss,
} from "./HierachyInfoListItem.styles";
import Badge from "@/_components/Badge/Badge";
import { FolderOpen, Folder } from "lucide-react";
import theme from "@/_theme";
import { useHierachyInfoParam } from "../../_hooks/useHierachyInfoParam";
import { useSessionStore } from "@/_stores/useSessionStore";
import { HierarchyInfo } from "../../_dtos/GetHierarchyInfoResponse.dto";
import { useHierachyInfoStore } from "../../_store/useHierachyInfoStore";
import { useHierarchyFoldingStore } from "../../_store/useHierachyFoldingStore";

interface HierachyInfoListItemProps {
  agent: HierarchyInfo;
  level?: number;
}

const HierachyInfoListItem = ({
  agent,
  level = 0,
}: HierachyInfoListItemProps) => {
  const { session } = useSessionStore();
  const { currentHierachyInfo, handleChangeCurrentHierachyInfo } =
    useHierachyInfoParam(session?.id ?? "");
  const { isAllView, setIsAllView } = useHierachyInfoStore();
  const { isItemExpanded, toggleItemExpanded } = useHierarchyFoldingStore();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActive = currentHierachyInfo === agent.username;
  const hasChildren = agent.children && agent.children.length > 0;
  const isExpanded = isItemExpanded(agent.id);

  useEffect(() => {
    if (isActive && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive]);

  const handleToggleFold = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleItemExpanded(agent.id);

      // level 0인 경우 isAllView 상태도 업데이트
      if (level === 0) {
        const newExpandedState = !isExpanded;
        setIsAllView(newExpandedState);
      }
    }
  };

  return (
    <li
      css={[
        hierachyInfoListItemCss.wrapper,
        hierachyInfoListItemCss.level(level),
      ]}
    >
      <button
        type="button"
        css={[
          hierachyInfoListItemCss.agentButton,
          currentHierachyInfo === agent.username &&
            hierachyInfoListItemCss.active,
        ]}
        ref={buttonRef}
        onClick={() => handleChangeCurrentHierachyInfo(agent.username)}
      >
        {hasChildren && (
          <span
            css={hierachyInfoListItemCss.folderOpen}
            onClick={handleToggleFold}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {isExpanded ? (
              <FolderOpen
                size={14}
                fill={theme.colors.black}
                stroke={theme.colors.coolGray100}
              />
            ) : (
              <Folder
                size={14}
                fill={theme.colors.black}
                stroke={theme.colors.coolGray100}
              />
            )}
          </span>
        )}
        <div css={hierachyInfoListItemCss.agentNameWrapper}>
          <Badge type="default" cssStyle={depthColorCss.color(level)}>
            M{level + 1}
          </Badge>
          <strong css={hierachyInfoListItemCss.agentName}>
            {agent.username}
          </strong>
        </div>
        <div css={hierachyInfoListItemCss.agentInfo}>
          <span
            css={[
              hierachyInfoListItemCss.agentInfoItem,
              hierachyInfoListItemCss.agentInfoItemAgent,
            ]}
          >
            {agent._count.children}
          </span>
          <span css={hierachyInfoListItemCss.agentInfoItem}>
            {agent._count.users}
          </span>
        </div>
      </button>
      {hasChildren && isExpanded && (
        <ul css={hierachyInfoListItemCss.childrenWrapper}>
          {agent.children.map((child) => (
            <HierachyInfoListItem
              key={child.id}
              agent={child}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default HierachyInfoListItem;
