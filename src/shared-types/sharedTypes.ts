export interface TaskType {
  _id: string;
  title: string;
  createDate: string;
  updateDate?: string;
  deadline: string | null;
  progress?: string;
  checked?: boolean;
  typeTask: string;
  dayId?: string;
  userId?: string;
}

export interface DaysType {
  _idDay: string;
  currentDay: string;
  daily: TaskType[];
  current: TaskType[];
}

// export interface DaysWithTasksType {
//   _idDay: string;
//   currentDate: string;
//   daily: TaskType[];
//   current: TaskType[];
// }

export type TaskInput = {
  _id?: string;
  title: string;
  createDate?: string;
  updateDate?: string;
  deadline?: string | null;
  progress?: string;
  checked?: boolean;
  typeTask: string;
  dayId?: string;
  userId?: string;
};

export type TaskForPost = Omit<TaskType, '_id'>;

export interface TaskForPatch {
  deadline?: string | null;
  progress?: string;
  checked?: boolean;
}

export type GroupeTasks = {
  [date: string]: DaysType[];
};

export type ResponseTask = {
  id: string;
};

export interface DayForPost {
  userId?: string;
}

export interface UserType {
  _id: string;
  username: string;
  login?: string;
}
