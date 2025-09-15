import { GroupBase, OptionProps, components } from 'react-select';
import * as FeatherIcons from 'react-feather';
import { selectOptionsCss } from './SelectOption.styles';

export const SelectOption = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  return (
    <components.Option {...props} css={selectOptionsCss.option}>
      {props.label}
      {props.isSelected ? <FeatherIcons.Check size={14} /> : null}
    </components.Option>
  );
};
