import { css } from '@emotion/react';
import theme from '@/_theme';
export const FOOTER_HEIGHT = 50;

export const footerCss = {
  footer: css`
    height: ${FOOTER_HEIGHT}px;
    background-color: white;
    border-top: 1px solid ${theme.colors.coolGray100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-left: 0;
    transition: all 0.3s ease;

    ${theme.media.mobile} {
      margin-left: 270px;
    }
  `,
  footerSideBar: css`
    ${theme.media.mobile} {
      margin-left: 35px;
    }
  `,
  copyright: css`
    font-size: 12px;
    color: ${theme.colors.coolGray500};

    span {
      font-weight: 700;
    }
  `,
  countryButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 12px;
  `,
  countryItem: css`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    width: 100%;

    p {
      font-size: 12px;
      color: ${theme.colors.coolGray500};

      &:hover {
        color: black;
      }
    }
  `,
  countryItemIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);

    svg {
      width: 14px;
    }
  `,
};
