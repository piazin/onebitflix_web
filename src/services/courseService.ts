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
        return error.response;
      }
    }
  },

  getFeaturedCourses: async () => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .get('/courses/featured', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  addToFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .post(
        '/favorites',
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  removeFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .delete(`/favorites${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  getFavCourse: async () => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .get('/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .catch((err) => err.response);

    return res;
  },
};
