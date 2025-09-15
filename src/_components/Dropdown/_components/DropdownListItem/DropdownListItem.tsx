import React from 'react';
import { DropdownListItemStyles } from './DropdownListItem.styles';
import { Interpolation, Theme } from '@emotion/react';

interface DropdownListItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  cssStyle?: Interpolation<Theme>;
  disabled?: boolean;
}

const DropdownListItem = ({ icon, text, onClick, cssStyle, disabled }: DropdownListItemProps) => {
  return (
    <li css={cssStyle}>
      <button type="button" onClick={onClick} css={DropdownListItemStyles.item} disabled={disabled}>
        <span>{icon}</span>
        <span css={DropdownListItemStyles.text}>{text}</span>
      </button>
    </li>
  );
};

export default DropdownListItem;
