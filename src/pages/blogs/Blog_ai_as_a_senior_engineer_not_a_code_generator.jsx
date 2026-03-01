// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_ai_as_a_senior_engineer_not_a_code_generator() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "AI As A Senior Engineer Not A Code Generator";
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
              <span className="terminal-title">blog — ai_as_a_senior_engineer_not_a_code_generator.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat ai_as_a_senior_engineer_not_a_code_generator.md
                </span>
              </div>
              <h1 className="blog-title">AI As A Senior Engineer Not A Code Generator</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-03-01</span>
                <span className="blog-read-time">4 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">AI</span>
          <span className="blog-tag">Engineering</span>
          <span className="blog-tag">Productivity</span>
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
      <p key={0} className="blog-paragraph">Most developers use AI to generate code. I use it to challenge decisions.</p>

      <h2 key={1} className="blog-heading">AI As A Design Reviewer</h2>

      <p key={2} className="blog-paragraph">Before implementing a feature, I ask AI what could break in production, what edge cases I am missing, and how the design could fail under load.</p>

      <div key={3} className="blog-callout">This turns AI into a design reviewer, not a typing assistant.</div>

      <h2 key={4} className="blog-heading">Pre-Mortems Beat Post-Mortems</h2>

      <p key={5} className="blog-paragraph">AI is extremely good at simulated failure analysis. By asking how the system will fail, I discovered race conditions, security gaps, and data consistency issues.</p>

      <p key={6} className="blog-paragraph">These are failure scenarios most teams only discover after launch.</p>

      <h2 key={7} className="blog-heading">Conclusion</h2>

      <p key={8} className="blog-paragraph">AI should be used as a senior engineer who reviews your work, not as a junior who writes it. The real productivity gain is fewer production incidents.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
