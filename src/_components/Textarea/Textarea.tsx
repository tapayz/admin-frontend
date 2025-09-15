import type { Interpolation, Theme } from '@emotion/react';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { textareaCss } from './Textarea.styles';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  cssStyle?: Interpolation<Theme>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ cssStyle, isError, ...restProps }, ref) => {
  return <textarea ref={ref} {...restProps} css={[textareaCss.textarea, !restProps.disabled && !isError && textareaCss.hoverFocus, restProps.disabled && textareaCss.disabled, isError && textareaCss.error, cssStyle]} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
