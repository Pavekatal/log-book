import {
  DayForPost,
  DaysType,
  ResponseTask,
} from '@/src/shared-types/sharedTypes';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants';

export const getDays = async (): Promise<DaysType[]> => {
  return await axios(API_URL + '/api/days')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};

export const postDay = async (data: DayForPost): Promise<ResponseTask> => {
  return axios
    .post<ResponseTask>(API_URL + '/api/days', data)
    .then((res: AxiosResponse<ResponseTask>) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
