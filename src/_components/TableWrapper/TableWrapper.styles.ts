import { css } from "@emotion/react";

export const tableWrapperStyles = {
  tableWrapper: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  `,
  table: css`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    gap: 10px;
    width: 100%;
  `,
};
