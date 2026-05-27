import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistById } from "../store/slices/artistsSlice";
import { fetchSongs } from "../store/slices/songsSlice";
import Loader from "../components/Loader";
import SongCard from "../components/SongCard";

function ArtistDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current: artist, status } = useSelector((state) => state.artists);
  const { items: songs } = useSelector((state) => state.songs);

  const artistSongs = songs.filter((s) => s.artistId === parseInt(id));

  useEffect(() => {
    dispatch(fetchArtistById(id));
    dispatch(fetchSongs());
  }, [dispatch, id]);

  if (status === "loading" || !artist) return <Loader />;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Torna indietro
      </button>

      <div className="detail-card">
        <div className="detail-cover">{artist.cover}</div>
        <div className="detail-body">
          <span className="card-badge">{artist.genre}</span>
          <h1 className="detail-title">{artist.name}</h1>
          <p className="detail-artist">{artist.bio}</p>
          <p className="detail-duration">🎵 {artistSongs.length} canzoni</p>
        </div>
      </div>

      <h2 className="section-title">Canzoni di {artist.name}</h2>
      {artistSongs.length === 0 ? (
        <p className="empty">Nessuna canzone trovata 🥲</p>
      ) : (
        <div className="cards-grid">
          {artistSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistDetail;
