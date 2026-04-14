import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
