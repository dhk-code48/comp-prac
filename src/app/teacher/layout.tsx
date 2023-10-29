import { getUserData } from "@/db/read/getUserData";
import { LucideMoreVertical, LucideUser } from "lucide-react";
import React, { FC } from "react";

const TeachersPageLayout: FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const teacherInfo = await getUserData();
  if (!teacherInfo) {
    return <h1>Cann't Fetch User Info</h1>;
  }

  // Create add chapter functionality, caterogize worksheet into chapter and create a single worksheet page

  return (
    <>
      <div className="z-10 w-full bg-white fixed top-0 left-0 flex justify-between px-3 h-20 border-b items-center shadow-sm">
        <div className="flex gap-4 border items-center px-2 py-1 rounded-lg">
          <LucideUser size={20} />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {teacherInfo.name}
            </p>
            <p className="text-[12px] text-gray-500 text-muted-foreground">
              {teacherInfo.email}
            </p>
          </div>
        </div>
        <div>
          <LucideMoreVertical size={20} />
        </div>
      </div>
      <main className="pt-20">{children}</main>
    </>
  );
};

export default TeachersPageLayout;
