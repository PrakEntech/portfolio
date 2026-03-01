// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_using_ai_to_simulate_malicious_users() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Using AI To Simulate Malicious Users";
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
              <span className="terminal-title">blog — using_ai_to_simulate_malicious_users.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat using_ai_to_simulate_malicious_users.md
                </span>
              </div>
              <h1 className="blog-title">Using AI To Simulate Malicious Users</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-03-05</span>
                <span className="blog-read-time">4 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">Security</span>
          <span className="blog-tag">AI</span>
          <span className="blog-tag">Testing</span>
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
      <p key={0} className="blog-paragraph">Most testing assumes users behave correctly. Attackers do not.</p>

      <h2 key={1} className="blog-heading">Adversarial Prompting</h2>

      <p key={2} className="blog-paragraph">I use AI to generate abuse scenarios by asking how someone could bypass validation, exploit APIs, or abuse trust boundaries.</p>

      <div key={3} className="blog-callout">AI thinks like an adversary.</div>

      <h2 key={4} className="blog-heading">Adversarial Testing Outcomes</h2>

      <p key={5} className="blog-paragraph">This approach revealed ways to spam endpoints, data overwrite vulnerabilities, and privilege escalation paths.</p>

      <p key={6} className="blog-paragraph">Security improves when you test against hostile behavior, not ideal behavior.</p>

      <h2 key={7} className="blog-heading">Conclusion</h2>

      <p key={8} className="blog-paragraph">If you only test happy paths, your system is unprepared for reality. AI is an effective chaos agent for security thinking.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
