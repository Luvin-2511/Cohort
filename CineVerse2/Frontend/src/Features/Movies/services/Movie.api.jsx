import axios from "axios";

const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getPopular = async (type = "movie", page = 1) => {
  const response = await api.get(`/${type}/popular`, {
    params: { page },
  });
  return response.data;
};

export const getTrending = async (type = "movie", time = "week", page = 1) => {
  const response = await api.get(`/trending/${type}/${time}`, {
    params: { page },
  });
  return response.data;
};

export const getTopRated = async (page = 1, type = "movie") => {
  const response = await api.get(`/${type}/top_rated`, {
    params: { page },
  });
  return response.data;
};

export const getNowPlaying = async (page = 1, type = "movie") => {
  const response = await api.get(`/${type}/now_playing`, {
    params: { page },
  });
  return response.data;
};

export const getParticularGenre = async (type = "movie", genreId, page = 1) => {
  if(!genreId) return null
  const response = await api.get(`/discover/${type}`, {
    params: {
      with_genres: genreId,
      page:page
    },
  });
  return response.data;
};

export const getGenreList = async (type = "movie") => {
  const response = await api.get(`/genre/${type}/list`);
  return response.data;
};
