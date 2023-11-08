import GradeModel from "@/models/GradesSchema";
import { IWorkSheet } from "@/types";

export interface IUpatedWorksheet {
  title: String;
  state: String;
  chapterId: String;
  gradeId: String;
  sectionId: String;
  createdAt: {
    $date: String;
  };
  updatedAt: {
    $date: String;
  };
}

async function updateWorksheet(
  worksheetId: string,
  updatedData: IUpatedWorksheet,
  userId: string
): Promise<IWorkSheet | null> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    console.log(
      "worksheetId",
      JSON.stringify({
        userId: userId,
        updatedData: {
          title: updatedData.title,
          state: updatedData.state,
          chapterId: updatedData.chapterId,

          gradeId: updatedData.gradeId,
          sectionId: updatedData.sectionId,

          createdAt: {
            $date: updatedData.createdAt.$date,
          },
          updatedAt: {
            $date: updatedData.updatedAt.$date,
          },
          __v: 0,
        },
        worksheetId: worksheetId,
      })
    );
    const response = await fetch("http://129.150.50.164:3000/api/worksheets", {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        userId: userId,
        updatedData: {
          title: updatedData.title,
          state: updatedData.state,
          chapterId: updatedData.chapterId,

          gradeId: updatedData.gradeId,
          sectionId: updatedData.sectionId,

          createdAt: {
            $date: updatedData.createdAt.$date,
          },
          updatedAt: {
            $date: updatedData.updatedAt.$date,
          },
          __v: 0,
        },
        worksheetId: worksheetId,
      }),
    });

    if (!response.ok) {
      console.log(response);
      // Handle HTTP error, e.g., throw an error or return an appropriate response
      throw new Error("HTTP Error: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle fetch or JSON parsing errors here
    console.error("An error occurred:", error);
    throw error;
  }
}

export default updateWorksheet;
