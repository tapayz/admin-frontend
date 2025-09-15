import theme from '@/_theme';
import { css } from '@emotion/react';

export const checkBoxCss = {
  label: css`
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    color: #21272a;
    font-size: 13px;
    font-style: normal;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.3px;
    font-weight: 400;
  `,
  checkBox: css`
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.coolGray100};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  checkBoxActive: css`
    background-color: ${theme.colors.mainDefault};
    border: 1px solid ${theme.colors.mainDefault};
  `,
};
