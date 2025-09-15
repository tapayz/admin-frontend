import React, { useState } from 'react';
import { infoTextCss } from './InfoText.styles';
import { Info } from 'lucide-react';
import theme from '@/_theme';
interface InfoTextProps {
  infoText: string;
  message: string;
}

const InfoText = ({ infoText, message }: InfoTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div css={infoTextCss.wrapper}>
      <p css={infoTextCss.infoText} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        {infoText}
        <Info size={12} fill={theme.colors.mainDark} stroke={theme.colors.white} />
      </p>
      {isOpen && (
        <div css={infoTextCss.message}>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default InfoText;
