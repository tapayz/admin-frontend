import theme from "@/_theme";
import { css } from "@emotion/react";
import { lighten } from "polished";

export const badgeCss = {
  wrapper: css`
    display: block;
    padding: 3px 8px;
    min-width: 20px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1;
    font-weight: 500;
    border: 1px solid ${theme.colors.white};
  `,
};

export const badgeTypeCss = {
  default: css`
    background-color: ${theme.colors.mainDefault};
    color: ${theme.colors.coolGray50};
  `,
  success: css`
    background-color: ${theme.colors.successDefault};
    color: ${theme.colors.white};
  `,
  error: css`
    background-color: ${theme.colors.warningDefault};
    color: ${theme.colors.white};
  `,
  infoDanger: css`
    background-color: #fceceb;
    color: #e85347;
    border: 1px solid #f6bab5;
  `,
  infoSuccess: css`
    background-color: #e4f5f3;
    color: #127c90;
    border: 1px solid #98d3de;
  `,
  infoDefault: css`
    background-color: #e6f0ff;
    color: #0055cc;
    border: 1px solid #99bbff;
  `,
  point: css`
    background-color: ${theme.colors.coolGray50};
    color: ${theme.colors.mainText};
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  `,
  infoWarning: css`
    background-color: #fff9e6;
    color: #cc8800;
    border: 1px solid #ffdb99;
  `,
};

export const badgeStatusCss = {
  status: (index: number) => css`
    background-color: ${lighten(index * 0.1, theme.colors.mainDefault)};
    color: ${theme.colors.white};
    border: 1px solid ${lighten(index * 0.1, theme.colors.mainDefault)};
  `,
};
