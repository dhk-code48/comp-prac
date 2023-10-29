import SectionsModel from "@/models/SectionSchema";

async function deleteSection(sectionId: string): Promise<void> {
  try {
    await SectionsModel.findByIdAndRemove(sectionId);
  } catch (error) {
    throw error;
  }
}

export { deleteSection };
