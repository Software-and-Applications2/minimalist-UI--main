export default function Home() {
  return (
    <div className="visitor-content">
      <section className="hero">
        <h1>Write. Create. Organize.</h1>
        <p className="hero-subtitle">
          A lightweight Markdown editor with Excalidraw integration.
          Distraction-free writing for ideas, notes, and diagrams.
        </p>
      </section>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Markdown Editor</h3>
            <p>Full-featured Markdown with live preview.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Excalidraw Integration</h3>
            <p>Embed diagrams and sketches in notes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>File Management</h3>
            <p>Organize with folders and files.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Sync</h3>
            <p>Sync across devices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Custom Themes</h3>
            <p>Multiple themes and colors.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Full-Text Search</h3>
            <p>Search all notes instantly.</p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Minimalist is in development. Check back soon.</p>
      </section>
      <footer className="visitor-footer">
        <p>&copy; 2025 Minimalist. Built with React + Vite.</p>
      </footer>
    </div>
  );
}
