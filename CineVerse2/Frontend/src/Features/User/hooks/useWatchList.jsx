import useAuth from "../../Auth/hooks/useAuth";
import { useUserContext } from "../user.context";
import { setWatchlist } from "../services/user.api";

const useWatchlist = () => {
  const { user, updateUser } = useAuth();
  const { setUserLoading } = useUserContext();

  const handleWatchlist = async (movie) => {
    setUserLoading(true);
    try {
      const response = await setWatchlist(movie.id, {
        title: movie.title || movie.name,
        posterPath: movie.poster_path,
        mediaType: movie.media_type || "movie",
        year: (movie.release_date || movie.first_air_date)?.split("-")[0],
        rating: movie.vote_average,
      });
      console.log("WATCHLIST RESPONSE:", response);
      console.log("USER AFTER UPDATE:", response);
      console.log("WATCHLIST ARRAY:", response?.watchlist);
      updateUser(response);
    } catch (err) {
      console.error("WATCHLIST ERROR:", err);
    } finally {
      setUserLoading(false);
    }
  };

  const isInWatchlist = (movieId) =>
    user?.watchlist?.some((w) => String(w.movieId) === String(movieId)) ||
    false;

  return {
    watchlist: user?.watchlist || [],
    handleWatchlist,
    isInWatchlist,
    user,
  };
};

export default useWatchlist;
