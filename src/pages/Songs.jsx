import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchSongs } from "../store/slices/songsSlice";
import SongCard from "../components/SongCard";
import Loader from "../components/Loader";

const PER_PAGE = 8;

function Songs() {
  const dispatch = useDispatch();
  const { items: songs, status } = useSelector((state) => state.songs);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [ageGroup, setAgeGroup] = useState((searchParams.get("ageGroup") || "").replace(" ", "+"));
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, ageGroup]);

  useEffect(() => {
    setAgeGroup((searchParams.get("ageGroup") || "").replace(" ", "+"));
  }, [searchParams]);

  const ageOrder = { "0-3": 1, "3-6": 2, "6-9": 3, "9+": 4 };

  const filtered = songs
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => (ageGroup ? s.ageGroup === ageGroup : true))
    .sort((a, b) => ageOrder[a.ageGroup] - ageOrder[b.ageGroup]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleReset = () => {
    setSearch("");
    setAgeGroup("");
    setSearchParams({});
    setPage(1);
  };

  if (status === "loading") return <Loader />;

  return (
    <div>
      <h1 className="page-title">🎵 Tutte le canzoni</h1>

      <div className="filters">
        <div className="search-wrapper">
          <input type="text" placeholder="🔍 Cerca una canzone..." value={search} onChange={(e) => setSearch(e.target.value)} className="filter-input" />
          {search && (
            <button onClick={() => setSearch("")} className="search-clear">
              ✕
            </button>
          )}
        </div>
        <select
          value={ageGroup}
          onChange={(e) => {
            setAgeGroup(e.target.value);
            setSearchParams(e.target.value ? { ageGroup: e.target.value } : {});
          }}
          className="filter-select"
        >
          <option value="">Tutte le età</option>
          <option value="0-3">0-3 anni</option>
          <option value="3-6">3-6 anni</option>
          <option value="6-9">6-9 anni</option>
          <option value="9+">9+ anni</option>
        </select>
        <button onClick={handleReset} className="btn-outline">
          Reset
        </button>
      </div>

      <p className="results-count">{filtered.length} canzoni trovate</p>

      {paginated.length === 0 ? (
        <p className="empty">Nessuna canzone trovata 🥲</p>
      ) : (
        <div className="cards-grid">
          {paginated.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="btn-outline">
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setPage(i + 1)} className={page === i + 1 ? "btn-primary" : "btn-outline"}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="btn-outline">
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default Songs;
