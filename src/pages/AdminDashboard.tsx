import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const resp = await fetch("/api/setPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: newPass, token }),
      });
      const data = await resp.json();
      if (data.success) {
        setMsg("Password updated successfully.");
        setNewPass("");
      } else {
        setMsg(`Error: ${data.message || "unknown"}`);
      }
    } catch (err) {
      setMsg("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Images</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Workspaces</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Active</div>
          <div className="stat-label">Status</div>
        </div>
      </div>

      <section className="change-password" style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #333", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "1rem" }}>Change Admin Password</h2>
        <form onSubmit={handleChange} className="password-form" style={{ display: "flex", gap: "1rem" }}>
          <input
            type="password"
            placeholder="New password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            disabled={loading}
            style={{ padding: "0.5rem 1rem", borderRadius: "4px", border: "1px solid #444", background: "#222", color: "#fff", flex: 1 }}
          />
          <button type="submit" disabled={loading || !newPass} style={{ padding: "0.5rem 1.5rem", borderRadius: "4px", border: "none", background: "#0070f3", color: "#fff", cursor: "pointer" }}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
        {msg && <p className="msg" style={{ marginTop: "1rem", color: msg.includes("Error") ? "#ff4d4d" : "#00cd00" }}>{msg}</p>}
      </section>

      <div className="admin-actions" style={{ marginTop: "2rem" }}>
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <button className="action-card" disabled>
            <span className="action-icon">📄</span>
            <span>New Document</span>
          </button>
          <button className="action-card" disabled>
            <span className="action-icon">📁</span>
            <span>New Folder</span>
          </button>
          <button className="action-card" disabled>
            <span className="action-icon">⚙️</span>
            <span>Settings</span>
          </button>
          <button className="action-card" disabled>
            <span className="action-icon">📤</span>
            <span>Export All</span>
          </button>
        </div>
        <p className="dev-notice">File management features coming soon.</p>
      </div>
    </div>
  );
}
