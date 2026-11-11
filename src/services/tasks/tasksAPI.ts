import {
  ResponseTask,
  TaskForPatch,
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

export const postTask = async (data: TaskForPost): Promise<ResponseTask> => {
  return axios
    .post<ResponseTask>(API_URL + '/api/tasks', data)
    .then((res: AxiosResponse<ResponseTask>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const patchTask = async (
  id: string,
  data: TaskForPatch,
): Promise<ResponseTask> => {
  return axios
    .patch(API_URL + `/api/tasks/${id}`, data)
    .then((res: AxiosResponse<ResponseTask>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const deleteTask = async (id: string): Promise<ResponseTask> => {
  return axios
    .delete(API_URL + `/api/tasks/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
