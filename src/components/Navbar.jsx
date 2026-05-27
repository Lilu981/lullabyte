import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const { isLogged, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🌸 LullaByte
      </Link>
      <div className="navbar-links">
        <Link to="/songs">Canzoni</Link>
        <Link to="/artists">Artisti</Link>
        {isLogged && <Link to="/favorites">Preferiti</Link>}
        {isLogged && user?.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div className="navbar-auth">
        {isLogged ? (
          <button onClick={handleLogout} className="btn-outline">
            Esci
          </button>
        ) : (
          <Link to="/login" className="btn-primary">
            Accedi
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
