// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_auth_not_security() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Your Database Is Not Protected Just Because Users Are Logged In";
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
              <span className="terminal-title">blog — auth_not_security.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat auth_not_security.md
                </span>
              </div>
              <h1 className="blog-title">Your Database Is Not Protected Just Because Users Are Logged In</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-03-01</span>
                <span className="blog-read-time">3 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">Security</span>
          <span className="blog-tag">Database</span>
          <span className="blog-tag">Authentication</span>
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
      <div key={0} className="blog-callout">Authentication is not security.</div>

      <p key={1} className="blog-paragraph">Many apps allow read and write access to a database simply because the user is authenticated. That is not protection. That is basic access.</p>

      <p key={2} className="blog-paragraph">Real protection starts when you assume even authenticated users can abuse the system.</p>

      <p key={3} className="blog-paragraph">I enforced strict authenticated access at the database level. No public reads. No public writes. Everything scoped to the user.</p>

      <h2 key={4} className="blog-heading">Then I added monitoring.</h2>

      <p key={5} className="blog-paragraph">Every read and write operation was tracked in aggregate. If the system detected unusual spikes such as 50 or 100 operations per minute depending on expected usage, it triggered an alert.</p>

      <p key={6} className="blog-paragraph">That alert did not just notify someone.</p>

      <p key={7} className="blog-paragraph">It triggered a Cloud Function that disabled database access programmatically and created an incident in Zenduty. The system shut itself down before damage escalated.</p>

      <h2 key={8} className="blog-heading">Active Defense</h2>

      <p key={9} className="blog-paragraph">Abuse prevention should not depend on someone noticing a dashboard. It should respond automatically.</p>

      <div key={10} className="blog-callout">If your backend cannot defend itself in real time, it is fragile.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
