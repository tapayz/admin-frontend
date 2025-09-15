import { css } from '@emotion/react';
import theme from '@/_theme';

export const paginationCss = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: end;
    padding-top: 10px;
  `,
  buttonGroup: css`
    display: flex;
    border: 1px solid ${theme.colors.coolGray200};
    border-radius: 6px;
  `,
  button: css`
    display: flex;
    height: 30px;
    padding: 0 5px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;

    span {
      font-size: 10px;
    }

    ${theme.media.mobile} {
      padding: 0 10px;
      gap: 3px;
      span {
        font-size: 12px;
      }
    }
  `,
  borderRight: css`
    border-right: 1px solid ${theme.colors.coolGray200};
  `,
  disabled: css`
    color: #d1d5db;
  `,
  input: css`
    display: flex;
    height: 30px;
    width: 40px;
    color: ${theme.colors.coolGray600};
    align-items: center;
    justify-content: center;
    font-size: 10px;
    text-align: center;
    background-color: white;
    &:focus,
    &:active,
    &:hover {
      outline: none;
    }

    ${theme.media.mobile} {
      font-size: 12px;
    }
  `,
};
