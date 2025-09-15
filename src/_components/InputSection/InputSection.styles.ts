import { css } from '@emotion/react';

export const inputSectionCss = {
  container: css`
    display: grid;
    align-items: center;
  `,
  heading: css`
    align-self: stretch;
    padding: 10px;
    display: flex;
    align-items: center;
  `,
  content: css`
    padding: 10px;
    position: relative;
  `,
};

export const gridTypeCss = {
  row: css`
    flex-direction: row;
    grid-template-columns: auto 1fr;
  `,
  col: css`
    flex-direction: column;
    grid-template-rows: auto 1fr;
    gap: 5px;

    .heading {
      padding: 0px;
    }

    .content {
      padding: 0px;
    }
  `,
};
