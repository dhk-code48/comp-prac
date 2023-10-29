"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
