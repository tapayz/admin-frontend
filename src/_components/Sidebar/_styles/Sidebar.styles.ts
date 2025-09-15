import theme from "@/_theme";
import { css } from "@emotion/react";

export const sidebarCss = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    transition: width 0.3s ease-in-out;
    height: 100vh;
    background: ${theme.colors.mainGradation};
    padding-bottom: 20px;
    overflow: hidden;
    flex-shrink: 0;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;

    ${theme.media.mobile} {
      width: 270px;
    }
  `,
  containerHide: css`
    width: 0;
    ${theme.media.mobile} {
      width: 35px;
    }

    &:hover {
      width: 0px;
      a,
      span,
      dt,
      strong {
        opacity: 1;
      }

      .coinWrapper {
        background-color: #0e2843;
        padding: 10px;

        img {
          width: 20px;
        }
      }
    }

    ${theme.media.mobile} {
      &:hover {
        width: 270px;
      }
    }
  `,
  logo: css`
    display: flex;
    width: 100%;
    height: 70px;
    opacity: 1;
    transition: opacity 0.3s;
    position: relative;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    flex: 1;
    color: white;
    font-weight: 700;
    font-size: 20px;
  `,

  logoHide: css`
    opacity: 0;
  `,
  logoWrapper: css`
    display: flex;
    align-items: bottom;
    justify-content: space-between;
    width: 100%;
    padding-right: 10px;

    button {
      display: block;
      transform: translateY(4px);
    }

    ${theme.media.mobile} {
      padding-right: 0;

      button {
        display: none;
      }
    }
  `,
  coinWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: ${theme.colors.mainDark};
    width: 220px;
    border-radius: 10px;
    margin: 0 auto;
    transition: all 0.3s ease-in-out;

    img {
      transition: all 0.3s ease-in-out;
    }

    ${theme.media.mobile} {
      width: 240px;
    }
  `,
  accountWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;

    p {
      color: ${theme.colors.coolGray100};
      font-weight: 700;
    }
  `,
  refreshButton: css`
    color: ${theme.colors.coolGray300};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${theme.colors.mainPoint};
    }
  `,
  hideCoinWrapper: css`
    background-color: transparent;

    img {
      width: 16px;
    }
  `,
  menu: css`
    height: calc(100dvh - 70px);
    overflow-y: auto;
    width: 250px;

    &::-webkit-scrollbar {
      width: 5px;
      display: none; /* 기본적으로 스크롤바 숨김 */
    }

    &:hover::-webkit-scrollbar {
      display: block; /* 마우스 호버 시 스크롤바 표시 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.mainLight};
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ${theme.media.mobile} {
      width: 270px;
    }
  `,
  menuList: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: all 0.1s ease-in-out;

    ${theme.media.mobile} {
      display: none;
    }
  `,
};
