import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WorksheetCard from "@/components/cards/WorksheetCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import getUserInfo from "@/db/functions/gerUserInfo";
import { IStudentStates, IWorkSheet } from "@/types";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import StudentStateCheckBox from "./CheckBox";

interface props {
  params: {
    worksheetId: string;
  };
}
interface studentstateProps {
  studentStates: IStudentStates[];
}

const StudentState: FC<{
  studentState: IStudentStates;
}> = async ({ studentState }) => {
  const userInfo = await getUserInfo(studentState.studentId);

  if (!userInfo) {
    return <></>;
  }
  return (
    <div className="px-5 font-semibold text-gray-800 flex justify-between w-full items-center whitespace-nowrap">
      <h3>{userInfo.name}</h3>
      <StudentStateCheckBox studentState={studentState} />
    </div>
  );
};

const SingleWorksheet: FC<props> = async ({ params }) => {
  const serversession = await getServerSession(authOptions);
  const worksheet: IWorkSheet | null = await fetch(
    "http://129.150.50.164:3000/api/worksheets?worksheetId=" +
      params.worksheetId
  ).then((res) => res.json());

  const studentStates: studentstateProps | null = await fetch(
    "http://129.150.50.164:3000/api/studentstates?worksheetId=" +
      params.worksheetId
  ).then((res) => res.json());

  if (!worksheet || !serversession || !studentStates) {
    return <></>;
  }

  return (
    <div>
      <div className="flex justify-start items-center">
        <WorksheetCard userId={serversession.user.id} worksheet={worksheet} />
      </div>
      <div className="space-y-8 mx-2">
        <h1 className="text-lg font-semibold">Student States </h1>
        <div className="space-y-5">
          {studentStates.studentStates.map((studentstate) => {
            return <StudentState studentState={studentstate} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleWorksheet;
