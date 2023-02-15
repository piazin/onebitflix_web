import { api } from './api';
import axios, { AxiosError } from 'axios';

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};

export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

export const courseService = {
  getNewestCourses: async () => {

    try {
      return await api.get('/courses/newest');
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        return error.response;
      }
      console.error(error);
    }
  },
};
