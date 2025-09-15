import theme from '@/_theme';
import { css } from '@emotion/react';

export const infoTextCss = {
  wrapper: css`
    position: relative;
    z-index: 10;
  `,
  infoText: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;

    svg {
      flex-shrink: 0;
    }
  `,
  message: css`
    position: absolute;
    top: 100%;
    left: 50%;
    width: 200px;
    background-color: ${theme.colors.coolGray800};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    transform: translate(-50%, 10px);
    opacity: 0.9;
    white-space: pre-line;

    span {
      position: relative;
      font-size: 11px;
      color: ${theme.colors.coolGray50};
      font-weight: 400;
      z-index: 1;
      word-break: keep-all;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 10px;
      height: 10px;
      background-color: ${theme.colors.coolGray800};
      transform: rotate(45deg) translate(-50%, -30%);
      z-index: 0;
    }
  `,
};
