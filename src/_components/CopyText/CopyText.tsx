import { Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { copyTextStyles } from "./CopyText.styles";
import { useLocale } from "@/_hooks/useLocale";
import "dayjs/locale/ko";

interface CopyTextProps {
  text: string;
  isFirst?: boolean;
  isLast?: boolean;
  isView?: boolean;
}

/**
 * @param text - copy text
 * @param isFirst - 텍스트를 첫번째부터 6글자까지 보여줄지 여부
 * @param isLast - 텍스트를 마지막부터 4글자까지 보여줄지 여부
 * @param isView - 텍스트를 보여줄지 여부
 * @returns
 */
const CopyText = ({ text, isFirst, isLast, isView }: CopyTextProps) => {
  const { t } = useLocale();
  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast.success(t("copyMessage"));
  };

  return (
    <button onClick={handleCopyText} css={copyTextStyles.button}>
      {isFirst && `${text.slice(0, 6)}...`}
      {isLast && `...${text.slice(text.length - 4)}`}
      {isView && text}
      <Copy size={12} />
    </button>
  );
};

export default CopyText;
