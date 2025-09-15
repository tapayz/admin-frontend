import { css } from '@emotion/react';

export const textInputWrapperCss = {
  wrapper: css`
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #dde1e6;
    background: #ffffff;
    padding: 0 20px;
    gap: 8px;
    height: 36px;

    svg {
      flex-shrink: 0;
    }
  `,

  clear: css`
    display: none;
    flex-shrink: 0;
  `,

  dirty: css`
    &:focus-within {
      button {
        display: flex;
      }
    }
  `,

  hoverFocus: css`
    &:hover,
    &:focus-within {
      border: 1px solid #a2a9b0;
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

  input: css`
    font-size: 14px;
    font-style: normal;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.3px;
    font-weight: 400;
    background: transparent;
    width: 100%;
    height: 100%;
    color: #21272a;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #fff inset !important;
      -webkit-text-fill-color: #21272a !important;
      transition: background-color 5000s ease-in-out 0s;
      caret-color: #fff;
    }

    &::placeholder {
      color: #a2a9b0;
    }

    &:disabled {
      cursor: not-allowed;
      color: #a2a9b0;
    }

    &:focus {
      outline: none;
    }
  `,

  passwordVisible: css`
    display: flex;
  `,
};
