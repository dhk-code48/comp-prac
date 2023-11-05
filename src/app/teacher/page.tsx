import { FC } from "react";
import { getUserData } from "@/db/read/getUserData";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import { getSectionAndGrade } from "@/db/read/getSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTabContent from "@/components/SectionTabContent";
import { LucideMenu, LucideUser2 } from "lucide-react";
import Link from "next/link";

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

const Sections: FC<{ sectionId: string }> = async ({ sectionId }) => {
  const gradeData = await fetch(
    process.env.NEXT_CLIENT_URL + "/api/section?id=" + sectionId
  ).then((res) => res.json());

  return (
    <div className="px-5 py-4 border-b">
      <Link
        href={"/teacher/" + sectionId}
        className="font-medium text-xl text-gray-800"
      >
        {gradeData.grade.grade} "{gradeData.section.section}"
      </Link>
    </div>
  );
};

const TeacherPage: FC = async () => {
  const teacherInfo = await getUserData();
  if (!teacherInfo) {
    return <h1>Cann't Fetch User Info</h1>;
  }
  return (
    <div className="py-10 px-5">
      <h2 className="font-bold text-2xl mb-5">Classes</h2>
      {teacherInfo.assignedSections.map((sectionId) => {
        return <Sections sectionId={sectionId} />;
      })}
    </div>
  );
};

export default TeacherPage;
