import { css } from '@emotion/react';

export const errorMessageCss = {
  text: css`
    position: absolute;
    left: 0;
    top: 100%;
    color: var(--Status-Destructive, #ff6363);
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transform: translateY(3px);
  `,
  relative: css`
    position: relative;
    top: 0;
    transform: translateY(0);
  `,
};
