// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_gps_lies() {
  return (
    <>
      <HackerBackground />
      <div className="blog-page page-content">
        <nav className="nav-bar">
          <Link to="/blog" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <ArrowLeft size={16} />
            ~/blog
          </Link>
          <div className="nav-logo">~/prakhar</div>
        </nav>

        <div className="blog-container">
          {/* Terminal-style header */}
          <div className="terminal-window" style={{ marginBottom: '2rem' }}>
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">blog — gps_lies.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat gps_lies.md
                </span>
              </div>
              <h1 className="blog-title">GPS Lies: Why Distance Alone Cannot Validate a Delivery</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-02-25</span>
                <span className="blog-read-time">5 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">GPS</span>
          <span className="blog-tag">Firebase</span>
          <span className="blog-tag">PWA</span>
          <span className="blog-tag">Engineering</span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">content</span>
            </div>
            <div className="terminal-body blog-content" style={{ padding: '2rem' }}>
      <p key={0} className="blog-paragraph">When building a delivery tracking system, the obvious logic looks like this:</p>

      <div key={1} className="blog-callout">If driver is within 20 meters → mark delivery valid.</div>

      <p key={2} className="blog-paragraph">Simple. Also wrong.</p>

      <p key={3} className="blog-paragraph">While working on a project, I discovered that distance alone is not reliable. The real issue is GPS accuracy.</p>

      <h2 key={4} className="blog-heading">The Hidden Field Most Developers Ignore</h2>

      <p key={5} className="blog-paragraph">When you call navigator.geolocation.getCurrentPosition(), you don't just get latitude and longitude. You also get accuracy. That number changes everything.</p>

      <pre key={6} className="blog-code"><code>{"navigator.geolocation.getCurrentPosition((position) => {\n  const { latitude, longitude, accuracy } = position.coords;\n  // accuracy = radius in meters — NEVER ignore this!\n});"}</code></pre>

      <h2 key={7} className="blog-heading">Example: Why Accuracy Changes Everything</h2>

      <p key={8} className="blog-paragraph">Distance from delivery point: 12 meters. Accuracy: ±70 meters. This means the phone is only confident within a 70-meter radius. So even if the driver appears "12 meters away", the actual position could be far outside your delivery boundary. Now imagine rejecting a valid delivery because GPS was unstable. That's a bad system.</p>

      <h2 key={9} className="blog-heading">Real Data I Observed</h2>

      <div key={10} className="blog-table-wrapper">
        <table className="blog-table">
          <thead><tr><th>Case</th><th>Distance</th><th>Accuracy</th><th>Signal</th></tr></thead>
          <tbody><tr><td>Case 1</td><td>6 meters</td><td>±8 meters</td><td>Strong signal, high confidence</td></tr>
            <tr><td>Case 2</td><td>12 meters</td><td>±70 meters</td><td>Weak signal, medium confidence</td></tr>
            <tr><td>Case 3</td><td>40 meters</td><td>±15 meters</td><td>User is clearly away, low confidence</td></tr></tbody>
        </table>
      </div>

      <div key={11} className="blog-callout">Distance without accuracy is meaningless.</div>

      <h2 key={12} className="blog-heading">The Fix: A Confidence-Based Model</h2>

      <p key={13} className="blog-paragraph">Instead of binary validation (Valid / Invalid), I built a confidence scoring model. The system evaluates: Distance from target, GPS accuracy value, and Region bounding box validation (India / US).</p>

      <p key={14} className="blog-paragraph">Then it classifies delivery as: High Confidence, Medium Confidence, or Low Confidence. This approach reduces false rejections, handles real-world GPS noise, improves driver experience, and makes audit decisions smarter.</p>

      <h2 key={15} className="blog-heading">Why This Matters in Production</h2>

      <p key={16} className="blog-paragraph">In controlled environments, GPS looks clean. In the real world: Network conditions fluctuate. Buildings block signals. Devices vary in sensor quality. Users sometimes spoof coordinates. If your validation logic is naive, your product breaks under real-world conditions.</p>

      <div key={17} className="blog-callout">Engineering is not about ideal data. It is about handling imperfect data intelligently.</div>

      <h2 key={18} className="blog-heading">Key Takeaway</h2>

      <p key={19} className="blog-paragraph">Never validate location using distance alone. Always combine: Distance, Accuracy, and Context. If you ignore accuracy, your system will reject valid users and accept invalid ones.</p>

      <p key={20} className="blog-paragraph">Real systems require probabilistic thinking, not checkbox logic. If you're building location-based validation, treat GPS as an estimate — not truth. That one mindset shift changes everything.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
