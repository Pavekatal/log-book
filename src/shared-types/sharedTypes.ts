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

export type TaskForPost = Omit<TaskType, '_id'>;

export interface TaskForPatch {
  deadline?: string | null;
  progress?: string;
  checked?: boolean;
}

export type GroupeTasks = {
  [date: string]: TaskType[];
};

export type ResponseTask = {
  id: string;
};
