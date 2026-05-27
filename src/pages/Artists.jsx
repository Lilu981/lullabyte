import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtists } from "../store/slices/artistsSlice";
import ArtistCard from "../components/ArtistCard";
import Loader from "../components/Loader";

function Artists() {
  const dispatch = useDispatch();
  const { items: artists, status } = useSelector((state) => state.artists);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const genres = [...new Set(artists.map((a) => a.genre))];

  const filtered = artists.filter((a) => a.name.toLowerCase().includes(search.toLowerCase())).filter((a) => (genre ? a.genre === genre : true));

  const handleReset = () => {
    setSearch("");
    setGenre("");
  };

  if (status === "loading") return <Loader />;

  return (
    <div>
      <h1 className="page-title">🎤 Artisti e Studi</h1>

      <div className="filters">
        <div className="search-wrapper">
          <input type="text" placeholder="🔍 Cerca un artista..." value={search} onChange={(e) => setSearch(e.target.value)} className="filter-input" />
          {search && (
            <button onClick={() => setSearch("")} className="search-clear">
              ✕
            </button>
          )}
        </div>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="filter-select">
          <option value="">Tutti i generi</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={handleReset} className="btn-outline">
          Reset
        </button>
      </div>

      <p className="results-count">{filtered.length} artisti trovati</p>

      {filtered.length === 0 ? (
        <p className="empty">Nessun artista trovato 🥲</p>
      ) : (
        <div className="cards-grid">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;
