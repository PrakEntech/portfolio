// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_event_driven_security() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Event Driven Security Is Safer Than Public Endpoints";
    return () => { document.title = originalTitle; };
  }, []);

  return (
    <>
      <HackerBackground />
      <div className="blog-page page-content">
        <nav className="nav-bar">
          <Link to="/blog" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <ArrowLeft size={16} />
            ~/blog
          </Link>
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>~/prakhar</Link>
        </nav>

        <div className="blog-container">
          {/* Terminal-style header */}
          <div className="terminal-window" style={{ marginBottom: '2rem' }}>
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">blog — event_driven_security.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat event_driven_security.md
                </span>
              </div>
              <h1 className="blog-title">Event Driven Security Is Safer Than Public Endpoints</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-02-26</span>
                <span className="blog-read-time">3 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">Security</span>
          <span className="blog-tag">Architecture</span>
          <span className="blog-tag">Backend</span>
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
      <p key={0} className="blog-paragraph">Public HTTP endpoints are easy to expose and easy to attack.</p>

      <p key={1} className="blog-paragraph">If your backend logic depends on callable HTTP functions, you are increasing your attack surface.</p>

      <h2 key={2} className="blog-heading">Event Driven Operations</h2>

      <p key={3} className="blog-paragraph">Design backend operations to be event driven instead.</p>

      <div key={4} className="blog-table-wrapper">
        <table className="blog-table">
          <thead><tr><th>Functionality</th></tr></thead>
          <tbody><tr><td>Signed URL generation</td></tr>
            <tr><td>Upload cleanup</td></tr>
            <tr><td>Abuse detection</td></tr>
            <tr><td>Database shutdown</td></tr></tbody>
        </table>
      </div>

      <p key={5} className="blog-paragraph">None of these functions are publicly exposed. They are triggered by database changes or storage events.</p>

      <p key={6} className="blog-paragraph">This means external actors cannot directly invoke them. They only execute when internal system events occur.</p>

      <h2 key={7} className="blog-heading">Reduced Attack Surface</h2>

      <p key={8} className="blog-paragraph">Event driven architecture reduces entry points. Fewer entry points means fewer ways to break your system.</p>

      <div key={9} className="blog-callout">Security improves when you reduce what can be accessed from the outside.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
