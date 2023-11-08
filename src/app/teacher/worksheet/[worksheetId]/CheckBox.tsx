"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IStudentStates } from "@/types";
import React, { FC, FormEvent, useState } from "react";

const StudentStateCheckBox: FC<{ studentState: IStudentStates }> = ({
  studentState,
}) => {
  const [state, setState] = useState<boolean>(
    studentState.state === "incomplete" ? false : true
  );

  const handleStateUpdate = async (e: string | boolean) => {
    await fetch(
      "http://129.150.50.164:3000/api/studentstates?stateId=" +
        studentState._id,
      {
        method: "POST",
        body: JSON.stringify({
          ...studentState,
          state: e ? "complete" : "incomplete",
        }),
      }
    );
    setState(e ? true : false);
  };

  return (
    <Checkbox checked={state} onCheckedChange={(e) => handleStateUpdate(e)} />
  );
};

export default StudentStateCheckBox;
