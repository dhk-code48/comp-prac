import connectMongoDb from "@/lib/mongodb";
import GradeModel from "@/models/GradesSchema";
import SectionsModel from "@/models/SectionSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing section ID" },
        { status: 400 }
      ); // Bad Request
    }
    // Connect to the MongoDB database
    await connectMongoDb();

    // Find the section and grade by ID
    const section = await SectionsModel.findById(id);
    const grade = await GradeModel.findOne({
      sectionsId: { $in: id },
    });
    console.log("SECTIOn", grade);

    if (!section) {
      return NextResponse.json(
        { message: "Section not found" },
        { status: 404 }
      ); // Not Found
    }

    return NextResponse.json(
      { section: section.section, grade: grade?.grade },
      { status: 200 }
    ); // OK
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching section information" },
      { status: 500 }
    ); // Internal Server Error
  }
}
