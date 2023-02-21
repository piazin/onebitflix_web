import { api } from './api';

interface watchTimeParams {
  episodeId: number;
  seconds: number;
}

export const episodeService = {
  setWatchTime: async ({ episodeId, seconds }: watchTimeParams) => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .post(
        `/episodes/${episodeId}/watchTime`,
        { seconds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => err);

    return res;
  },

  getWatchTime: async (episodeId: number) => {
    const token = sessionStorage.getItem('token');

    const res = await api
      .get(`/episodes/${episodeId}/watchTime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => err.response);

    return res;
  },
};
