"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <Button onClick={() => signOut()} variant="outline">
      Log Out
    </Button>
  );
};

export default LogOut;
