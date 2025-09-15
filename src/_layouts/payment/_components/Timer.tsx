import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

type Props = {
  expireAt: number;
  invoiceState: string;
  setInvoiceState: any;
};

function Timer({ expireAt, setInvoiceState, invoiceState }: Props) {
  const [remainingTime, setRemainingTime] = useState(3600); // 1 hour in seconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isExpired && invoiceState === 'Ready') {
      setInvoiceState('Cancel');
    }
  }, [isExpired, invoiceState, setInvoiceState]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDiff = expireAt - currentTime;

    if (timeDiff <= 0) {
      setIsExpired(true);
      return;
    }

    const remainingTime = timeDiff / 1000;
    setRemainingTime(remainingTime);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expireAt]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      // Format as "hh:mm:ss" when hours are present
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
    } else {
      // Format as "mm:ss" when hours are not present
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
    }
  };

  if (invoiceState === 'Complete') {
    return <></>;
  }

  if (isExpired) {
    return (
      <div
        className={`flex items-center text-primary  ${isExpired && 'text-red-500'}`}
      >
        <Clock className="w-4 h-4 mr-2" />
        <span className={`font-semibold`}>Expired</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-primary">
      <Clock className="w-4 h-4 mr-2" />
      <span className="font-semibold" aria-live="polite">
        {formatTime(remainingTime)}
      </span>
    </div>
  );
}

export default Timer;