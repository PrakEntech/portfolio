// AUTO-GENERATED — do not edit manually.
import React from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../components/HackerBackground';
import { BookOpen } from 'lucide-react';

export default function BlogList() {
  return (
    <>
      <HackerBackground />
      <div className="blog-page page-content">
        <nav className="nav-bar">
          <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← ~/home
          </Link>
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>~/prakhar</Link>
        </nav>

        <div className="blog-container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              $ ls -la ~/blog/
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-color)' }}>
              <BookOpen size={28} style={{ display: 'inline', marginRight: '12px', verticalAlign: 'middle', color: 'var(--accent-green)' }} />
              Blog
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Engineering notes, real-world discoveries, and system design thinking.
            </p>
          </div>

          <div className="blog-grid">
        <Link to="/blog/gps_lies" className="blog-card" key="gps_lies">
          <div className="terminal-window" style={{ height: '100%' }}>
            <div className="terminal-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">gps_lies.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                $ cat gps_lies.md
              </div>
              <h2 className="blog-card-title">GPS Lies: Why Distance Alone Cannot Validate a Delivery</h2>
              <div className="blog-meta-row">
                <span className="blog-date">2026-02-25</span>
              </div>
              <div className="blog-tags" style={{ marginTop: '0.75rem' }}>
            <span className="blog-tag">GPS</span>
            <span className="blog-tag">Firebase</span>
            <span className="blog-tag">PWA</span>
            <span className="blog-tag">Engineering</span>
              </div>
              <div style={{ marginTop: '1rem', color: 'var(--accent-blue)', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>
                read more →
              </div>
            </div>
          </div>
        </Link>
          </div>
        </div>
      </div>
    </>
  );
}
