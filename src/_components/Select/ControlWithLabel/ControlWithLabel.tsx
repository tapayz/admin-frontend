import { components, type ControlProps, type GroupBase } from 'react-select';
import { controlWithLabelCss } from './ControlWithLabel.styles';

interface ControlWithLabelProps<Option = unknown> extends ControlProps<Option, boolean, GroupBase<Option>> {
  label: string;
}

export function ControlWithLabel<Option = unknown>({ label, ...restProps }: ControlWithLabelProps<Option>) {
  return (
    <components.Control {...restProps}>
      <label css={controlWithLabelCss.label}>{label}</label>
      <div css={controlWithLabelCss.valueIndicator}>{restProps.children}</div>
    </components.Control>
  );
}
