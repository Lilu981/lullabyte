import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSongs } from "../store/slices/songsSlice";
import { fetchArtists } from "../store/slices/artistsSlice";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import Loader from "../components/Loader";

function Home() {
  const dispatch = useDispatch();
  const { items: songs, status } = useSelector((state) => state.songs);
  const { items: artists } = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchArtists());
  }, [dispatch]);

  const featured = songs.slice(0, 4);

  if (status === "loading") return <Loader />;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>
            Le sigle che <span className="hero-accent">abbiamo amato</span> 🌸
          </h1>
          <p>Scopri le canzoni dei cartoni animati divise per fascia d'età</p>
          <div className="hero-buttons">
            <Link to="/songs" className="btn-primary">
              Esplora le canzoni
            </Link>
            <Link to="/artists" className="btn-outline">
              Vedi gli artisti
            </Link>
          </div>
        </div>
        <div className="hero-emoji">🪇🎶</div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>🎶 In evidenza</h2>
          <Link to="/songs" className="see-all">
            Vedi tutte →
          </Link>
        </div>
        <div className="cards-grid">
          {featured.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>🎤 Artisti</h2>
          <Link to="/artists" className="see-all">
            Vedi tutti →
          </Link>
        </div>
        <div className="cards-grid">
          {artists.slice(0, 4).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="age-section">
        <h2>Cerca per età 🎠</h2>
        <div className="age-grid">
          {["0-3", "3-6", "6-9", "9+"].map((age) => (
            <Link key={age} to={`/songs?ageGroup=${age}`} className="age-card" style={{ color: "#4A9E8E" }}>
              <span className="age-emoji">{age === "0-3" ? "🍼" : age === "3-6" ? "🧸" : age === "6-9" ? "🎮" : "🎧"}</span>
              <span>{age} anni</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
