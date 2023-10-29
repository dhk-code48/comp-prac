import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import StudentStatesModel from "@/models/StudentStates";

export async function POST(request: NextRequest) {
  try {
    const { sectionId, studentId, gradeId, worksheetId, state } =
      await request.json();

    await StudentStatesModel.create({
      sectionId,
      studentId,
      gradeId,
      worksheetId,
      state,
    });
    return NextResponse.json(
      { message: "Collection Created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId parameter is missing" },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectMongoDb();

    // Find worksheets by section IDs
    const worksheets: Worksheet[] = await WorkSheetModel.find({
      sectionId: { $in: JSON.parse(userId) },
    });

    if (worksheets.length > 0) {
      return NextResponse.json({ worksheets }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No worksheets found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
