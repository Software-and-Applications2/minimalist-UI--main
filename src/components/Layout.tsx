import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Files", path: "/admin/files" },
  { label: "Settings", path: "/admin/settings" },
];

export function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Minimalist</h2>
          <span className="badge">Admin</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`nav-item${location.pathname === item.path ? " active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="nav-item visitor-link">View Site</Link>
          <button onClick={logout} className="nav-item logout-btn">Logout</button>
        </div>
      </aside>
      <main className="admin-main"><Outlet /></main>
    </div>
  );
}

export function VisitorLayout() {
  return (
    <div className="visitor-layout">
      <header className="visitor-header">
        <div className="visitor-header-inner">
          <h1 className="visitor-logo">Minimalist</h1>
          <a href="/admin/login" className="admin-login-link">Admin</a>
        </div>
      </header>
      <main className="visitor-main"><Outlet /></main>
    </div>
  );
}
