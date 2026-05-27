import { Link } from "react-router-dom";

function ArtistCard({ artist }) {
  return (
    <div className="card">
      <div className="card-cover">{artist.cover}</div>
      <div className="card-body">
        <span className="card-badge">{artist.genre}</span>
        <h3 className="card-title" style={{ color: "#9B7FC7" }}>
          {artist.name}
        </h3>
        <p className="card-bio">{artist.bio}</p>
        <div className="card-actions">
          <Link to={`/artists/${artist.id}`} className="btn-primary">
            Scopri
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
