import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

interface DatePickerCustomTimeProps {
  selectedTime?: Date | null;
  onTimeChange: (time: Date) => void;
  minHour?: number;
  maxHour?: number;
  timeFormat?: '12' | '24';
}

const DatePickerCustomTime: React.FC<DatePickerCustomTimeProps> = ({
  selectedTime,
  onTimeChange,
  minHour = 0,
  maxHour = 23,
  timeFormat = '24',
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(9); // 기본값 9시

  // 선택된 시간에서 초기값 설정
  useEffect(() => {
    if (selectedTime) {
      setSelectedHour(selectedTime.getHours());
    }
  }, [selectedTime]);

  // 시간 옵션 생성
  const getHourOptions = () => {
    const hours = [];
    for (let i = minHour; i <= maxHour; i++) {
      hours.push(i);
    }
    return hours;
  };

  // 시간 변경 핸들러
  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
    const now = new Date();
    const newTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0);
    onTimeChange(newTime);
  };

  return (
    <div css={timePickerStyles.container}>
      <div css={timePickerStyles.header}>Time</div>

      <div css={timePickerStyles.timeContainer}>
        <div css={timePickerStyles.scrollContainer}>
          {getHourOptions().map((hour) => (
            <div
              key={hour}
              css={[timePickerStyles.timeItem, selectedHour === hour && timePickerStyles.selectedItem]}
              onClick={() => handleHourChange(hour)}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const timePickerStyles = {
  container: css`
    background: white;
    border-left: 1px solid #ddd;
    width: 60px;
  `,

  header: css`
    font-weight: bold;
    font-size: 12px;
    color: #333;
    margin-bottom: 8px;
    text-align: center;
  `,

  timeContainer: css`
    display: flex;
    justify-content: center;
  `,

  scrollContainer: css`
    flex-grow: 1;
    height: 100%;
    overflow-y: auto;
    max-height: 302px;
    width: 100%;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 2px;
    }
  `,

  timeItem: css`
    padding: 6px 8px;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #f5f5f5;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }

    &:last-child {
      border-bottom: none;
    }
  `,

  selectedItem: css`
    background-color: #007bff;
    color: white;
    font-weight: bold;

    &:hover {
      background-color: #0056b3;
    }
  `,
};

export default DatePickerCustomTime;
