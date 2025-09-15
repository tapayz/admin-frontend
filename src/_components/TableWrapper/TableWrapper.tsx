import React from "react";
import { tableWrapperStyles } from "./TableWrapper.styles";

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div css={tableWrapperStyles.tableWrapper}>
      <div css={tableWrapperStyles.table}>{children}</div>
    </div>
  );
};

export default TableWrapper;
