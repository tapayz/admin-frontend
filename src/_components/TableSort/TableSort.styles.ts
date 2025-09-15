import { css } from "@emotion/react";

export const sortButtonCss = {
  button: css`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `,
  icon: css`
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  `,
};
