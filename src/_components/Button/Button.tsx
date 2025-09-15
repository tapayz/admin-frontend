import type { Interpolation, Theme } from '@emotion/react';
import { useMemo } from 'react';
import { buttonCss, buttonSize, buttonType } from './Button.styles';

export type ButtonType = keyof typeof buttonType;
export type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

export default function Button({
  buttonType,
  leftIcon,
  rightIcon,
  children,
  cssStyle,
  size,
  ...restProps
}: ButtonProps) {
  const buttonTypeStyle = useMemo(() => buttonCss[buttonType], [buttonType]);

  return (
    <button {...restProps} css={[buttonCss.button, buttonTypeStyle, buttonSize[size ?? 'medium'], cssStyle]}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
