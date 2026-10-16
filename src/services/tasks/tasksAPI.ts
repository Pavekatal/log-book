import {
  ResponseAddTask,
  TaskForPost,
  TaskType,
} from '@/src/shared-types/sharedTypes';
import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000';

export const getTasks = async (): Promise<TaskType[]> => {
  return await axios(API_URL + '/api/tasks').then((res) => {
    return res.data;
  });
};

export const postTask = async (data: TaskForPost): Promise<ResponseAddTask> => {
  return axios
    .post<ResponseAddTask>(API_URL + '/api/tasks', data)
    .then((res: AxiosResponse<ResponseAddTask>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
