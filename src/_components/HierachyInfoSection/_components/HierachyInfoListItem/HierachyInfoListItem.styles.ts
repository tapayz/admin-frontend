import theme from '@/_theme';
import { css } from '@emotion/react';
import { lighten } from 'polished';

type DepthColor = {
  [key: number]: string;
};

export const depthColor: DepthColor = {
  0: theme.colors.mainDefault,
  1: lighten(0.1, theme.colors.mainDefault),
  2: lighten(0.2, theme.colors.mainDefault),
  3: lighten(0.3, theme.colors.mainDefault),
  4: lighten(0.4, theme.colors.mainDefault),
  5: lighten(0.5, theme.colors.mainDefault),
  6: lighten(0.6, theme.colors.mainDefault),
  7: lighten(0.7, theme.colors.mainDefault),
  8: lighten(0.8, theme.colors.mainDefault),
  9: lighten(0.9, theme.colors.mainDefault),
};

export const depthColorCss = {
  color: (level: number) => css`
    background-color: ${depthColor[level % 10]};
  `,
};

export const hierachyInfoListItemCss = {
  wrapper: css`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 5px;
    position: relative;

    &:before {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background-color: ${theme.colors.coolGray200};
      position: absolute;
      top: 0;
    }
  `,
  level: (level: number) => css`
    padding-left: ${level !== 0 ? `${level + 10}px` : 0};

    ${level === 0
      ? `
      &:before {
      left: 0
      }
    `
      : `
      &:before {
        left: 10px;
      }
    `}
  `,
  active: css`
    background-color: ${theme.colors.mainPoint};
  `,
  folderOpen: css`
    position: absolute;
    left: -11px;
    top: 5px;
  `,
  agentButton: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 11px;
    padding: 3px 5px;
    border-radius: 5px;
    margin-left: 7px;
    color: ${theme.colors.mainDefault};
    position: relative;
  `,
  agentNameWrapper: css`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  agentName: css`
    font-weight: 600;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  `,
  agentInfo: css`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.white};
    border-radius: 5px;
    border: 1px solid ${theme.colors.coolGray100};
  `,
  agentInfoItem: css`
    font-size: 9px;
    color: ${theme.colors.coolGray500};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 5px;

    &:last-of-type {
      border-left: 1px solid ${theme.colors.coolGray100};
    }
  `,
  agentInfoItemAgent: css`
    color: ${theme.colors.mainDefault};
  `,
  childrenWrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
  `,
};
