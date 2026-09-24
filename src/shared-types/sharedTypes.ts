export interface TaskType {
  _id: string;
  title: string;
  createDate: string;
  updateDate?: string;
  deadline: string | null;
  progress?: string;
  checked?: boolean;
  typeTask: string;
}

export type TaskInput = {
  _id?: string;
  title: string;
  createDate?: string;
  updateDate?: string;
  deadline?: string | null;
  progress?: string;
  checked?: boolean;
  typeTask: string;
};
