import { getWorkSheetsStates } from "@/lib/getWorkSheetStates";
import { OrganizedWorksheets, Worksheet } from "@/lib/organizeByGrades";
import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGradeInfo } from "@/lib/getGradeInfo";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCheck } from "lucide-react";

const AdminGradeTabs: FC<{
  grade: string;
  data: Record<string, Worksheet[]>;
}> = async ({ grade, data }) => {
  const gradeInfo = await getGradeInfo(grade);
  console.log(gradeInfo);
  return (
    <Tabs defaultValue="c">
      <TabsList>
        {gradeInfo.sections.map((section) => {
          return (
            <TabsTrigger value={section}>Sections : {section}</TabsTrigger>
          );
        })}
      </TabsList>
      {gradeInfo.sections.map((section) => {
        const { firstIncompletedState, lastCompletedState, previousState } =
          getWorkSheetsStates(data, section);
        return (
          <TabsContent value={section}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {lastCompletedState && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium bg-blue-500 px-3 rounded-full text-white">
                      Previous WorkSheet
                    </CardTitle>
                    <CheckCheck />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {lastCompletedState.worksheet.title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lastCompletedState.worksheet.description}
                    </p>
                  </CardContent>
                </Card>
              )}{" "}
              {previousState && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium bg-blue-500 px-3 rounded-full text-white">
                      Today's WorkSheet
                    </CardTitle>
                    <CheckCheck />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {previousState.worksheet.title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {previousState.worksheet.description}
                    </p>
                  </CardContent>
                </Card>
              )}{" "}
              {firstIncompletedState && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium bg-blue-500 px-3 rounded-full text-white">
                      Next WorkSheet
                    </CardTitle>
                    <CheckCheck />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {firstIncompletedState.worksheet.title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {firstIncompletedState.worksheet.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

const AdminTabs: FC<{ allClasses: OrganizedWorksheets }> = ({ allClasses }) => {
  console.log(allClasses);
  return (
    <div>
      <Tabs defaultValue="11" className="space-y-4">
        <TabsList>
          {Object.keys(allClasses).map((grade) => {
            return (
              <>
                <TabsTrigger value={grade}>Class : {grade}</TabsTrigger>
              </>
            );
          })}
        </TabsList>
        {Object.keys(allClasses).map((grade) => {
          const gradeInfo: Record<string, Worksheet[]> = allClasses[grade];

          return (
            <TabsContent value={grade}>
              <AdminGradeTabs grade={grade} data={gradeInfo} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default AdminTabs;
