import theme from "@/_theme";
import { css } from "@emotion/react";

export const myPageCss = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  section: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  `,
  title: css`
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid ${theme.colors.coolGray100};
    padding-bottom: 10px;
  `,
  inputSectionWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  inputSection: css`
    border-bottom: 1px solid ${theme.colors.coolGray50};
    grid-template-columns: 1fr;
    .heading {
      padding: 10px 0 5px 0;
      color: ${theme.colors.coolGray500};
      font-size: 14px;
    }
    .content {
      padding: 0 0 10px 0;
      font-size: 12px;
    }

    ${theme.media.mobile} {
      grid-template-columns: auto 1fr;
      .heading {
        width: 230px;
        border-right: 1px solid ${theme.colors.coolGray50};
        border-bottom: none;
      }

      .content {
        font-size: 14px;
        padding: 10px 10px 10px 20px;
      }
    }
  `,
  apiKeyWrapper: css`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
  affiliatedAgentInfoWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${theme.media.mobile} {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
  `,
  arrowDown: css`
    transform: translateX(50px);
  `,
  affiliatedAgentInfo: css`
    display: flex;
    flex-direction: column;
  `,
  affiliatedAgentInfoItemNickname: css`
    color: ${theme.colors.coolGray500};
  `,
  affiliatedAgentInfoItemId: css`
    color: ${theme.colors.mainText};
    font-weight: 600;
  `,
  affiliatedAgentInfoItem: css`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  apiInfoWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  apiInfoList: css`
    font-size: 13px;
    display: grid;
    gap: 3px;

    li {
      color: ${theme.colors.coolGray500};
    }
  `,
  apiInfoInputWrapper: css`
    display: flex;
    border: 1px solid ${theme.colors.coolGray100};
    border-radius: 10px;
    overflow: hidden;
    max-width: 600px;
  `,
  apiInfoInput: css`
    flex: 1;
    min-width: 150px;

    padding: 0 5px 0 10px;

    ${theme.media.mobile} {
      padding: 0px 20px;
    }
  `,
  apiInfoInputButton: css`
    background-color: ${theme.colors.mainDefault};
    color: ${theme.colors.white};
    padding: 5px 10px;
    flex-shrink: 0;

    ${theme.media.mobile} {
      padding: 5px 20px;
    }
  `,
  apiInfoInputDescription: css`
    font-size: 13px;
  `,
  walletTypeBadge: css`
    align-self: baseline;
    display: inline-block;
    margin-bottom: 3px;
  `,
  walletTypeChange: css`
    font-size: 12px;
    color: ${theme.colors.warningDefault};
  `,
  toggleButtonWrapper: css`
    display: flex;
    gap: 20px;
    align-items: center;
  `,
  passwordChangeWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  passwordButtonWrapper: css`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    flex-wrap: wrap;
  `,
};
