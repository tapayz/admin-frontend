import React from "react";

export const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const Contents = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const Main = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
