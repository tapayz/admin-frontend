import theme from '@/_theme';
import { css } from '@emotion/react';

export const confirmModalCss = {
  modal: css`
    max-width: 400px;
    width: calc(100% - 40px);
    height: 180px;
    background-color: white;
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
    gap: 10px;
    justify-content: space-between;
    height: 100%;
  `,
  title: css`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.mainDefault};
    text-align: center;
    border-bottom: 1px solid ${theme.colors.coolGray100};
    padding-bottom: 5px;
  `,
  message: css`
    font-size: 14px;
    color: ${theme.colors.coolGray600};
    text-align: center;
  `,
  buttonWrapper: css`
    width: 100%;
    justify-content: center;
    display: flex;
    gap: 10px;

    button {
      flex: 1;
    }
  `,
};
