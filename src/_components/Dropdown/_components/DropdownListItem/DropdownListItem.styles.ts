import theme from '@/_theme';
import { css } from '@emotion/react';

export const DropdownListItemStyles = {
  item: css`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
    width: 100%;

    color: ${theme.colors.coolGray500};
    &:hover {
      color: ${theme.colors.coolGray900};
    }

    &:disabled {
      color: ${theme.colors.coolGray300};
    }
  `,
  text: css``,
};
