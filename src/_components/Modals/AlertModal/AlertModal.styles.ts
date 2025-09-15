import theme from '@/_theme';
import { css } from '@emotion/react';

export const alertModalCss = {
  modal: css`
    max-width: 400px;
    width: calc(100% - 40px);
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
  `,
};
