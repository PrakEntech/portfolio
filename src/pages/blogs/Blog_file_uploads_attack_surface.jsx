// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_file_uploads_attack_surface() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "File Uploads Are an Attack Surface";
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
              <span className="terminal-title">blog — file_uploads_attack_surface.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat file_uploads_attack_surface.md
                </span>
              </div>
              <h1 className="blog-title">File Uploads Are an Attack Surface</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-02-27</span>
                <span className="blog-read-time">4 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">Security</span>
          <span className="blog-tag">Storage</span>
          <span className="blog-tag">Architecture</span>
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
      <p key={0} className="blog-paragraph">Allowing users to upload files sounds harmless. It is not.</p>

      <p key={1} className="blog-paragraph">Without controls, users can spam uploads, overwrite files, inflate storage costs, or attempt unauthorized access.</p>

      <div key={2} className="blog-callout">The first rule is simple. Keep your storage bucket private. No public access. Ever.</div>

      <h2 key={3} className="blog-heading">Short-Lived Signed URLs</h2>

      <p key={4} className="blog-paragraph">Control uploads using short-lived signed URLs. Here is the flow I implemented:</p>

      <p key={5} className="blog-paragraph">When a client wants to upload a file, it does not receive upload permission immediately. It sets a flag in the database indicating intent.</p>

      <p key={6} className="blog-paragraph">A backend function listens for that flag. When detected, it generates a signed upload URL with a unique filename and a short expiration time.</p>

      <p key={7} className="blog-paragraph">The signed URL is written back to the database. The client uses it for direct upload. After upload completes, another backend function removes the signed URL from the record. It cannot be reused.</p>

      <h2 key={8} className="blog-heading">Strict Traceability</h2>

      <p key={9} className="blog-paragraph">If the system detects an upload attempt after the URL was removed, it creates an incident alert.</p>

      <p key={10} className="blog-paragraph">Every upload becomes controlled, traceable, and temporary.</p>

      <div key={11} className="blog-callout">File uploads should be treated like temporary permissions, not permanent capabilities.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
