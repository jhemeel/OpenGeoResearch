import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <div>
          <h1>OpenGeoResearch</h1>
        </div>

        <div>
          <span>
            {user?.full_name || user?.email}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        {" | "}

        <NavLink to="/projects">
          Projects
        </NavLink>

        {" | "}

        <NavLink to="/members">
          Members
        </NavLink>

        {" | "}

        <NavLink to="/analytics">
          Analytics
        </NavLink>

        {" | "}

        <NavLink to="/maps">
          Maps
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;