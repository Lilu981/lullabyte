import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isLogged, user } = useSelector((state) => state.auth);

  if (!isLogged) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
