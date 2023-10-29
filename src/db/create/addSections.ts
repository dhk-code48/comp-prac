import SectionsModel from "@/models/SectionSchema";
import { ISections } from "@/types";

async function addSection(
  section: string,
  gradeId: string
): Promise<ISections> {
  try {
    const newSection = new SectionsModel({ section, gradeId });

    const savedSection = await newSection.save();

    return savedSection;
  } catch (error) {
    throw error;
  }
}

export { addSection };
