"use client";
import { IWorkSheet } from "@/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { Button } from "../ui/button";
import updateWorksheet, { IUpatedWorksheet } from "@/db/update/updateWorksheet";

const WorksheetCard: FC<{ worksheet: IWorkSheet; userId: string }> = ({
  worksheet,
  userId,
}) => {
  const route = useRouter();

  async function handleWorkSheetUpdate(
    id: string,
    worksheet: IWorkSheet,
    state: string
  ) {
    const newWorkSheet: IUpatedWorksheet = {
      title: worksheet.title,
      state: state,
      chapterId: worksheet.chapterId,
      gradeId: worksheet.gradeId,
      sectionId: worksheet.sectionId,
      createdAt: {
        $date: worksheet.createdAt,
      },
      updatedAt: {
        $date: worksheet.updatedAt,
      },
    };
    const response = await updateWorksheet(id, newWorkSheet, userId);
    if (state === "published") {
      await fetch(
        "http://129.150.50.164:3000/api/studentstates?worksheetId=" +
          worksheet._id,
        {
          method: "POST",
          body: JSON.stringify({
            sectionId: worksheet.sectionId,
            gradeId: worksheet.gradeId,
          }),
        }
      ).finally(() => window.location.reload());
    }
    return response;
  }

  return (
    <div
      onClick={() => route.push("/teacher/worksheet/" + worksheet._id)}
      className="flex justify-between px-5 py-5 my-5 border rounded-lg cursor-pointer w-full lg:w-auto gap-x-10"
    >
      <div>
        <h1>{worksheet.title}</h1>
        <p className="text-gray-700 text-sm">
          Created :{moment(new Date(worksheet.createdAt.toString())).fromNow()}
        </p>
      </div>
      <div>
        {worksheet.state === "published" ? (
          <Button
            onClick={() =>
              handleWorkSheetUpdate(worksheet._id, worksheet, "unpublished")
            }
            variant="destructive"
          >
            Unpublish
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() =>
              handleWorkSheetUpdate(worksheet._id, worksheet, "published")
            }
          >
            Publish
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorksheetCard;
