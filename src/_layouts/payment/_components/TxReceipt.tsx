import React from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useLocale } from '@/_hooks/useLocale';

// Missing UI components - need to install shadcn/ui or create proper components
const Separator = ({ className }: { className?: string }) => (
  <hr className={`my-2 border-t ${className}`} />
);

const Collapsible = ({ 
  children, 
  open: _, 
  onOpenChange: __ 
}: { 
  children: React.ReactNode; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) => (
  <div>{children}</div>
);

const CollapsibleContent = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden">{children}</div>
);

const CollapsibleTrigger = ({ 
  children, 
  asChild: _ 
}: { 
  children: React.ReactNode; 
  asChild?: boolean;
}) => (
  <div>{children}</div>
);

const Button = ({ 
  children, 
  variant: _, 
  className,
  onClick
}: { 
  children: React.ReactNode; 
  variant?: string;
  className?: string;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 ${className}`}
  >
    {children}
  </button>
);

const Row = ({ 
  children, 
  className, 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => (
  <div className={`flex ${className}`} onClick={onClick}>
    {children}
  </div>
);

type Props = {
  tx: any;
};

function TxReceipt({ tx }: Props) {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);

  function summaryString(str: string) {
    return str.length > 20 ? `${str.slice(0, 13)}...${str.slice(-5)}` : str;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between items-center w-full mb-4 border-border"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{t('payment.transactionDetails')}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      {isOpen && (
        <CollapsibleContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium whitespace-nowrap">
                {t('payment.transactionId')}:
              </span>
              <Row
                className="text-gray-800 whitespace-pre-line cursor-pointer items-center gap-3"
                onClick={() => {
                  if (tx?.detail) {
                    navigator.clipboard.writeText(tx.detail);
                    toast.info(t('common.copied'));
                  }
                }}
              >
                {summaryString(tx?.detail)}
                <Copy className={'w-4 h-4'} />
              </Row>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('payment.transactionDate')}:</span>
              <span className="text-gray-800">
                {new Date(tx?.updatedAt).toLocaleString()}
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('payment.sender')}:</span>
              <span className="text-gray-800 font-mono text-sm">
                <Row
                  className="text-gray-800 whitespace-pre-line cursor-pointer items-center gap-3"
                  onClick={() => {
                    if (tx?.detail) {
                      navigator.clipboard.writeText(tx?.from);
                      toast.info(t('common.copied'));
                    }
                  }}
                >
                  {summaryString(tx?.from ?? '-')}
                  <Copy className={'w-4 h-4'} />
                </Row>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('payment.receiver')}:</span>
              <span className="text-gray-800 font-mono text-sm">
                <Row
                  className="text-gray-800 whitespace-pre-line cursor-pointer items-center gap-3"
                  onClick={() => {
                    if (tx?.detail) {
                      navigator.clipboard.writeText(tx?.to);
                      toast.info(t('common.copied'));
                    }
                  }}
                >
                  {summaryString(tx?.to ?? '-')}
                  <Copy className={'w-4 h-4'} />
                </Row>
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('payment.amount')}:</span>
              <span className="text-gray-800 font-semibold">
                {parseFloat(tx.amount).toLocaleString()} USDT
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('payment.status')}:</span>
              <span className="text-green-600 flex items-center font-medium">
                {t('payment.success')} <CheckCircle className="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}

export default TxReceipt;