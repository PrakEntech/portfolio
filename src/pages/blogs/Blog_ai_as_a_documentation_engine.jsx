// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_ai_as_a_documentation_engine() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "AI As A Documentation Engine";
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
              <span className="terminal-title">blog — ai_as_a_documentation_engine.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat ai_as_a_documentation_engine.md
                </span>
              </div>
              <h1 className="blog-title">AI As A Documentation Engine</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-03-04</span>
                <span className="blog-read-time">3 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">Documentation</span>
          <span className="blog-tag">AI</span>
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
      <p key={0} className="blog-paragraph">Most documentation is written after the system exists. I generate documentation while building.</p>

      <h2 key={1} className="blog-heading">Generate Docs In Parallel</h2>

      <p key={2} className="blog-paragraph">After implementing a component, I ask AI to produce operational runbooks, failure scenarios, maintenance procedures, and onboarding guides.</p>

      <div key={3} className="blog-callout">This prevents knowledge silos.</div>

      <h2 key={4} className="blog-heading">Documentation As Infrastructure</h2>

      <p key={5} className="blog-paragraph">Undocumented systems are fragile. If only one person understands the system, the system is already broken.</p>

      <p key={6} className="blog-paragraph">AI makes high-quality documentation cheap enough to produce continuously.</p>

      <h2 key={7} className="blog-heading">Conclusion</h2>

      <p key={8} className="blog-paragraph">Documentation should not be a project phase. It should be a parallel process. AI makes that feasible.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
