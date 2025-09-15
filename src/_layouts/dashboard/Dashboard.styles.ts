import theme from "@/_theme";
import { css } from "@emotion/react";

export const dashboardCss = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  chartsRow: css`
    display: flex;
    gap: 20px;
    width: 100%;
  `,
  chartWrapper: css`
    width: calc(50% - 10px);
  `,
  userInfo: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  userInfoWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background-color: ${theme.colors.white};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  `,
  userInfoAvatar: css`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  userInfoCountWrapper: css`
    display: flex;
    gap: 5px;
    flex-direction: column;
    max-width: 350px;
    width: 100%;
    flex: 1;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray100};
  `,
  userInfoCountTitle: css`
    font-size: 16px;
    font-weight: 700;

    ${theme.media.mobile} {
      font-size: 18px;
    }
  `,
  userInfoCount: css`
    display: flex;
    gap: 10px;
  `,
  userInfoNameWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  userName: css`
    font-size: 16px;
    font-weight: 700;

    ${theme.media.mobile} {
      font-size: 24px;
    }
  `,
  userInfoBadge: css`
    align-self: flex-start;
  `,
};
