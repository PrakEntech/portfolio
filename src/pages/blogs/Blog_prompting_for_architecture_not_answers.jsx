// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_prompting_for_architecture_not_answers() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Prompting For Architecture Not Answers";
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
              <span className="terminal-title">blog — prompting_for_architecture_not_answers.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat prompting_for_architecture_not_answers.md
                </span>
              </div>
              <h1 className="blog-title">Prompting For Architecture Not Answers</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />2026-03-03</span>
                <span className="blog-read-time">4 min read</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                <span className="blog-tag">AI</span>
          <span className="blog-tag">Architecture</span>
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
      <p key={0} className="blog-paragraph">Bad prompts produce shallow answers.</p>

      <p key={1} className="blog-paragraph">Instead of asking how to build a feature, ask for a production-grade architecture for a defined constraint set.</p>

      <h2 key={2} className="blog-heading">Prompt For Constraints</h2>

      <p key={3} className="blog-paragraph">Include scale expectations, security requirements, failure tolerance, and cost constraints. AI responds with system design, not snippets.</p>

      <h2 key={4} className="blog-heading">Constraint Driven Thinking</h2>

      <p key={5} className="blog-paragraph">Real engineering is about tradeoffs. By specifying constraints first, you force AI to justify decisions, expose assumptions, and suggest alternatives.</p>

      <p key={6} className="blog-paragraph">This mirrors real design reviews in high-performing teams.</p>

      <h2 key={7} className="blog-heading">Conclusion</h2>

      <p key={8} className="blog-paragraph">AI becomes powerful when you stop asking for solutions and start asking for designs.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
