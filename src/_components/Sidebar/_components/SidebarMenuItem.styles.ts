import theme from "@/_theme";
import { css } from "@emotion/react";

export const sidebarMenuItemCss = {
  item: css`
    display: flex;
    align-items: center;

    dl {
      width: 100%;
    }
  `,
  title: css`
    padding: 8px 20px;
    font-size: 12px;
    color: ${theme.colors.coolGray50};
    cursor: default;
  `,
  link: css`
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    font-size: 13px;
    color: white;
    transition: padding 0.3s;
    height: 100%;
    padding: 8px 0;
  `,
  hideLink: css`
    padding: 0px 10px;
  `,
  hide: css`
    opacity: 0;
  `,
  text: css`
    opacity: 1;
    transition: opacity 0.3s;
  `,
  dd: css`
    display: flex;
    align-items: center;
    padding-left: 20px;
    gap: 10px;
    color: ${theme.colors.coolGray100};

    &:hover,
    &.active {
      background-color: ${theme.colors.mainDefault};
      color: white;
      span {
        color: white;
      }
    }

    &:has(a.active) {
      background-color: ${theme.colors.mainDefault};
      color: white;
      span {
        color: white;
      }
    }

    svg {
      width: 16px;
      height: 16px;
    }
  `,
};
