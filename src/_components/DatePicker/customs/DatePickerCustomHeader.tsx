import FeatherIcons from '@/_theme/featherIcons';
import dayjs from 'dayjs';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

export default function DatePickerCustomHeader(props: ReactDatePickerCustomHeaderProps) {
  return (
    <div className="custom-header">
      <button onClick={props.decreaseMonth}>
        <FeatherIcons.ChevronLeft color="#ccc" size={16} />
      </button>

      <span>{dayjs(props.date).format('YYYY. MM')}</span>

      <button onClick={props.increaseMonth}>
        <FeatherIcons.ChevronRight color="#ccc" size={16} />
      </button>
    </div>
  );
}
