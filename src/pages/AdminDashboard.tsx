export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-value">0</div><div className="stat-label">Documents</div></div>
        <div className="stat-card"><div className="stat-value">0</div><div className="stat-label">Images</div></div>
        <div className="stat-card"><div className="stat-value">0</div><div className="stat-label">Workspaces</div></div>
        <div className="stat-card"><div className="stat-value">Active</div><div className="stat-label">Status</div></div>
      </div>
      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <button className="action-card" disabled><span className="action-icon">ðŸ“„</span><span>New Document</span></button>
          <button className="action-card" disabled><span className="action-icon">ðŸ“</span><span>New Folder</span></button>
          <button className="action-card" disabled><span className="action-icon">âš™ï¸</span><span>Settings</span></button>
          <button className="action-card" disabled><span className="action-icon">ðŸ“¤</span><span>Export All</span></button>
        </div>
        <p className="dev-notice">File management features coming soon.</p>
      </div>
    </div>
  );
}
