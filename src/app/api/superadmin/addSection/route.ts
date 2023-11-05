import { addGrade } from "@/db/create/addGrade";
import connectMongoDb from "@/lib/mongodb";
import GradeModel from "@/models/GradesSchema";
import SectionsModel from "@/models/SectionSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { section, gradeId } = await request.json();

    await connectMongoDb();
    const newSection = await SectionsModel.create({ section, gradeId });

    const gradeData = await GradeModel.findById(gradeId);

    if (!gradeData) {
      return NextResponse.json({ error: "Grade Not Found" }, { status: 500 });
    }

    const updatedGrade = await GradeModel.findByIdAndUpdate(gradeId, {
      grade: gradeData.grade,
      sectionsId: [...gradeData.sectionsId, newSection._id],
    });
    if (!updatedGrade) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }

    if (!newSection) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Section Created Successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
