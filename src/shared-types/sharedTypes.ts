export interface TaskType {
  _id: string;
  name: string;
  createDate: string;
  editDate?: string;
  deleteDate?: string;
  deadline: string | null;
  description?: string;
  status: string;
  checked?: boolean;
  notes?: string;
  typeTask: string;
}
