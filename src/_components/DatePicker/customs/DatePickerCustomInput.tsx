import { forwardRef } from 'react';
import classNames from 'classnames';
import type { DatePickerProps } from 'react-datepicker';
import FeatherIcons from '@/_theme/featherIcons';

interface CustomInputProps {
  value?: string;
  onClick?: DatePickerProps['onInputClick'];
  isReadOnly?: boolean;
  customValue?: string;
}

const DatePickerCustomInput = forwardRef(
  ({ isReadOnly, value, customValue, ...props }: CustomInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const displayValue = customValue || value || '';
    return (
      <div className={classNames('custom-input-container', { hasValue: !!value })} onClick={props.onClick}>
        <input {...props} ref={ref} readOnly={isReadOnly} value={displayValue} />
        <FeatherIcons.Calendar color="#ccc" />
      </div>
    );
  }
);

DatePickerCustomInput.displayName = 'DatePickerCustomInput';
export default DatePickerCustomInput;
