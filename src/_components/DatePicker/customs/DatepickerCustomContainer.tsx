import React from "react";
import type { CalendarContainerProps } from "react-datepicker/dist/calendar_container";
import { reactDatePickerCss } from "../DatePicker.styles";
import Button from "../../Button/Button";
import { useLocale } from "@/_hooks/useLocale";
import DatePickerCustomTime from "./DatePickerCustomTime";

interface Props extends CalendarContainerProps {
  onCancel: () => void;
  onComplete: () => void;
  showCustomTimeSelect?: boolean;
  selectedTime?: Date | null;
  onTimeChange?: (time: Date) => void;
  minHour?: number;
  maxHour?: number;
}

export default function DatepickerCustomContainer({
  children,
  onCancel,
  onComplete,
  showCustomTimeSelect = false,
  selectedTime,
  onTimeChange,
  minHour = 0,
  maxHour = 23,
}: Props) {
  const { t } = useLocale();

  return (
    <div className="react-datepicker" css={reactDatePickerCss.container}>
      <div css={reactDatePickerCss.customTimeWrapper}>
        {children}
        {showCustomTimeSelect && (
          <DatePickerCustomTime
            selectedTime={selectedTime}
            onTimeChange={onTimeChange ?? (() => {})}
            minHour={minHour}
            maxHour={maxHour}
            timeFormat="24"
          />
        )}
      </div>
      <div css={reactDatePickerCss.buttonGroup}>
        <Button type="button" buttonType="gray" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="button" buttonType="primary" onClick={onComplete}>
          {t("complete")}
        </Button>
      </div>
    </div>
  );
}
