import connectMongoDb from "@/lib/mongodb";
import GradeModel from "@/models/GradesSchema";
import UserSchema from "@/models/UserSchema";

import { IGrade } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { grade, userId } = await request.json();

    await connectMongoDb();

    const adminUser = await UserSchema.findById(userId);

    if (!adminUser) {
      return NextResponse.json({ error: "Access Denied !" }, { status: 500 });
    }

    if (adminUser.role === "superadmin") {
      const newGrade = await GradeModel.create({
        grade: grade,
      });
      return NextResponse.json({ ...newGrade }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Access Denied !" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "ERROR !" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const gradeId = request.nextUrl.searchParams.get("gradeId");

  if (gradeId) {
    try {
      await connectMongoDb();
      const gradeInfo: IGrade | null = await GradeModel.findById(
        gradeId
      ).lean();

      return NextResponse.json({ ...gradeInfo }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else {
    try {
      await connectMongoDb();
      const gradesInfo: IGrade[] | null = await GradeModel.find({}).lean();

      return NextResponse.json(gradesInfo, { status: 200 });
    } catch {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
