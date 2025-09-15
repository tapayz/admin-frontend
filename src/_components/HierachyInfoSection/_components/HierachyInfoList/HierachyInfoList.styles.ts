import { css } from '@emotion/react';
import theme from '@/_theme';

export const hierachyInfoListCss = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 300px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    max-height: calc(100dvh - 240px);
    overflow: auto;
  `,
  noResults: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${theme.colors.coolGray400};
    font-size: 14px;
  `,
};
