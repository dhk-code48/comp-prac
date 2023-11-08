"use client";
import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, CheckCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkSheetsCard: FC<{
  title: String;
  state: String;
  disable?: boolean;
  sectionId: String;
}> = ({ title, state, disable, sectionId }) => {
  const navigate = useRouter();
  return (
    <Card
      className={disable ? "opacity-70" : ""}
      onClick={() => !disable && navigate.push(`/pdf/${title}${sectionId}`)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 min-w-[500px]">
        <CardTitle
          className={`px-3 py-[1px] cursor-pointer text-sm font-medium text-white rounded-full ${
            state === "complete" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {state.toUpperCase()}
        </CardTitle>
        <div
          className={`flex justify-center items-center p-1 rounded-full text-white ${
            state === "complete" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {state === "incomplete" ? <X size={14} /> : <Check size={14} />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold">{title}</div>
        {/* <p className="textg-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};

export default WorkSheetsCard;
