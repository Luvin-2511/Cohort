import useAuth from "../../Auth/hooks/useAuth";
import { useUserContext } from "../user.context";
import { setFavorites } from "../services/user.api";

const useFavorites = () => {
  const { user, updateUser } = useAuth();
  const { userLoading, setUserLoading } = useUserContext();

  const handleFavorite = async (movie) => {
    setUserLoading(true);
    try {
      const response = await setFavorites(movie.id, {
        title:      movie.title      || movie.name,
        posterPath: movie.poster_path,
        mediaType:  movie.media_type || "movie",
        year:       (movie.release_date || movie.first_air_date)?.split("-")[0],
        rating:     movie.vote_average,
      });
      console.log("RESPONSE:", response.data);
      updateUser(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  return {
    favorites: user?.favorites || [],
    userLoading,
    handleFavorite,
    user,
  };
};

export default useFavorites;