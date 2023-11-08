import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import StudentStatesModel from "@/models/StudentStates";

export async function POST(request: NextRequest) {
  const stateId = request.nextUrl.searchParams.get("stateId");
  const worksheetId = request.nextUrl.searchParams.get("worksheetId");
  if (worksheetId) {
    const { sectionId, gradeId } = await request.json();
    const allUsers = await UserSchema.find({
      role: "student",
      assignedSections: { $in: sectionId },
    }).lean();

    if (allUsers.length > 0) {
      const studentStates = allUsers.map((user) => ({
        sectionId,
        gradeId,
        studentId: user._id,
        worksheetId,
        state: "incomplete",
      }));

      await StudentStatesModel.create(studentStates);

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "No User" }, { status: 500 });
    }
  }
  if (stateId) {
    const { sectionId, studentId, gradeId, worksheetId, state } =
      await request.json();

    const newState = await StudentStatesModel.findByIdAndUpdate(stateId, {
      sectionId,
      studentId,
      gradeId,
      worksheetId,
      state,
    });

    return NextResponse.json({ newState }, { status: 200 });
  } else {
    return NextResponse.json({ error: "No User" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const worksheetId = request.nextUrl.searchParams.get("worksheetId");

  if (worksheetId && userId) {
    try {
      await connectMongoDb();
      const studentStates = await StudentStatesModel.find({
        worksheetId: worksheetId,
        studentId: userId,
      }).lean();
      return NextResponse.json({ ...studentStates[0] }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "An error occurred: " + error },
        { status: 500 }
      );
    }
  }

  if (worksheetId) {
    try {
      await connectMongoDb();
      const studentStates = await StudentStatesModel.find({
        worksheetId: worksheetId,
      }).lean();
      return NextResponse.json({ studentStates }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "An error occurred: " + error },
        { status: 500 }
      );
    }
  }

  if (!userId) {
    return NextResponse.json(
      { error: "userId parameter is missing" },
      { status: 400 }
    );
  }
  if (userId) {
    try {
      // Connect to MongoDB
      await connectMongoDb();

      // Find worksheets by section IDs
      const worksheets: Worksheet[] = await StudentStatesModel.find({
        studentId: userId,
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
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
