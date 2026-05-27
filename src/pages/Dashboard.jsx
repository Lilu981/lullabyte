import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, addSong, updateSong, deleteSong } from "../store/slices/songsSlice";
import { fetchArtists } from "../store/slices/artistsSlice";
import Loader from "../components/Loader";

const emptyForm = { title: "", artistId: "", ageGroup: "", duration: "", cover: "", lyrics: "" };

function Dashboard() {
  const dispatch = useDispatch();
  const { items: songs, status } = useSelector((state) => state.songs);
  const { items: artists } = useSelector((state) => state.artists);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState("songs");

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchArtists());
  }, [dispatch]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Il titolo è obbligatorio";
    if (!form.artistId) e.artistId = "Seleziona un artista";
    if (!form.ageGroup) e.ageGroup = "Seleziona una fascia d'età";
    if (!form.duration.trim()) e.duration = "La durata è obbligatoria";
    if (!form.cover.trim()) e.cover = "Inserisci una emoji come cover";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    if (editing) {
      dispatch(updateSong({ ...form, id: editing, artistId: parseInt(form.artistId) }));
      setEditing(null);
    } else {
      dispatch(addSong({ ...form, artistId: parseInt(form.artistId) }));
    }
    setForm(emptyForm);
  };

  const handleEdit = (song) => {
    setForm({ ...song, artistId: String(song.artistId) });
    setEditing(song.id);
    setTab("songs");
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sicuro di voler eliminare questa canzone?")) {
      dispatch(deleteSong(id));
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditing(null);
    setErrors({});
  };

  if (status === "loading") return <Loader />;

  return (
    <div>
      <h1 className="page-title">⚙️ Dashboard Admin</h1>

      <div className="dash-tabs">
        <button onClick={() => setTab("songs")} className={tab === "songs" ? "tab active" : "tab"}>
          🎵 Canzoni
        </button>
        <button onClick={() => setTab("artists")} className={tab === "artists" ? "tab active" : "tab"}>
          🎤 Artisti
        </button>
      </div>

      {tab === "songs" && (
        <div className="dash-layout">
          <div className="dash-form-card">
            <h2>{editing ? "✏️ Modifica canzone" : "➕ Aggiungi canzone"}</h2>
            <form onSubmit={handleSubmit} className="dash-form">
              <div className="form-group">
                <label>Titolo</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Es. Gotta Catch Em All" />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label>Artista</label>
                <select name="artistId" value={form.artistId} onChange={handleChange}>
                  <option value="">Seleziona...</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                {errors.artistId && <span className="form-error">{errors.artistId}</span>}
              </div>
              <div className="form-group">
                <label>Fascia d'età</label>
                <select name="ageGroup" value={form.ageGroup} onChange={handleChange}>
                  <option value="">Seleziona...</option>
                  <option value="0-3">0-3 anni</option>
                  <option value="3-6">3-6 anni</option>
                  <option value="6-9">6-9 anni</option>
                  <option value="9+">9+ anni</option>
                </select>
                {errors.ageGroup && <span className="form-error">{errors.ageGroup}</span>}
              </div>
              <div className="form-group">
                <label>Durata</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="Es. 2:30" />
                {errors.duration && <span className="form-error">{errors.duration}</span>}
              </div>
              <div className="form-group">
                <label>Cover (emoji)</label>
                <input name="cover" value={form.cover} onChange={handleChange} placeholder="Es. ⭐" />
                {errors.cover && <span className="form-error">{errors.cover}</span>}
              </div>
              <div className="form-group">
                <label>Testo (opzionale)</label>
                <textarea name="lyrics" value={form.lyrics} onChange={handleChange} placeholder="Inserisci il testo..." rows={3} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editing ? "Salva modifiche" : "Aggiungi"}
                </button>
                {editing && (
                  <button type="button" onClick={handleCancel} className="btn-outline">
                    Annulla
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="dash-table-card">
            <h2>📋 Lista canzoni ({songs.length})</h2>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Titolo</th>
                  <th>Età</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.id}>
                    <td>{song.cover}</td>
                    <td>{song.title}</td>
                    <td>
                      <span className="card-badge">{song.ageGroup}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => handleEdit(song)} className="btn-edit">
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(song.id)} className="btn-delete">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "artists" && (
        <div className="dash-table-card">
          <h2>📋 Lista artisti ({artists.length})</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Nome</th>
                <th>Genere</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id}>
                  <td>{artist.cover}</td>
                  <td>{artist.name}</td>
                  <td>
                    <span className="card-badge">{artist.genre}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
