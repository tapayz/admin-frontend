import React, { useEffect } from "react";
import HierachyInfoListItem from "../HierachyInfoListItem/HierachyInfoListItem";
import { hierachyInfoListCss } from "./HierachyInfoList.styles";
import { useHierarchyInfoQuery } from "../../_hooks/react-query/useHierarchyInfoQuery";
import { useLocale } from "@/_hooks/useLocale";
import { useHierachyInfoStore } from "../../_store/useHierachyInfoStore";
import { useHierarchyFoldingStore } from "../../_store/useHierachyFoldingStore";

const HierachyInfoList = () => {
  const { data: hierarchyInfo, isLoading } = useHierarchyInfoQuery();
  const { t } = useLocale();

  const { setHierarchyData, clearHierachyOptions, setHierachyRootId } =
    useHierachyInfoStore();
  const { reset: resetFolding } = useHierarchyFoldingStore();

  useEffect(() => {
    if (hierarchyInfo?.root) {
      setHierarchyData(hierarchyInfo.root);
      setHierachyRootId(hierarchyInfo.root.id);
    }

    return () => {
      clearHierachyOptions();
      resetFolding();
      setHierachyRootId(0);
    };
  }, [hierarchyInfo, setHierarchyData, clearHierachyOptions, resetFolding]);

  if (isLoading) {
    return <div css={hierachyInfoListCss.noResults}>{t("searching")}</div>;
  }

  if (!hierarchyInfo) {
    return <div css={hierachyInfoListCss.noResults}>{t("noResults")}</div>;
  }

  return (
    <ul css={hierachyInfoListCss.wrapper} className="custom-scrollbar-not-hide">
      <HierachyInfoListItem
        key={hierarchyInfo?.root?.id}
        agent={hierarchyInfo?.root}
      />
    </ul>
  );
};

export default HierachyInfoList;
