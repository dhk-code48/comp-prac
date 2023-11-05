import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) {
    return NextResponse.json({ message: "No File" }, { status: 500 });
  }
  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);
  const path = `./public/${file.name}`;
  await writeFile(path, buffer);
  return NextResponse.json({ message: "DONE" }, { status: 200 });
}
