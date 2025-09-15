import { css } from "@emotion/react";
import {
  HEADER_PC_HEIGHT,
  HEADER_MOBILE_HEIGHT,
} from "@/_layouts/header/Header.styles";
import { FOOTER_HEIGHT } from "@/_layouts/footer/Footer.styles";
import theme from "@/_theme";
export const adminLayoutCss = {
  main: css`
    padding: 30px 20px;
    min-height: calc(100dvh - ${HEADER_MOBILE_HEIGHT}px - ${FOOTER_HEIGHT}px);
    width: 100%;
    z-index: 0;
    transition: all 0.3s ease;

    > div {
      height: 100%;
    }

    ${theme.media.mobile} {
      padding-left: 290px;
    }

    ${theme.media.pc} {
      min-height: calc(100dvh - ${HEADER_PC_HEIGHT}px - ${FOOTER_HEIGHT}px);
    }
  `,
  mainSideBar: css`
    padding-left: 20px;
    ${theme.media.mobile} {
      padding-left: 55px;
    }
  `,
};
