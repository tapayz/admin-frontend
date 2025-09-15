import { components, DropdownIndicatorProps } from 'react-select';
import { dropdownIndicatorOpenStyle, dropdownIndicatorStyle } from './DropdownIndicator.styles';
import * as FeatherIcons from 'react-feather';

export const DropdownIndicator = <Option = unknown,>(props: DropdownIndicatorProps<Option>) => {
  return (
    <components.DropdownIndicator {...props}>
      <FeatherIcons.ChevronDown
        color={'#A2A9B0'}
        size={16}
        css={[dropdownIndicatorStyle, props.selectProps.menuIsOpen && dropdownIndicatorOpenStyle]}
      />
    </components.DropdownIndicator>
  );
};
