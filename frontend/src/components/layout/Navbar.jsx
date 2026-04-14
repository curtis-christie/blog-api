import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function Navbar() {
  const { isAuthenticated, logout, demoLogin, user } = useAuth();

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

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>

              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>

              <button type="button" onClick={demoLogin} className="nav-button">
                Demo Login
              </button>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>

              <NavLink to="/posts/new" className="nav-link">
                New Post
              </NavLink>

              <span className="navbar__user">Hi, {user?.username}</span>

              <button type="button" onClick={logout} className="nav-button">
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
