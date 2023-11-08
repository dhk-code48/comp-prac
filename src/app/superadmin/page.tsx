import Error from "@/components/Error";
import GradeAddFrom from "@/components/forms/GradeAddForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getAllGradesInfo from "@/functions/getAllGrades";
import { getGradeInfo } from "@/lib/getGradeInfo";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SuperAdminGradesTab from "@/components/SuperAdminGradesTab";

const SuperAdminPage: FC = async () => {
  const grades = await getAllGradesInfo();
  const adminInfo = await getServerSession(authOptions);
  console.log(grades);

  if (!grades || !adminInfo)
    return (
      <Error
        title="Cann't Get Grades Info || Admin Info"
        description="Sorry to announce but website is unable to fetch all grades info || Admin Info"
      />
    );

  return (
    <div className="p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex justify-between items-center">
        <SuperAdminGradesTab grades={grades} />
        <GradeAddFrom userId={adminInfo.user.id} />
      </div>
    </div>
  );
};

export default SuperAdminPage;
