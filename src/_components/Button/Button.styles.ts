import { css } from "@emotion/react";
import theme from "@/_theme";

export const buttonSize = {
  small: css`
    height: 30px;
    padding: 0px 12px;
    gap: 2px;
    border-radius: 6px;
    font-size: 13px;
  `,
  medium: css`
    height: 36px;
    padding: 0px 16px;
    gap: 4px;
    border-radius: 6px;
  `,
  large: css`
    height: 42px;
    padding: 0px 20px;
    gap: 6px;
    border-radius: 6px;
  `,
  48: css`
    height: 48px;
    padding: 0px 22px;
    gap: 8px;
    border-radius: 6px;
  `,
  54: css`
    height: 54px;
    padding: 0px 24px;
    gap: 12px;
    border-radius: 6px;
  `,
};

export const buttonCss = {
  button: css`
    /* default size */
    ${buttonSize["medium"]}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: ${theme.colors.coolGray800};
    font-size: 14px;
    transition: all 0.3s ease-in-out;

    &:disabled {
      cursor: not-allowed;
    }
  `,

  primary: css`
    background: ${theme.colors.mainPoint};
    color: ${theme.colors.white};

    &:hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.12) 0%,
          rgba(0, 0, 0, 0.12) 100%
        ),
        ${theme.colors.mainDefault};
    }

    &:disabled {
      background: ${theme.colors.coolGray100};
      color: ${theme.colors.coolGray300};
    }
  `,

  linePrimary: css`
    border: 1px solid ${theme.colors.mainDefault};
    color: ${theme.colors.mainDefault};

    &:hover {
      border: 1px solid ${theme.colors.mainDark};
      color: ${theme.colors.mainDark};
    }

    &:disabled {
      border-color: ${theme.colors.coolGray100};
      background: ${theme.colors.coolGray50};
      color: ${theme.colors.coolGray200};
    }
  `,

  gray: css`
    background: ${theme.colors.coolGray50};
    color: ${theme.colors.coolGray500};

    &:hover {
      background: ${theme.colors.coolGray100};
    }

    &:disabled {
      background: ${theme.colors.coolGray100};
      color: ${theme.colors.coolGray300};
    }
  `,
  light: css`
    background: ${theme.colors.mainPoint};
    color: ${theme.colors.mainDefault};
  `,
  grayLine: css`
    border: 1px solid ${theme.colors.coolGray100};
    color: ${theme.colors.coolGray600};

    &:hover {
      border: 1px solid ${theme.colors.coolGray500};
      color: ${theme.colors.coolGray800};
    }
  `,

  danger: css`
    background: ${theme.colors.warningDefault};
    color: ${theme.colors.white};
  `,
  dangerLine: css`
    border: 1px solid ${theme.colors.warningDefault};
    color: ${theme.colors.warningDefault};

    &:hover {
      border: 1px solid ${theme.colors.warningDark};
      color: ${theme.colors.warningDark};
    }
  `,
  none: css``,
};

export const buttonType = {
  primary: buttonCss.primary,
  linePrimary: buttonCss.linePrimary,
  gray: buttonCss.gray,
  light: buttonCss.light,
  grayLine: buttonCss.grayLine,
  none: buttonCss.none,
  danger: buttonCss.danger,
  dangerLine: buttonCss.dangerLine,
};
