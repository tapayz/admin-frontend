import theme from '@/_theme';
import { css } from '@emotion/react';

export const holdingsSectionCss = {
  wrapper: css`
    display: flex;
    gap: 30px;
    width: 100%;
  `,
  content: css`
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-around;
  `,
  item: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    font-size: 12px;

    ${theme.media.mobile} {
      font-size: 14px;
    }
  `,
  itemTitle: css`
    color: ${theme.colors.mainDefault};
  `,
  itemPrice: css`
    font-size: 12px;
    color: ${theme.colors.coolGray700};

    ${theme.media.mobile} {
      font-size: 15px;
    }
  `,
  totalTitle: css`
    color: ${theme.colors.coolGray500};
  `,
  totalPrice: css`
    font-size: 15px;
    font-weight: 700;
    color: ${theme.colors.coolGray700};
  `,
};
