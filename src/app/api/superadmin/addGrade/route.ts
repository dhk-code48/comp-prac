import { addGrade } from "@/db/create/addGrade";
import connectMongoDb from "@/lib/mongodb";
import GradeModel from "@/models/GradesSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { grade } = await request.json();

    await connectMongoDb();
    const newGrade = GradeModel.create({ grade });

    if (!newGrade) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Grade Created" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
