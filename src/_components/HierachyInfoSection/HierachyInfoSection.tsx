import React from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { Search } from "react-feather";
import { hierachyInfoSectionCss } from "./HierachyInfoSection.styles";
import HierachyInfoList from "./_components/HierachyInfoList/HierachyInfoList";
import { useHierachyInfoStore } from "./_store/useHierachyInfoStore";
import { useHierachyInfoParam } from "./_hooks/useHierachyInfoParam";
import { useSessionStore } from "@/_stores/useSessionStore";

const HierachyInfoSection = () => {
  const { isHierachyInfoSection: isAgentSection } = useHierachyInfoStore();
  const { session } = useSessionStore();
  const {
    currentHierachyInfo,
    handleChangeCurrentHierachyInfo,
    hierachyInfo,
    setHierachyInfo,
  } = useHierachyInfoParam(session?.id ?? "");

  return (
    <div
      css={[
        hierachyInfoSectionCss.wrapper,
        isAgentSection && hierachyInfoSectionCss.hide,
      ]}
    >
      <div css={hierachyInfoSectionCss.searchWrapper}>
        <TextInput
          cssStyle={hierachyInfoSectionCss.searchInput}
          value={hierachyInfo}
          onChange={(e) => setHierachyInfo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChangeCurrentHierachyInfo(hierachyInfo);
            }
          }}
        />
        <Button
          buttonType="primary"
          onClick={() => handleChangeCurrentHierachyInfo(hierachyInfo)}
          cssStyle={hierachyInfoSectionCss.searchButton}
        >
          <Search size={14} />
        </Button>
      </div>
      <HierachyInfoList />
    </div>
  );
};

export default HierachyInfoSection;
