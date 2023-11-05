import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCheck } from "lucide-react";

const WorkSheetsCard: FC<{ title: String }> = ({ title }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 min-w-[500px]">
        <CardTitle className="px-3 py-[1px] cursor-pointer text-sm font-medium bg-blue-500 text-white rounded-full">
          Completed
        </CardTitle>
        <CheckCheck />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{title}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};

export default WorkSheetsCard;
