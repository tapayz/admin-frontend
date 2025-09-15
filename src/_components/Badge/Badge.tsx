import React from 'react';
import { badgeCss, badgeStatusCss, badgeTypeCss } from './Badge.styles';
import { Interpolation, Theme } from '@emotion/react';
export type BadgeType = keyof typeof badgeTypeCss;

interface BadgeProps {
  children: React.ReactNode;
  type: BadgeType;
  cssStyle?: Interpolation<Theme>;
  index?: number;
}

const Badge = ({ children, type, cssStyle, index }: BadgeProps) => {
  return (
    <span
      className="badge"
      css={[badgeCss.wrapper, badgeTypeCss[type], index && badgeStatusCss.status(index ?? 0), cssStyle]}
    >
      {children}
    </span>
  );
};

export default Badge;
