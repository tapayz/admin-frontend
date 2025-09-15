import theme from "@/_theme";
import { css } from "@emotion/react";

export const breadCrumbCss = {
  breadCrumb: css``,
  breadCrumbText: css`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: ${theme.colors.coolGray600};
    font-weight: 700;

    ${theme.media.mobile} {
      font-size: 14px;
    }
  `,

  breadCrumbIcon: css`
    width: 14px;
    height: 14px;
    color: ${theme.colors.mainDark};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #ccc;
    flex-shrink: 0;

    svg {
      width: 12px;
      height: 12px;
    }

    ${theme.media.mobile} {
      width: 24px;
      height: 24px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  `,
};
