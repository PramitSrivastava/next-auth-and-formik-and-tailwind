"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: any) => {
  // here i am enabling all the children to access to the session variable  so that we can check in all component that user is logged in or not
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
