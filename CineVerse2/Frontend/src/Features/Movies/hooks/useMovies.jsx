import React, { useContext, useEffect } from "react";
import { MovieContext } from "../movie.context";
import {
  getGenreList,
  getNowPlaying,
  getParticularGenre,
  getPopular,
  getTopRated,
  getTrending,
} from "../services/Movie.api";

const useMovies = () => {
  const {
    loading,
    setLoading,
    movies,
    setMovies,
    category,
    setCategory,
    page,
    setPage,
    hasMore,
    sethasMore,
    genre,
    setGenre,
    selectedGenre,
    setselectedGenre,
  } = useContext(MovieContext);

  const fetchMovies = async (cat = category, pg = page) => {
    setLoading(true);
    try {
      let data;
      if (cat === "trending") data = await getTrending("movie", "week", pg);
      if (cat === "popular") data = await getPopular("movie", pg);
      if (cat === "top_rated") data = await getTopRated(pg, "movie");
      if (cat === "now_playing") data = await getNowPlaying(pg, "movie");
      setMovies(pg === 1 ? data.results : [...movies, ...data.results]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenre = async () => {
    const response = await getGenreList();
    setGenre(response.genres);
  };

  const handleParticularGenre = async (genreId) => {
    const response = await getParticularGenre("movie",genreId,page);
    setMovies(response.results)
    return response.results
  };

  useEffect(() => {
    fetchMovies(category, page);
  }, [category, page]);

  useEffect(() => {
    handleGenre();
  }, []);

  return {
    loading,
    movies,
    fetchMovies,
    category,
    setCategory,
    setPage,
    hasMore,
    sethasMore,
    genre,
    selectedGenre,
    setselectedGenre,
    handleParticularGenre
  };
};

export default useMovies;
