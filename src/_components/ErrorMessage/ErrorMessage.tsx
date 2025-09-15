import type { Interpolation, Theme } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import { errorMessageCss } from './ErrorMessage.styles';

interface ErrorMessageProps {
  cssStyle?: Interpolation<Theme>;
  isRelative?: boolean;
}

export default function ErrorMessage({ children, cssStyle, isRelative = false }: PropsWithChildren<ErrorMessageProps>) {
  return (
    <p className="error-message" css={[errorMessageCss.text, cssStyle, isRelative && errorMessageCss.relative]}>
      {children}
    </p>
  );
}
