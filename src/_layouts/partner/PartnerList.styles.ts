import theme from "@/_theme";
import { css } from "@emotion/react";

export const partnerListCss = {
  container: css`
    display: flex;
    gap: 10px;
    flex-direction: column;
  `,
  gameSelect: css`
    min-width: 150px;
  `,
  select: css`
    width: 150px;
  `,
  header: css`
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
  `,
  tableWrapper: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  `,
  table: css`
    table {
      min-width: 1100px;
    }
  `,
};
