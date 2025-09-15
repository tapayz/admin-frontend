export interface SelectOption<TValue = string | number | boolean | undefined> {
  label: string;
  value: TValue;
  isDisabled?: boolean;
}
