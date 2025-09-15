import "./styles/react-select.css";

import { useEffect, useId, useState } from "react";
import ReactSelect, { GroupBase, Props } from "react-select";
import { DropdownIndicator } from "./DropdownIndicator/DropdownIndicator";
import { Global, type Interpolation, type Theme } from "@emotion/react";
import { SelectOption } from "./SelectOption/SelectOption";
import { selectCss, selectPortalCss } from "./Select.styles";

export interface SelectProps {
  isPortal?: boolean;
  cssStyle?: Interpolation<Theme>;
}

export default function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  isPortal,
  cssStyle,
  ...props
}: SelectProps & Props<Option, IsMulti, Group>) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isPortal) return;

    setPortalTarget(props.menuPortalTarget || document.body);
  }, [isPortal, props.menuPortalTarget]);

  return (
    <>
      {/* Portal을 사용할 경우 default portal element를 document.body로 설정하기 때문에 Global로 적용 */}
      {isPortal && <Global styles={[selectPortalCss.portalMenu, cssStyle]} />}

      <div css={[selectCss.control, selectCss.menu, cssStyle]}>
        <ReactSelect
          //
          {...props}
          instanceId={useId()}
          isSearchable={false}
          menuPortalTarget={portalTarget}
          menuPlacement="bottom"
          unstyled
          className="react-select-container"
          classNamePrefix="react-select"
          components={{
            DropdownIndicator: DropdownIndicator as any,
            Option: SelectOption,
            ...props.components,
          }}
        />
      </div>
    </>
  );
}
