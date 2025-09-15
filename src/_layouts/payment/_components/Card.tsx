import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={className}>{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const CardContent = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <div className={className}>{children}</div>
);