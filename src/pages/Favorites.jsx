import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../store/slices/favoritesSlice";
import { fetchSongs } from "../store/slices/songsSlice";
import SongCard from "../components/SongCard";
import Loader from "../components/Loader";

function Favorites() {
  const dispatch = useDispatch();
  const { items: favorites, status } = useSelector((state) => state.favorites);
  const { items: songs } = useSelector((state) => state.songs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchFavorites(user.id));
    dispatch(fetchSongs());
  }, [dispatch, user.id]);

  const favSongs = songs.filter((s) => favorites.some((f) => f.songId === s.id));

  if (status === "loading") return <Loader />;

  return (
    <div>
      <h1 className="page-title">❤️ I tuoi preferiti</h1>
      <p className="results-count">{favSongs.length === 0 ? "Non hai ancora salvato nessuna canzone" : `${favSongs.length} canzoni salvate`}</p>

      {favSongs.length === 0 ? (
        <div className="empty-favorites">
          <span>🎵</span>
          <p>Esplora le canzoni e salva le tue preferite!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {favSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
