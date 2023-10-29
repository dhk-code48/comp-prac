import { FC } from "react";
import { getUserData } from "@/db/read/getUserData";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import { getSectionAndGrade } from "@/db/read/getSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTabContent from "@/components/SectionTabContent";
import { LucideMenu, LucideUser2 } from "lucide-react";

const SectionTabTrigger: FC<{
  id: string;
}> = async ({ id }) => {
  const section = await getSectionAndGrade(id);

  return (
    <>
      {section && (
        <TabsTrigger value={id}>
          {section.grade} '{section.section}'
        </TabsTrigger>
      )}
    </>
  );
};

const TeacherPage: FC = async () => {
  const teacherInfo = await getUserData();
  if (!teacherInfo) {
    return <h1>Cann't Fetch User Info</h1>;
  }
  const worksheetsBySection = await getWorkSheets(teacherInfo.assignedSections);

  return (
    <div className="py-10 px-1">
      {!worksheetsBySection ? (
        <h1>Loading</h1>
      ) : (
        <Tabs defaultValue="12C" className="w-full">
          <TabsList>
            {Object.keys(worksheetsBySection).map((sectionId) => {
              const sections = worksheetsBySection[sectionId];
              return <SectionTabTrigger id={sectionId} />;
            })}
          </TabsList>
          {Object.keys(worksheetsBySection).map((sectionId) => {
            const sections = worksheetsBySection[sectionId];
            return (
              <SectionTabContent
                id={sectionId}
                sections={sections}
                userId={teacherInfo._id}
              />
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default TeacherPage;
