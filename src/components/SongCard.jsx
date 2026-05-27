import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";

function SongCard({ song }) {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((f) => f.songId === song.id && f.userId === user?.id);

  const handleFavorite = () => {
    if (isFav) {
      const fav = favorites.find((f) => f.songId === song.id && f.userId === user?.id);
      dispatch(removeFavorite(fav.id));
    } else {
      dispatch(addFavorite({ userId: user.id, songId: song.id }));
    }
  };

  const titleColor = {
    "0-3": "#F06B8A",
    "3-6": "#5B9EC9",
    "6-9": "#9B7FC7",
    "9+": "#4A9E8E",
  };
  return (
    <div className="card">
      <div className="card-cover">{song.cover}</div>
      <div className="card-body">
        <span className="card-badge">{song.ageGroup} anni</span>
        <h3 className="card-title" style={{ color: "#4A9E8E" }}>
          {song.title}
        </h3>
        <div className="card-actions">
          <Link to={`/songs/${song.id}`} className="btn-primary">
            Scopri
          </Link>
          {isLogged && (
            <button onClick={handleFavorite} className="btn-heart">
              {isFav ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongCard;
