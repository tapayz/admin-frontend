import { css } from '@emotion/react';

export const loaderCss = {
  loader: css`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  `,
};
