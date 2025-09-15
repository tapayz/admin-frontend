import theme from '@/_theme';
import { css } from '@emotion/react';

export const tableCss = {
  container: css`
    width: 100%;
    flex: 1;

    ${theme.media.notebook} {
      height: 100%;
    }
  `,
  wrapper: css`
    width: 100%;
    background-color: white;
    flex: 1;
    overflow: auto;
    display: flex;
    position: relative;
    min-height: 250px;
    height: 100%;

    /* ${theme.media.notebook} {
      max-height: 800px;
    } */
  `,
  tableContainer: css`
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
  `,
  table: css`
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    overflow-y: auto;
    overflow-x: auto;
    flex-shrink: 0;
    height: fit-content;
    min-width: 1500px;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;

    tr {
      &:has(.bettingCanceled) {
        background-color: rgba(232, 83, 71, 0.1);
      }

      &:has(.bettingPending) {
        background-color: rgba(255, 185, 0, 0.1);
      }
    }
  `,
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
  `,
  headerCell: css`
    background-color: ${theme.colors.coolGray50};
    padding: 10px;
    font-size: 12px;
    color: ${theme.colors.coolGray700};
    border-bottom: 1px solid ${theme.colors.coolGray100};

    &:nth-of-type(n + 2) {
      border-left: 1px solid ${theme.colors.coolGray100};
    }
  `,
  row: css`
    border-bottom: 1px solid ${theme.colors.coolGray100};
  `,
  cell: css`
    font-size: 12px;
    color: ${theme.colors.coolGray700};
    text-align: center;
    padding: 10px;

    &:has(.brand) {
      padding: 0;
    }

    .brand {
      padding: 10px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      align-self: center;
      min-height: 57px;

      &:nth-of-type(n + 2) {
        border-top: 1px solid ${theme.colors.coolGray100};
      }
    }

    &:nth-of-type(n + 2) {
      border-left: 1px solid ${theme.colors.coolGray100};
    }

    &:has(.null) {
      display: none;
    }
  `,
  footer: css`
    background-color: ${theme.colors.coolGray50};
    border-top: 1px solid ${theme.colors.coolGray100};
  `,
};
