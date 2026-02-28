#!/usr/bin/env node
/**
 * generate-blogs.js
 *
 * Reads src/data/blogs.csv and for each blog key:
 *   1. Reads src/data/blogs/<key>.json
 *   2. Generates src/pages/blogs/Blog_<key>.jsx  (individual blog post page)
 *
 * Also generates:
 *   - src/pages/BlogList.jsx   (the /blog index page)
 *   - src/generated/BlogRoutes.jsx  (auto-updated routes file, imported by App.jsx)
 *
 * Usage:
 *   node scripts/generate-blogs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Paths ──────────────────────────────────────────────────
const CSV_PATH = path.join(ROOT, 'src', 'data', 'blogs.csv');
const BLOGS_DIR = path.join(ROOT, 'src', 'data', 'blogs');
const PAGES_OUT = path.join(ROOT, 'src', 'pages', 'blogs');
const LIST_OUT = path.join(ROOT, 'src', 'pages', 'BlogList.jsx');
const ROUTES_OUT = path.join(ROOT, 'src', 'generated', 'BlogRoutes.jsx');

// ── Helpers ────────────────────────────────────────────────
function parseCsv(raw) {
  const lines = raw.trim().split('\n').filter(Boolean);
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

function escapeJSX(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function generateSectionJSX(section, idx) {
  switch (section.type) {
    case 'intro':
    case 'paragraph':
      return `      <p key={${idx}} className="blog-paragraph">${escapeJSX(section.content)}</p>`;

    case 'heading':
      return `      <h2 key={${idx}} className="blog-heading">${escapeJSX(section.content)}</h2>`;

    case 'callout':
      return `      <div key={${idx}} className="blog-callout">${escapeJSX(section.content)}</div>`;

    case 'code':
      return `      <pre key={${idx}} className="blog-code"><code>{${JSON.stringify(section.content)}}</code></pre>`;

    case 'table':
      return `      <div key={${idx}} className="blog-table-wrapper">
        <table className="blog-table">
          <thead><tr>${section.headers.map(h => `<th>${escapeJSX(h)}</th>`).join('')}</tr></thead>
          <tbody>${section.rows.map(row => `<tr>${row.map(c => `<td>${escapeJSX(c)}</td>`).join('')}</tr>`).join('\n            ')}</tbody>
        </table>
      </div>`;

    default:
      return `      <p key={${idx}}>${escapeJSX(section.content ?? '')}</p>`;
  }
}

function generateBlogPage(blogData) {
  const sectionsJSX = blogData.sections.map(generateSectionJSX).join('\n\n');
  const tagsJSX = blogData.tags.map(t => `<span className="blog-tag">${t}</span>`).join('\n          ');

  return `// AUTO-GENERATED — do not edit manually.
// Re-run: node scripts/generate-blogs.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackerBackground from '../../components/HackerBackground';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default function Blog_${blogData.key}() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = ${JSON.stringify(blogData.title)};
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
              <span className="terminal-title">blog — ${escapeJSX(blogData.key)}.md</span>
            </div>
            <div className="terminal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="blog-meta">
                <span style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem' }}>
                  $ cat ${escapeJSX(blogData.key)}.md
                </span>
              </div>
              <h1 className="blog-title">${escapeJSX(blogData.title)}</h1>
              <div className="blog-meta-row">
                <span className="blog-date"><Clock size={13} style={{ marginRight: '4px', display: 'inline' }} />${escapeJSX(blogData.date)}</span>
                <span className="blog-read-time">${escapeJSX(blogData.readTime)}</span>
              </div>
              <div className="blog-tags">
                <Tag size={13} style={{ marginRight: '6px', opacity: 0.6 }} />
                ${tagsJSX}
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
${sectionsJSX}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
`;
}

function generateBlogList(blogs) {
  const blogsData = JSON.stringify(blogs.map(b => ({
    id: b.key,
    title: b.title,
    date: b.date,
    tags: b.tags.split(';').map(t => t.trim()),
    path: `/blog/${b.key}`
  })));

  return `// AUTO-GENERATED — do not edit manually.
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HackerBackground from '../components/HackerBackground';
import { BookOpen } from 'lucide-react';

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const blogs = ${blogsData};

  const handleSearchChange = (e) => {
    const val = e.target.value;
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
`;
}

function generateRoutes(blogs) {
  const imports = blogs.map(b =>
    `import Blog_${b.key} from '../pages/blogs/Blog_${b.key}.jsx';`
  ).join('\n');

  const routes = blogs.map(b =>
    `      <Route path="${b.key}" element={<Blog_${b.key} />} />`
  ).join('\n');

  return `// AUTO-GENERATED — do not edit manually.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from '../pages/BlogList.jsx';
${imports}

export default function BlogRoutes() {
  return (
    <Routes>
      <Route index element={<BlogList />} />
${routes}
    </Routes>
  );
}
`;
}

// ── Main ───────────────────────────────────────────────────
const csvRaw = fs.readFileSync(CSV_PATH, 'utf-8');
const blogs = parseCsv(csvRaw);

fs.mkdirSync(PAGES_OUT, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'src', 'generated'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'src', 'pages'), { recursive: true });

const generated = [];

for (const meta of blogs) {
  const jsonPath = path.join(BLOGS_DIR, `${meta.key}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.warn(`⚠  Skipping ${meta.key}: no data file at ${jsonPath}`);
    continue;
  }
  const blogData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const outPath = path.join(PAGES_OUT, `Blog_${meta.key}.jsx`);
  fs.writeFileSync(outPath, generateBlogPage(blogData));
  console.log(`✓  Generated ${outPath}`);
  generated.push(meta);
}

fs.writeFileSync(LIST_OUT, generateBlogList(generated));
console.log(`✓  Generated ${LIST_OUT}`);

fs.writeFileSync(ROUTES_OUT, generateRoutes(generated));
console.log(`✓  Generated ${ROUTES_OUT}`);

console.log('\n🚀 Blog generation complete!');
