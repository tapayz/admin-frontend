import theme from "@/_theme";
import { css, keyframes } from "@emotion/react";

export const HEADER_PC_HEIGHT = 70;
export const HEADER_MOBILE_HEIGHT = 50;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const headerCss = {
  header: css`
    height: ${HEADER_PC_HEIGHT}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.coolGray100};
    padding: 0 20px;
    width: 100%;
    background-color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 100;
    position: sticky;
    top: 0;
    left: 0;

    ${theme.media.mobile} {
      padding: 0 20px;
      width: calc(100% - 270px);
      left: 270px;
    }

    ${theme.media.tablet} {
      height: ${HEADER_MOBILE_HEIGHT}px;
    }
  `,
  headerSideBar: css`
    left: 0;
    width: 100%;
    ${theme.media.mobile} {
      width: calc(100% - 35px);
      left: 35px;
    }
  `,
  headerLeft: css`
    display: flex;
    align-items: center;
    gap: 5px;

    ${theme.media.mobile} {
      gap: 20px;
    }
  `,
  agentSectionWrapper: css`
    display: flex;
    align-items: center;
    gap: 5px;

    button {
      gap: 7px;
      font-size: 12px;
      justify-content: space-between;
      &:hover {
        background-color: ${theme.colors.mainDark};
        color: ${theme.colors.coolGray50};
      }
    }
  `,
  agentSectionButton: css`
    width: 110px;
  `,
  headerRight: css`
    display: flex;
    align-items: center;
    gap: 5px;

    ${theme.media.mobile} {
      gap: 15px;
    }
  `,
  timeButton: css`
    border-radius: 100%;
    overflow: hidden;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);
    color: ${theme.colors.mainDark};

    &:hover {
      background-color: ${theme.colors.mainPoint};
      color: ${theme.colors.mainText};
    }
    transition: all 0.3s ease;

    ${theme.media.mobile} {
      width: 30px;
      height: 30px;
    }
  `,
  timeList: css`
    height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 110px;
  `,
  timeItem: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 15px;
    width: 100%;
    p {
      font-size: 12px;
      color: ${theme.colors.coolGray500};
    }

    &:hover {
      background-color: ${theme.colors.mainPoint};
      color: ${theme.colors.mainText};

      p {
        color: ${theme.colors.mainText};
      }
    }

    ${theme.media.mobile} {
      gap: 15px;
    }
  `,
  timeItemActive: css`
    background-color: ${theme.colors.mainPoint};
    color: ${theme.colors.mainText};

    p {
      color: ${theme.colors.mainText};
    }
  `,
  countryButton: css`
    border-radius: 100%;
    overflow: hidden;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);

    svg {
      width: 18px;
    }

    &:hover {
      background-color: ${theme.colors.mainDefault};
      color: ${theme.colors.coolGray50};
    }
    transition: all 0.3s ease;

    ${theme.media.mobile} {
      width: 30px;
      height: 30px;
    }
  `,
  countryItem: css`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;

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
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.1);

    svg {
      width: 18px;
    }
  `,
  profileButton: css`
    overflow: hidden;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    font-size: 12px;

    span {
      color: ${theme.colors.coolGray800};
    }

    ${theme.media.mobile} {
      font-size: 14px;
      gap: 5px;
    }
  `,
  profileList: css`
    display: flex;
    flex-direction: column;
  `,
  profileItem: css`
    padding: 8px 15px;

    &:nth-of-type(n + 2) {
      border-top: 1px solid ${theme.colors.coolGray100};
    }
  `,
  profile: css`
    font-size: 12px;
    color: ${theme.colors.coolGray500};
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: black;
    }
  `,
  signOutButton: css`
    font-size: 12px;
    color: ${theme.colors.warningLight};
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: ${theme.colors.warningDefault};
    }
  `,
  notificationButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: ${theme.colors.mainDark};
    position: relative;
    svg {
      color: ${theme.colors.mainLight};
    }

    &:hover {
      background-color: ${theme.colors.mainDark};
    }
    transition: all 0.3s ease;
  `,
  notificationBadge: css`
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #0f8da5;
    position: absolute;
    top: 0;
    right: 2px;
    animation: ${fadeInOut} 3s ease-in-out infinite;
  `,
  notification: css`
    display: flex;
    flex-direction: column;
  `,
  notificationHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid ${theme.colors.coolGray100};

    p {
      font-size: 12px;
      color: ${theme.colors.coolGray600};
    }
  `,
  notificationNotice: css`
    color: ${theme.colors.mainDefault};
    font-size: 12px;
    font-weight: 700;
  `,
  notificationList: css`
    height: 270px;
    overflow-y: auto;
    overflow-x: hidden;
    li:nth-of-type(n + 2) {
      border-top: 1px solid ${theme.colors.coolGray100};
    }
  `,
  notificationItem: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    width: 350px;
    gap: 15px;

    transition: all 0.3s ease;

    &:hover {
      background-color: ${theme.colors.coolGray50};
    }
  `,
  notificationItemIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #bfdeff;

    svg {
      color: ${theme.colors.mainLight};
    }
  `,
  notificationReadIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  notificationItemTitle: css`
    font-size: 12px;
    color: ${theme.colors.coolGray500};
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `,
  notificationRead: css`
    color: ${theme.colors.mainDefault};
  `,
  notificationUnread: css`
    color: ${theme.colors.mainPoint};
  `,
  readAllButton: css`
    font-size: 12px;
    color: ${theme.colors.coolGray500};
    padding: 10px 15px;
    border-top: 1px solid ${theme.colors.coolGray100};
  `,
};
