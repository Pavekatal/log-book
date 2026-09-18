import { TaskType } from '../shared-types/sharedTypes';

export const dataTasks: TaskType[] = [
  {
    _id: '1',
    name: 'test',
    createDate: '01.01.2000',
    description: 'test description',
    status: 'in processing',
    deadline: '',
    checked: false,
    notes: 'test notes',
    typeTask: 'daily',
  },
];
