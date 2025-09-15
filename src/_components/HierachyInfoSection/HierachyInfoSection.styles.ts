import theme from '@/_theme';
import { css } from '@emotion/react';

export const hierachyInfoSectionCss = {
  wrapper: css`
    display: none;
    flex-direction: column;
    width: 300px;
    align-items: center;
    margin-right: 10px;
    gap: 20px;
    transition: all 0.2s ease-in-out;
    align-self: stretch;

    @media (min-width: 1280px) {
      display: flex;
    }
  `,
  hide: css`
    width: 0;
    overflow: hidden;
    margin-right: 0;
  `,
  searchWrapper: css`
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  `,
  searchInput: css`
    flex: 1;
    border: none;
    border-radius: 10px 0 0 10px;

    &:focus,
    &:active,
    &:hover,
    &:focus-visible,
    &:focus-within {
      border: none;
    }
  `,
  searchButton: css`
    border-radius: 0;
  `,
};
