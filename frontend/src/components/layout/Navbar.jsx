import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function Navbar() {
  const { isAuthenticated, logout, isLoading, user } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  return (
    <header>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          Blog Frontend
        </Link>

        <nav className="navbar__links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          {isLoading ? (
            <span className="navbar__user">Loading...</span>
          ) : !isAuthenticated ? (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>

              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>

              <NavLink to="/posts/new" className="nav-link">
                New Post
              </NavLink>

              <span className="navbar__user">Hi, {user.username}</span>

              <button type="button" onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
