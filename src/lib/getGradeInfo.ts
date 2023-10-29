export interface GradeInfo {
  _id: string;
  sections: string[];
  grade: string;
}

export const getGradeInfo = async (grade: string): Promise<GradeInfo> => {
  return await fetch(
    process.env.NEXT_CLIENT_URL + "/api/grades/" + grade || ""
  ).then((res) => res.json());
};
