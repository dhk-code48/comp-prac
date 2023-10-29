export interface workSheets {
  worksheets: {
    title: string;
    description: string;
    grade: string;
  }[];
}

export const fetchworkSheets = async (grade: string): Promise<workSheets> =>
  await fetch("http://129.150.50.164:3000/api/worksheets?grade=" + grade).then(
    (response) => response.json()
  );
