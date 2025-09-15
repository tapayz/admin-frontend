import { Interpolation, Theme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { dropdownCss } from './Dropdown.styles';

interface DropdownProps {
  trigger: React.ReactNode;
  placement?: 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';
  className?: string;
  itemClassName?: string;
  children?: React.ReactNode;
  dropdownCssStyle?: Interpolation<Theme>;
  triggerCssStyle?: Interpolation<Theme>;
  onOpen?: () => void;
}

const Dropdown = ({
  trigger,
  placement = 'bottom-start',
  children,
  dropdownCssStyle,
  triggerCssStyle,
  onOpen,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  // 외부 클릭 감지
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperElement &&
      !popperElement.contains(event.target as Node) &&
      referenceElement &&
      !referenceElement.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // 컴포넌트 마운트/언마운트 시 이벤트 리스너 등록/제거
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, popperElement]);

  // children 클릭 시 드롭다운 닫기
  const handleChildrenClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      setIsOpen(false);
    }
  };

  return (
    <div css={[triggerCssStyle]}>
      <div ref={setReferenceElement} onClick={() => setIsOpen(!isOpen)} className="inline-block cursor-pointer w-full">
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          css={[dropdownCss.dropdown, dropdownCssStyle]}
          onClick={handleChildrenClick}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
