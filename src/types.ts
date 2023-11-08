import { Document } from "mongoose";

export interface ISections extends Document {
  section: string;
  gradeId: string;
}

export interface IGrade extends Document {
  sectionsId: string[];
  grade: string;
}

export interface IUser extends Document {
  role: string;
  name: string;
  assignedSections: string[];
  email: string;
  password: string;
}

export interface IWorkSheet extends Document {
  title: String;
  chapterId: String;
  gradeId: String;
  sectionId: String;
  state: String;
  createdAt: String;
  updatedAt: String;
}
export interface IWStates extends Document {
  worksheetId: String;
  gradeId: String;
  sectionId: String;
  state: String;
  createdAt: String;
  updatedAt: String;
}
export interface IChapter extends Document {
  title: String;
  sectionId: String;
  gradeId: String;
}
export interface IStudentStates extends Document {
  studentId: string;
  sectionId: String;
  gradeId: String;

  worksheetId: string;
  state: string;
}
