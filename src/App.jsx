import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HackerBackground from './components/HackerBackground';
import TypewriterText from './components/TypewriterText';
import InteractiveTerminal from './components/InteractiveTerminal';
import MobileNav from './components/MobileNav';
import ScrollReveal from './components/ScrollReveal';
import BlogRoutes from './generated/BlogRoutes.jsx';
import { resumeData } from './data/resumeData';
import {
  Briefcase, GraduationCap, Github, Linkedin,
  Mail, Phone, Cpu, FolderGit2, ChevronRight, Star, MapPin,
  Download, List
} from 'lucide-react';

const FlowDiagramViewer = lazy(() => import('./components/FlowDiagramViewer'));

/* ── Section heading ────────────────────────────────────── */
const SectionHeading = ({ icon, label, command }) => (
  <div className="section-heading">
    {React.createElement(icon, { className: 'section-heading-icon', size: 22 })}
    <span className="section-heading-label">
      <TypewriterText text={label} speed={5} />
    </span>
    <div className="section-heading-line" />
    {command && (
      <span className="section-heading-command">
        <TypewriterText text={command} speed={5} />
      </span>
    )}
  </div>
);

/* ── Featured Weberon card ──────────────────────────────── */
const FeaturedExpCard = ({ exp }) => (
  <div className="exp-card featured-card">
    <div className="exp-header">
      <div>
        <div className="exp-company">
          <Star size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-yellow)', verticalAlign: 'middle' }} />
          {exp.company}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap' }}>
          <span className="epoch-badge intern">{exp.internPeriod}</span>
          <span className="epoch-badge fulltime">{exp.fullTimePeriod}</span>
        </div>
      </div>
      <div className="exp-period">{exp.period}</div>
    </div>
    <div className="exp-role fulltime">{exp.role}</div>
    <div className="exp-overview">
      <TypewriterText text={exp.overview} speed={5} />
    </div>
    <div className="exp-groups">
      {exp.groups.map((group, gi) => (
        <div key={gi} className="exp-group">
          <div className="exp-group-label">
            <ChevronRight size={12} style={{ marginRight: '4px' }} />
            {group.label}
          </div>
          <ul className="exp-bullets">
            {group.bullets.map((bullet, bi) => (
              <li key={bi} className="exp-bullet">
                <TypewriterText text={bullet} speed={5} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/* ── Regular experience card ────────────────────────────── */
const RegularExpCard = ({ exp }) => (
  <div className="exp-card">
    <div className="exp-header">
      <div className="exp-company">{exp.company}</div>
      <span className="exp-period">{exp.period}</span>
    </div>
    <div className="exp-role intern">{exp.role}</div>
    <ul className="exp-bullets">
      {exp.bullets.map((bullet, i) => (
        <li key={i} className="exp-bullet">
          <TypewriterText text={bullet} speed={5} />
        </li>
      ))}
    </ul>
  </div>
);

const RecruiterHero = ({ personalInfo, summary }) => (
  <div className="recruiter-hero">
    <p className="recruiter-eyebrow">Recruiter View</p>
    <h1 className="recruiter-name">{personalInfo.name}</h1>
    <p className="recruiter-role">{personalInfo.role}</p>
    <p className="recruiter-location">
      <MapPin size={14} />
      {personalInfo.location}
    </p>
    <p className="recruiter-summary">{summary}</p>
    <div className="recruiter-quick-links">
      <a href={`mailto:${personalInfo.email}`} className="project-link-tag">
        <Mail size={13} /> Email
      </a>
      <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noreferrer" className="project-link-tag">
        <Github size={13} /> GitHub
      </a>
      <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="project-link-tag">
        <Linkedin size={13} /> LinkedIn
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/blog/*" element={<BlogRoutes />} />
      <Route path="/*" element={<HomeApp />} />
    </Routes>
  );
}

function HomeApp() {
  const { personalInfo, summary, education, skills, experience, projects } = resumeData;
  const [projectFilter, setProjectFilter] = useState('All');
  const [isFlowViewerOpen, setIsFlowViewerOpen] = useState(false);
  const [isRecruiterView, setIsRecruiterView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('recruiterViewEnabled') === 'true';
  });

  const location = useLocation();

  useEffect(() => {
    if (location && window.gtag) {
      window.gtag('config', 'G-VCHS35F0N4', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('recruiterViewEnabled', String(isRecruiterView));
  }, [isRecruiterView]);

  return (
    <div className={`home-app ${isRecruiterView ? 'recruiter-mode' : ''}`}>
      {!isRecruiterView && <HackerBackground />}

      {/* NAV */}
      <nav className="nav-bar">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>~/prakhar</Link>
        <ul className="nav-links">
          {['#about', '#skills', '#experience', '#projects', '#education', '#contact'].map(href => (
            <li key={href}>
              <a href={href} className="nav-link">{href.replace('#', '')}</a>
            </li>
          ))}
          <li><Link to="/blog" className="nav-link" style={{ color: 'var(--accent-blue)', whiteSpace: 'nowrap' }}>blog</Link></li>
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="nav-link recruiter-view-toggle"
            onClick={() => setIsRecruiterView(prev => !prev)}
          >
            {isRecruiterView ? 'Terminal View' : 'Recruiter View'}
          </button>
          <a href="https://drive.google.com/uc?export=download&id=157hRPhupQhICbTWd-g7FqBzkBerwb1_o" target="_blank" rel="noreferrer" className="nav-link download-btn">
            <Download size={14} /> Resume
          </a>
          <MobileNav isRecruiterView={isRecruiterView} />
        </div>
      </nav>

      <main className="page-wrapper page-content">

        {/* ── HERO ─────────────────────────────── */}
        <section id="about" style={{ paddingTop: '6rem' }}>
          <ScrollReveal>
            {isRecruiterView ? (
              <RecruiterHero personalInfo={personalInfo} summary={summary} />
            ) : (
              <InteractiveTerminal resumeData={resumeData} setProjectFilter={setProjectFilter} />
            )}
          </ScrollReveal>
        </section>

        {/* ── SKILLS ───────────────────────────── */}
        <section id="skills">
          <SectionHeading icon={Cpu} label="Technical Skills" command={isRecruiterView ? null : 'ls -la ~/skills/'} />
          {/* Wrap whole grid so cards can stagger */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {skills.map((group, idx) => (
                <div key={idx} className="skill-card">
                  <div className="skill-category">{group.category}</div>
                  <div>
                    {group.items.map((item, i) => (
                      <span key={i} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ── EXPERIENCE ───────────────────────── */}
        <section id="experience">
          <SectionHeading icon={Briefcase} label="Work Experience" command={isRecruiterView ? null : './read_experience.sh'} />
          {experience.map((exp, idx) => (
            <ScrollReveal key={idx} delay={idx * 80}>
              {exp.type === 'featured'
                ? <FeaturedExpCard exp={exp} />
                : <RegularExpCard exp={exp} />
              }
            </ScrollReveal>
          ))}
        </section>

        {/* ── PROJECTS ─────────────────────────── */}
        <section id="projects">
          <SectionHeading icon={FolderGit2} label="Projects" command={isRecruiterView ? null : 'git log --oneline'} />

          <div className="filter-tabs" style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['All', 'Frontend', 'Backend', 'Mobile', 'Security'].map(cat => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`filter-btn ${projectFilter === cat ? 'active' : ''}`}
                style={{
                  background: projectFilter === cat ? 'var(--accent-blue)' : 'rgba(34,211,238,0.1)',
                  color: projectFilter === cat ? '#000' : 'var(--accent-blue)',
                  border: '1px solid var(--accent-blue)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: "'Fira Code', monospace",
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {projects
                .filter(proj => {
                  if (projectFilter === 'All') return true;
                  const tech = proj.tech.map(t => t.toLowerCase());
                  const desc = proj.description.toLowerCase();

                  if (projectFilter === 'Frontend') {
                    return tech.some(t => ['react', 'pwa', 'javascript', 'native', 'flutter'].includes(t.includes('react') ? 'react' : t));
                  }
                  if (projectFilter === 'Backend') {
                    return tech.some(t => ['firebase', 'gcp', 'node', 'python', 'php', 'api'].includes(t.includes('firebase') ? 'firebase' : t));
                  }
                  if (projectFilter === 'Mobile') {
                    return tech.some(t => ['flutter', 'dart', 'react native'].includes(t));
                  }
                  if (projectFilter === 'Security') {
                    return desc.includes('security') || desc.includes('signed urls') || desc.includes('hardened') || tech.includes('security');
                  }
                  return true;
                })
                .map((proj, idx) => (
                  <div key={idx} className={`project-card ${proj.highlight ? 'highlight' : ''}`}>
                    <div className="project-name">
                      {proj.highlight && (
                        <Star size={13} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-yellow)', verticalAlign: 'middle' }} />
                      )}
                      {proj.name}
                    </div>
                    <div className="project-desc">
                      <TypewriterText text={proj.description} speed={5} />
                    </div>
                    <div className="project-tech">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="skill-tag">{t}</span>
                      ))}
                    </div>
                    {proj.links && (
                      <div className="project-links">
                        {proj.links.map((link, i) => (
                          <a key={i} href={link.url} target="_blank" rel="noreferrer" className="project-link-tag">
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                    {proj.name === "Delivery Tracker" && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <button
                          onClick={() => setIsFlowViewerOpen(true)}
                          className="project-link-tag"
                          style={{
                            background: 'transparent',
                            borderColor: 'var(--accent-green)',
                            color: 'var(--accent-green)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <List size={12} /> Execution Flow
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ── EDUCATION ────────────────────────── */}
        <section id="education">
          <SectionHeading icon={GraduationCap} label="Education" command={isRecruiterView ? null : 'cat education.log'} />
          {education.map((edu, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="edu-card">
                <div>
                  <div className="edu-degree">
                    <TypewriterText text={edu.degree} speed={5} />
                  </div>
                  <div className="edu-institution">
                    <TypewriterText text={edu.institution} speed={5} />
                  </div>
                  <div className="edu-grade">
                    <TypewriterText text={edu.grade} speed={5} />
                  </div>
                </div>
                <div className="edu-period">
                  <TypewriterText text={edu.period} speed={5} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* ── CONTACT ──────────────────────────── */}
        <section id="contact" style={{ paddingBottom: '6rem' }}>
          <SectionHeading icon={Mail} label="Contact" command={isRecruiterView ? null : 'send_message --encrypted'} />
          <ScrollReveal>
            <div className="contact-box">
              <div className="contact-title">Let's build something great.</div>
              <div className="contact-subtitle">Open to roles, collaborations, and interesting problems.</div>
              <div className="contact-links">
                <a href={`mailto:${personalInfo.email}`} className="contact-link">
                  <Mail size={16} /> {personalInfo.email}
                </a>
                <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noreferrer" className="contact-link">
                  <Github size={16} /> {personalInfo.github}
                </a>
                <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="contact-link">
                  <Linkedin size={16} /> {personalInfo.linkedin}
                </a>
                <a href={`tel:${personalInfo.phone}`} className="contact-link">
                  <Phone size={16} /> {personalInfo.phone}
                </a>
              </div>
              {isRecruiterView ? (
                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Available for full-time full-stack roles and backend-heavy product engineering work.
                </div>
              ) : (
                <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(100,116,139,0.7)' }}>
                  <TypewriterText text="// system ready. awaiting input..." delay={500} speed={40} />
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* ── Architecture Viewer Modal ── */}
      {isFlowViewerOpen && (
        <Suspense fallback={null}>
          <FlowDiagramViewer
            isOpen={isFlowViewerOpen}
            onClose={() => setIsFlowViewerOpen(false)}
            isRecruiterView={isRecruiterView}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
