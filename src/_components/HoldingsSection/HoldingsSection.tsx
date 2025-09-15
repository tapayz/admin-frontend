import React from "react";
import { holdingsSectionCss } from "./HoldingsSection.styles";

interface PotsSectionProps {
  label: string;
  value: string | React.ReactNode;
}

const PotsSection = ({ label, value }: PotsSectionProps) => {
  return (
    <div css={holdingsSectionCss.content}>
      <div css={holdingsSectionCss.item}>
        <strong css={holdingsSectionCss.itemTitle}>{label}</strong>
        {typeof value === "string" ? (
          <p css={holdingsSectionCss.itemPrice}>{value}</p>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default PotsSection;
