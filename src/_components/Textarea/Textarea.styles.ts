import { css } from '@emotion/react';

export const textareaCss = {
  textarea: css`
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid #dde1e6;
    background: #ffffff;
    font-size: 14px;
    line-height: 20px;
    resize: none;
    width: 100%;
    height: 150px;
    color: #343a3f;

    &::placeholder {
      color: #a2a9b0;
    }

    &:focus {
      outline: none;
    }
  `,

  hoverFocus: css`
    &:hover,
    &:focus-within {
      border: 1px solid #c1c7cd;
    }
  `,

  disabled: css`
    border: 1px solid #dde1e6;
    background: #f2f4f8;
    cursor: not-allowed;
  `,

  error: css`
    border: 1px solid #ff6967;
  `,
};
