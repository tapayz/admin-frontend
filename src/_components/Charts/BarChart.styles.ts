import theme from "@/_theme";
import { css } from "@emotion/react";

export const barChartCSs = {
  wrapper: css`
    background-color: #fff;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #dde1e6;

    ${theme.media.mobile} {
      padding: 20px;
    }
  `,
  chartWrapper: css`
    width: 100%;
    overflow-x: auto;
  `,
  chart: css`
    width: calc(100% - 2px) !important;
    height: 100%;
    min-width: 400px !important;
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  title: css`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #134275;
    font-weight: 700;
  `,
  selectListTrigger: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    border: 1px solid #dde1e6;
    border-radius: 5px;
    width: 100px;
    font-size: 12px;

    ${theme.media.mobile} {
      font-size: 14px;
    }
  `,
  selectList: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100px;
    font-size: 12px;

    ${theme.media.mobile} {
      font-size: 14px;
    }
  `,
  selectListButton: css`
    padding: 5px 10px;
    color: #134275;

    &:hover {
      background-color: #f0f0f0;
    }
  `,
};
