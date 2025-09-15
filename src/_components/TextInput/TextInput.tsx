import { forwardRef, useCallback, useState } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { textInputWrapperCss } from './TextInput.styles';
import { CircleX } from 'lucide-react';
import FeatherIcons from '@/_theme/featherIcons';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDirty?: boolean;
  onClear?: () => void;
  isError?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  cssStyle?: Interpolation<Theme>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ isDirty, onClear, isError, rightIcon, leftIcon, cssStyle, ...restProps }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const onTogglePasswordVisibility = useCallback(() => setIsPasswordVisible((prev) => !prev), []);

    return (
      <label
        css={[
          textInputWrapperCss.wrapper,
          !restProps.disabled && !isError && textInputWrapperCss.hoverFocus,
          restProps.disabled && textInputWrapperCss.disabled,
          isError && textInputWrapperCss.error,
          isDirty && textInputWrapperCss.dirty,
          cssStyle,
        ]}
        htmlFor={restProps.id}
      >
        {leftIcon}
        <input
          {...restProps}
          ref={ref}
          type={restProps.type === 'password' && isPasswordVisible ? 'text' : restProps.type}
          css={textInputWrapperCss.input}
          id={restProps.id}
        />

        <button onClick={onClear} type="button" css={textInputWrapperCss.clear}>
          <CircleX size={20} fill={'var(--CoolGray-30,#c2c4c8)'} />
        </button>

        {restProps.type === 'password' && (
          <button type="button" onClick={onTogglePasswordVisibility} css={textInputWrapperCss.passwordVisible}>
            {isPasswordVisible ? (
              <FeatherIcons.EyeOff color={'var(--CoolGray-30,#c2c4c8)'} size={20} />
            ) : (
              <FeatherIcons.Eye color={'var(--CoolGray-30,#c2c4c8)'} size={20} />
            )}
          </button>
        )}

        {rightIcon}
      </label>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
