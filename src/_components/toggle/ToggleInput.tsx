import React from 'react';

interface ToggleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  children: React.ReactNode;
}

const ToggleInput = ({ label, checked = false, children, ...props }: ToggleInputProps) => {
  return (
    <label htmlFor={label} className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        className="peer sr-only"
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      />
      <div
        className={`h-[20px] w-[36px] rounded-full ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } transition-all duration-300`}
      >
        <div
          className={`absolute left-[2px] top-[2px] h-[16px] w-[16px] rounded-full border bg-white ${
            checked ? 'translate-x-[17px] border-blue-600' : 'translate-x-[0px] border-gray-300'
          } transition-all duration-300`}
        />
      </div>
      <span className="ml-2 text-[13px]">{children}</span>
    </label>
  );
};

export default ToggleInput;
