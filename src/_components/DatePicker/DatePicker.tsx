import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDatePicker, { type DatePickerProps as ReactDatePickerProps } from 'react-datepicker';
import { Global, type Interpolation, type Theme } from '@emotion/react';
import DatePickerCustomInput from './customs/DatePickerCustomInput';
import DatePickerCustomHeader from './customs/DatePickerCustomHeader';
import DatePickerCustomDay from './customs/DatePickerCustomDay';
import DatepickerCustomContainer from './customs/DatepickerCustomContainer';
import type { CalendarContainerProps } from 'react-datepicker/dist/calendar_container';
import { isDateRange, isDateSingle, isSingleChange } from './types/datePicker.types';
import { reactDatePickerCss } from './DatePicker.styles';

type DatePickerProps = ReactDatePickerProps & {
  cssStyle?: Interpolation<Theme>;
  timeFormat?: string; // 시간 형식 (기본: 'HH:mm')
  timeIntervals?: number; // 시간 간격 분 단위 (기본: 15분)
  dateFormat?: string; // 날짜 형식 override
  showTimeSelectOnly?: boolean; // 시간만 선택
  isShowTime?: boolean;
};

// 취소, 완료 버튼으로 인해 내부에서 상태값을 관리할 수 밖에 없는 구조
export default function DatePicker({
  cssStyle,
  timeFormat = 'HH',
  timeIntervals = 15,
  dateFormat,
  showTimeSelectOnly = false,
  isShowTime = true,
  ...props
}: DatePickerProps) {
  const ref = useRef<ReactDatePicker | null>(null);

  // 완료 이전까지 내부에서 관리하는 상태값
  const [date, setDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // 초기값 설정
  useEffect(() => {
    if (props.selectsRange) {
      setDateRange([props.startDate ?? null, props.endDate ?? null]);
    } else {
      setDate(props.selected ?? null);
    }
  }, [props.endDate, props.selected, props.selectsRange, props.startDate]);

  const onClose = useCallback(() => ref.current?.setOpen(false), []);

  // 내부 상태 변경
  const onChange = useCallback(
    (selectedDate: Date | null | [Date | null, Date | null] | Date[]) => {
      if (props.selectsRange && isDateRange(selectedDate)) {
        setDateRange(selectedDate);
      } else if (isDateSingle(selectedDate)) {
        setDate(selectedDate);
      }
    },
    [props]
  );

  const onTimeChange = useCallback(
    (time: Date) => {
      if (date) {
        // 기존 날짜에 새로운 시간만 적용
        const newDate = new Date(date);
        newDate.setHours(time.getHours(), 0, 0, 0);
        setDate(newDate);
      } else {
        // 날짜가 없으면 오늘 날짜에 시간 적용
        const today = new Date();
        today.setHours(time.getHours(), 0, 0, 0);
        setDate(today);
      }
    },
    [date]
  );

  // 취소 버튼 클릭 시 초기값으로 돌리기
  const onCancel = useCallback(() => {
    if (props.selectsRange) {
      onChange([props.startDate ?? null, props.endDate ?? null]);
    } else {
      onChange(props.selected ?? null);
    }

    onClose();
  }, [onChange, onClose, props.endDate, props.selected, props.selectsRange, props.startDate]);

  // 완료 버튼 클릭 시 외부에서 전달된 onChange 함수 실행
  const onComplete = useCallback(() => {
    if (!props.onChange) {
      onClose();
      return;
    }

    if (props.selectsRange) {
      props.onChange(dateRange);
    } else if (isSingleChange(props.onChange)) {
      props.onChange(date);
    }

    onClose();
  }, [date, dateRange, onClose, props]);

  const formatDateForInput = useCallback(
    (selectedDate: Date | null) => {
      if (!selectedDate) return '';

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');

      if (isShowTime) {
        const hour = String(selectedDate.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}`; // 🔥 시간 포함
      }

      return `${year}-${month}-${day}`;
    },
    [date, onChange]
  );

  const inputValue = formatDateForInput(date);

  return (
    <>
      {/* Portal을 사용할 경우 default portal element를 document.body로 설정하기 때문에 Global로 적용 */}
      <Global styles={[reactDatePickerCss.datepicker, cssStyle]} />

      <div css={[reactDatePickerCss.datepicker, cssStyle]}>
        <ReactDatePicker
          {...props}
          ref={ref}
          showPopperArrow={false}
          shouldCloseOnSelect={false} // 날짜 선택해도 달력이 안닫히도록 설정
          dateFormat={'yyyy-MM-dd-HH'} // 인풋에 나타나는 날짜 형식
          dateFormatCalendar="yyyy.MM" // 팝업 head 날짜 형식 지정
          popperPlacement="bottom"
          customInput={<DatePickerCustomInput isReadOnly value={inputValue} customValue={inputValue} />}
          calendarContainer={(containerProps: CalendarContainerProps) => (
            <DatepickerCustomContainer
              //
              {...containerProps}
              onCancel={onCancel}
              onComplete={onComplete}
              showCustomTimeSelect={isShowTime}
              selectedTime={date}
              onTimeChange={onTimeChange}
              minHour={0}
              maxHour={23}
            />
          )}
          selected={props.selectsRange ? dateRange[0] : date}
          startDate={
            props.selectsRange ? dateRange[0] ?? undefined : props.selectsStart ? date ?? undefined : undefined
          }
          endDate={props.selectsRange ? dateRange[1] ?? undefined : props.selectsEnd ? date ?? undefined : undefined}
          onChange={onChange}
          renderCustomHeader={DatePickerCustomHeader}
          renderDayContents={DatePickerCustomDay}
          onClickOutside={onCancel}
        />
      </div>
    </>
  );
}
