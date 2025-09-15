import type { DatePickerProps } from 'react-datepicker';

export function isDateRange(value: Date | null | [Date | null, Date | null] | Date[]): value is [Date | null, Date | null] {
  return Array.isArray(value) && value.length === 2 && (value[0] instanceof Date || value[0] === null) && (value[1] instanceof Date || value[1] === null);
}

export function isDateSingle(value: Date | null | [Date | null, Date | null] | Date[]): value is Date | null {
  return value instanceof Date || value === null;
}

export function isSingleChange(onChange: DatePickerProps['onChange']): onChange is (date: Date | null) => void {
  return typeof onChange === 'function' && onChange.length === 1; // 단일 Date를 인자로 받는 함수로 간주
}
