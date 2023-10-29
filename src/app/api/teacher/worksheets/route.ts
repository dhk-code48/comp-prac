import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";

export async function GET(request: NextRequest) {
  const sectionsId = request.nextUrl.searchParams.get("sectionsId");
  if (sectionsId) {
    try {
      await connectMongoDb();
      const worksheets: Worksheet[] = await WorkSheetModel.find({
        sectionId: { $in: JSON.parse(sectionsId) },
      });
      const data = worksheets
        ? worksheets
        : { error: "CAN'T FETCH WORKSHEETS !!" };
      console.log("WORKSHEETS => ", worksheets);
      // Ensure that the result is converted to plain JavaScript objects.

      if (worksheets) {
        return NextResponse.json(data, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "An error occurred" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
