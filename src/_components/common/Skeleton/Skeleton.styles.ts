import { css } from "@emotion/react";

export const skeletonCss = {
  skeleton: (width: number, height: number) => css`
    width: ${width === 0 ? "100%" : `${width}px`};
    height: ${height === 0 ? "100%" : `${height}px`};

    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.3) 25%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.3) 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `,
};