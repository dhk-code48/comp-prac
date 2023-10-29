interface Worksheet {
  _id: string;
  title: string;
  description: string;
  grade: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  chapter: string;
  sections: { name: string; state: string }[];
  order: number;
}

interface StateInfo {
  state: string;
  worksheet: Worksheet;
}

export function getWorkSheetsStates(
  data: Record<string, Worksheet[]>,
  sectionName: string
): {
  firstIncompletedState: StateInfo | null;
  previousState: StateInfo | null;
  lastCompletedState: StateInfo | null;
} {
  let firstIncompletedState: StateInfo | null = null;
  let previousState: StateInfo | null = null;
  let lastCompletedState: StateInfo | null = null;

  for (const chapterId in data) {
    const chapterData = data[chapterId];

    for (let i = 0; i < chapterData.length; i++) {
      const section = chapterData[i].sections.find(
        (s) => s.name === sectionName
      );

      if (section) {
        if (section.state === "completed") {
          lastCompletedState = {
            state: section.state,
            worksheet: chapterData[i],
          };
        } else if (section.state === "incompleted") {
          if (!firstIncompletedState) {
            firstIncompletedState = {
              state: section.state,
              worksheet: chapterData[i],
            };
          }
        } else if (section.state === "previous") {
          previousState = {
            state: section.state,
            worksheet: chapterData[i],
          };
        }
      }
    }
  }

  return {
    firstIncompletedState,
    previousState,
    lastCompletedState,
  };
}
