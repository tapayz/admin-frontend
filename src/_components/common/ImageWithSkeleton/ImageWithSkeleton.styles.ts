import { css } from "@emotion/react";

export const imageWithSkeletonCss = {
  container: (width?: number, height?: number) => css`
    position: relative;
    width: ${width ? `${width}px` : "100%"};
    height: ${height ? `${height}px` : "100%"};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `,

  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `,

  hidden: css`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  `,

  fill: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `,
};