import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongById } from "../store/slices/songsSlice";
import { fetchArtists } from "../store/slices/artistsSlice";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import Loader from "../components/Loader";

function SongDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current: song, status } = useSelector((state) => state.songs);
  const { items: artists } = useSelector((state) => state.artists);
  const { isLogged, user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);

  const artist = artists.find((a) => a.id === song?.artistId);
  const isFav = favorites.some((f) => f.songId === song?.id && f.userId === user?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSongById(id));
    dispatch(fetchArtists());
  }, [dispatch, id]);

  const handleFavorite = () => {
    if (isFav) {
      const fav = favorites.find((f) => f.songId === song.id && f.userId === user?.id);
      dispatch(removeFavorite(fav.id));
    } else {
      dispatch(addFavorite({ userId: user.id, songId: song.id }));
    }
  };

  if (status === "loading" || !song) return <Loader />;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Torna indietro
      </button>

      <div className="detail-card">
        <div className="detail-cover">{song.cover}</div>
        <div className="detail-body">
          <span className="card-badge">{song.ageGroup} anni</span>
          <h1 className="detail-title">{song.title}</h1>
          {artist && <p className="detail-artist">🎤 {artist.name}</p>}
          <p className="detail-duration">⏱ {song.duration}</p>

          <div className="detail-player">
            <span>▶️</span>
            <div className="player-bar">
              <div className="player-progress"></div>
            </div>
            <span>{song.duration}</span>
          </div>

          {isLogged && (
            <button onClick={handleFavorite} className={isFav ? "btn-fav active" : "btn-fav"}>
              {isFav ? "❤️ Nei preferiti" : "🤍 Aggiungi ai preferiti"}
            </button>
          )}
        </div>
      </div>

      <div className="lyrics-card">
        <h2>📝 Testo</h2>
        <p className="lyrics-text">{song.lyrics}</p>
      </div>
    </div>
  );
}

export default SongDetail;
