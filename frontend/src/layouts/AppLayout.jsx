import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import icon from "../assets/images/logo.svg";

function AppLayout() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    [
      "rounded-ogr-md px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-ogr-primary-50 text-ogr-primary-700"
        : "text-ogr-slate-600 hover:bg-ogr-slate-100 hover:text-ogr-slate-900",
    ].join(" ");

  return (
    <div className="min-h-screen bg-ogr-slate-50">
      {/* Header */}
      <header className="border-b border-ogr-slate-200 bg-white shadow-ogr-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand */}

          <div>
            <h1 className="text-xl font-bold tracking-tight text-ogr-slate-900 sm:text-2xl flex items-center gap-1">
            <img src={icon} alt="OpenGeoResearch" className="h-12 w-12" /> OpenGeoResearch
            </h1>

            <p className="hidden text-xs text-ogr-slate-500 sm:block ml-14">
              Research &amp; Data Analytic Platform
            </p>
          </div>

          {/* User area */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-ogr-slate-800">
                {user?.full_name || user?.email}
              </p>

              {user?.email && user?.full_name && (
                <p className="text-xs text-ogr-slate-500">{user.email}</p>
              )}
            </div>

            <button
              type="button"
              onClick={logout}
              className="
                rounded-ogr-md
                border
                border-ogr-slate-300
                bg-white
                px-3
                py-2
                text-sm
                font-medium
                text-ogr-slate-700
                transition-colors
                hover:border-ogr-danger
                hover:bg-red-50
                hover:text-ogr-danger
                focus:outline-none
                focus:ring-2
                focus:ring-ogr-primary-500
                focus:ring-offset-2
              "
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-ogr-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>

            <NavLink to="/members" className={navLinkClass}>
              Members
            </NavLink>

            <NavLink to="/analytics" className={navLinkClass}>
              Analytics
            </NavLink>

            <NavLink to="/maps" className={navLinkClass}>
              Maps
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
