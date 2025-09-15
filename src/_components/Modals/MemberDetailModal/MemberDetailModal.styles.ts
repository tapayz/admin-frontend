import theme from "@/_theme";
import { css } from "@emotion/react";

export const memberDetailModalCss = {
  modal: css`
    max-width: 800px;
    width: calc(100% - 40px);
    max-height: 90vh;
    overflow-y: auto;
    background-color: #f3f4f7;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  title: css`
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid ${theme.colors.coolGray100};
    padding-bottom: 5px;
  `,
  content: css`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  section: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  `,
  sectionTitle: css`
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid ${theme.colors.coolGray100};
    padding-bottom: 8px;
    margin-bottom: 10px;
  `,
  inputSectionWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  inputSection: css`
    border-bottom: 1px solid ${theme.colors.coolGray50};
    grid-template-columns: 1fr;
    .heading {
      width: 120px;
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
        border-right: 1px solid ${theme.colors.coolGray50};
        border-bottom: none;
      }

      .content {
        font-size: 14px;
        padding: 10px 10px 10px 20px;
      }
    }
  `,
  nestedInputSection: css`
    .heading {
      width: 80px;
      padding: 5px 0 3px 0;
      font-size: 12px;
      color: ${theme.colors.coolGray400};
    }
    .content {
      padding: 0 0 0 10px;
      font-size: 11px;
    }

    ${theme.media.mobile} {
      .content {
        font-size: 13px;
      }
    }
  `,
  badge: css`
    align-self: baseline;
    width: fit-content;
  `,
};