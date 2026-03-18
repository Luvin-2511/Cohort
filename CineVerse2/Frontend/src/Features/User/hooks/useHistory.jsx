import useAuth from "../../Auth/hooks/useAuth";
import { addHistory, clearAllHistory } from "../services/user.api";

const useHistory = () => {
  const { user, updateUser } = useAuth();

  const handleHistory = async (movie) => {
    const response = await addHistory(movie.id, {
      title:      movie.title      || movie.name,
      posterPath: movie.poster_path,
      mediaType:  movie.media_type || "movie",
      year:       (movie.release_date || movie.first_air_date)?.split("-")[0],
    });
    updateUser(response.data);
  };

  const clearHistory = async () => {
    const response = await clearAllHistory();
    updateUser(response.data);
  };

  return {
    history:      user?.watchHistory || [],
    handleHistory,
    clearHistory,
  };
};

export default useHistory;