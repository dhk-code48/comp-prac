import { addGrade } from "@/db/create/addGrade";
import { addSection } from "@/db/create/addSections";
import connectMongoDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sectionId, grade } = await request.json();

    await connectMongoDb();
    const user = await addGrade(sectionId, grade);

    if (!user) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Grade Created" }, { status: 201 });
    }
  } catch (error) {
    console.log("ERROR => ", error);
    console.log("ERROR => ", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
