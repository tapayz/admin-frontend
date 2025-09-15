'use client';

import React from 'react';
// import { Agent } from '@prisma/client';

export interface AgentJwtPayload {
  id: number;
  username: string;
  nickname: string;
  api_key: string;
  idcode: string;
  callback_url: string | null;
}

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  initData?: unknown;
};

function AuthProvider({ children }: Props) {
  return <>{children}</>;
}

export default AuthProvider;
