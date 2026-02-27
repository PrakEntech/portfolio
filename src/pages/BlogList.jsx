// AUTO-GENERATED — do not edit manually.
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HackerBackground from '../components/HackerBackground';
import { BookOpen } from 'lucide-react';

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const blogs = [{"id":"gps_lies","title":"GPS Lies: Why Distance Alone Cannot Validate a Delivery","date":"2026-02-25","tags":["GPS","Firebase","PWA","Engineering"],"path":"/blog/gps_lies"},{"id":"event_driven_security","title":"Event Driven Security Is Safer Than Public Endpoints","date":"2026-02-26","tags":["Security","Architecture","Backend"],"path":"/blog/event_driven_security"},{"id":"file_uploads_attack_surface","title":"File Uploads Are an Attack Surface","date":"2026-02-27","tags":["Security","Storage","Architecture"],"path":"/blog/file_uploads_attack_surface"}];

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

            <div style={{ marginTop: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>$ grep -i</div>
              <input
                type="text"
                placeholder="search_query"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  background: 'rgba(34,211,238,0.05)',
                  border: '1px solid rgba(34,211,238,0.2)',
                  borderRadius: '6px',
                  padding: '12px 12px 12px 100px',
                  color: 'var(--text-color)',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(34,211,238,0.2)'}
              />
            </div>
          </div>

          <div className="blog-grid">
            {filteredBlogs.length > 0 ? filteredBlogs.map(blog => (
              <Link to={blog.path} className="blog-card" key={blog.id}>
                <div className="terminal-window" style={{ height: '100%' }}>
                  <div className="terminal-header">
                    <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                    <span className="terminal-title">{blog.id}.md</span>
                  </div>
                  <div className="terminal-body" style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                      $ cat {blog.id}.md
                    </div>
                    <h2 className="blog-card-title">{blog.title}</h2>
                    <div className="blog-meta-row">
                      <span className="blog-date">{blog.date}</span>
                    </div>
                    <div className="blog-tags" style={{ marginTop: '0.75rem' }}>
                      {blog.tags.map(tag => (
                        <span key={tag} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: '1rem', color: 'var(--accent-blue)', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>
                      read more →
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--accent-red)', fontFamily: "'Fira Code', monospace" }}>
                [ERR] No matches found for pattern: "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
