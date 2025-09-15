import { forwardRef, type InputHTMLAttributes } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { checkBoxCss } from './CheckBox.styles';
import { Check } from 'lucide-react';
import theme from '@/_theme';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  cssStyle?: Interpolation<Theme>;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ children, cssStyle, ...restProps }, ref) => {
  return (
    <label css={[checkBoxCss.label, cssStyle]}>
      <input type="checkbox" ref={ref} {...restProps} hidden />
      <span css={[checkBoxCss.checkBox, restProps.checked && checkBoxCss.checkBoxActive]}>
        {restProps.checked && <Check color={theme.colors.white} size={12} />}
      </span>
      <div>{children}</div>
    </label>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
