import { TaskType } from '@/src/shared-types/sharedTypes';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getTasks = async (): Promise<TaskType[]> => {
  return await axios(API_URL + '/api/tasks').then((res) => {
    return res.data;
  });
};
