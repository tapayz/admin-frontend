import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { AlertTriangle, Copy } from "lucide-react";
import { useLocale } from "@/_hooks/useLocale";

// Missing tooltip components - creating basic implementations that match shadcn/ui structure
const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">{children}</div>
);

const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const TooltipTrigger = ({
  children,
  asChild: _,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => <div className="inline-block">{children}</div>;

const TooltipContent = ({ children }: { children: React.ReactNode }) => (
  <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded mb-2 whitespace-nowrap">
    {children}
  </div>
);

const Button = ({
  children,
  variant: _,
  size: __,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 rounded ${className}`}
  >
    {children}
  </button>
);

type Props = {
  data?: any;
};

function AddressViewer({ data }: Props) {
  const { t } = useLocale();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.wallet?.address ?? "");
    // You might want to add a toast notification here
  };

  function genQrValue() {
    console.dir(data);

    return data.wallet.address;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[160px] h-[160px] bg-gray-100 shadow-[0_0_4px_rgba(0,0,0,0.2)] rounded flex items-center justify-center">
          <QRCodeSVG value={genQrValue()} bgColor={"#e5e7eb"} size={140} />
        </div>
      </div>
      <div className="space-y-2 w-[calc(100%-40px)] mx-auto">
        <div className="bg-gray-100 py-1 px-2 rounded-lg text-center break-all flex items-center justify-between">
          <span className="flex-grow">{data.wallet.address}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("payment.addressCopy")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className=" text-yellow-600 text-center text-xs md:text-sm">
          <AlertTriangle className=" inline h-4 w-4 mr-2" />
          <span>
            {t("payment.networkWarning", { network: data?.wallet?.network })}
          </span>
        </div>
      </div>
    </>
  );
}

export default AddressViewer;
