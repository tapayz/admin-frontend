import React from 'react';
import PaymentLayout from '@/_layouts/payment/Payment';

type Props = {
  params: Promise<{ id: string }>;
};

// Simple UUID validation function
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

async function Page({ params }: Props) {
  const { id } = await params;
  const isValidId = isValidUUID(id);
  if (!isValidId) {
    throw new Error('Invalid ID');
  }

  return <PaymentLayout payId={id} />;
}

export default Page;
