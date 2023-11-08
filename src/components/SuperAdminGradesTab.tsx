"use client";
import { IGrade } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { FC } from "react";

const SuperAdminGradesTab: FC<{ grades: IGrade[] }> = ({ grades }) => {
  return (
    <Tabs className="mt-4 space-y-4" defaultValue={grades[0].grade}>
      <TabsList>
        {grades.map((gradeInfo) => {
          return (
            <TabsTrigger value={gradeInfo.grade} key={gradeInfo._id}>
              Grade : {gradeInfo.grade}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default SuperAdminGradesTab;
