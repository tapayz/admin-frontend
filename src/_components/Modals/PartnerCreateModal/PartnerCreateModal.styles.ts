import theme from '@/_theme';
import { css } from '@emotion/react';

export const partnerCreateModalCss = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  `,
  title: css`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.mainDefault};
  `,
  formWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    flex: 1;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
  `,
  formContentWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    width: 100%;
    flex: 1;
  `,
  gridWrapper: (rowNum: number) => css`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 20px;
    width: 100%;

    ${theme.media.mobile} {
      grid-template-columns: repeat(${rowNum}, 1fr);
    }
  `,
  prefixWrapper: css`
    display: flex;
    gap: 10px;
    align-items: center;
  `,
  prefixHeading: css`
    display: flex;
    gap: 10px;
    color: #697077;
    align-items: end;
  `,
  prefixHeadingText: css`
    font-size: 13px;
    font-weight: 400;
  `,
  prefixHeadingDesc: css`
    font-size: 11px;
    font-weight: 400;
    color: ${theme.colors.warningLight};
  `,
  prefixInput: css`
    width: 40px;
    padding: 0 10px;

    input {
      text-align: center;
    }
  `,
  inputSection: css`
    width: 100%;
    align-self: baseline;
    .heading {
      color: ${theme.colors.coolGray500};
      font-size: 13px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  `,
  passwordInfo: css`
    display: block;
    margin-top: 2px;
    font-size: 11px;
    color: ${theme.colors.warningDefault};
  `,
  textarea: css`
    align-self: baseline;
  `,
  numberInput: css`
    input {
      text-align: right;
    }
  `,
  buttonWrapper: css`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
  `,
  labelWrapper: css`
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    button {
      font-size: 12px;
    }
  `,
};
