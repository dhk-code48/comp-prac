import { FC } from "react";
import { getUserData } from "@/db/read/getUserData";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import { getSectionAndGrade } from "@/db/read/getSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTabContent from "@/components/SectionTabContent";
import { LucideMenu, LucideUser2 } from "lucide-react";
import Link from "next/link";

const Sections: FC<{ sectionId: string }> = async ({ sectionId }) => {
  const gradeData = await fetch(
    process.env.CLIENT_URL + "/api/section?id=" + sectionId
  ).then((res) => res.json());

  return (
    <Link href={"/teacher/" + sectionId}>
      <div className="px-5 py-4 border-b w-72 bg-blue-500 text-white rounded-xl cursor-pointer hover:shadow-xl hover:bg-yellow-400 hover:text-black">
        <h5 className="font-medium text-xl ">
          {gradeData.grade.grade} "{gradeData.section.section}"
        </h5>
        <p>Students : 20</p>
        <p>WorkSheets : 50</p>
        <p>Published WorkSheets : 30</p>
      </div>
    </Link>
  );
};

const TeacherPage: FC = async () => {
  const teacherInfo = await getUserData();
  if (!teacherInfo) {
    return <h1>Cann't Fetch User Info</h1>;
  }
  return (
    <div className="py-10 px-5">
      <h2 className="font-bold text-2xl mb-5">Assigned Classes</h2>
      <div className="flex gap-x-10 gapy-5">
        {teacherInfo.assignedSections.map((sectionId) => {
          return <Sections sectionId={sectionId} />;
        })}
      </div>
    </div>
  );
};

export default TeacherPage;
