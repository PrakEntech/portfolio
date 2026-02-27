import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HackerBackground from './components/HackerBackground';
import TypewriterText from './components/TypewriterText';
import TerminalWindow from './components/TerminalWindow';
import InteractiveTerminal from './components/InteractiveTerminal';
import MobileNav from './components/MobileNav';
import ScrollReveal from './components/ScrollReveal';
import FlowDiagramViewer from './components/FlowDiagramViewer';
import BlogRoutes from './generated/BlogRoutes.jsx';
import { resumeData } from './data/resumeData';
import {
  Briefcase, GraduationCap, Github, Linkedin,
  Mail, Phone, MapPin, Cpu, FolderGit2, ChevronRight, Star,
  Download
} from 'lucide-react';

/* ── Section heading ────────────────────────────────────── */
const SectionHeading = ({ icon: Icon, label, command }) => (
  <div className="section-heading">
    <Icon className="section-heading-icon" size={22} />
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

  // Parse terminal commands
  const [terminalOutput, setTerminalOutput] = useState([]);

  return (
    <>
      <HackerBackground />

      {/* NAV */}
      <nav className="nav-bar">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>~/prakhar</Link>
        <ul className="nav-links">
          {['#about', '#skills', '#experience', '#projects', '#education', '#contact'].map(href => (
            <li key={href}>
              <a href={href} className="nav-link">{href.replace('#', '')}</a>
            </li>
          ))}
          <li><Link to="/blog" className="nav-link" style={{ color: 'var(--accent-blue)', whiteWhiteSpace: 'nowrap' }}>blog</Link></li>
        </ul>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: 'auto' }}>
          <MobileNav />
          <a href="https://drive.google.com/uc?export=download&id=1igMNs4ceEuZVMB2LMMKKsulOOAbuVvlg" target="_blank" rel="noreferrer" className="nav-link download-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--accent-green)', color: 'var(--accent-green)', padding: '4px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem' }}>
            <Download size={14} /> Resume
          </a>
        </div>
      </nav>

      <main className="page-wrapper page-content">

        {/* ── HERO ─────────────────────────────── */}
        <section id="about" style={{ paddingTop: '6rem' }}>
          <ScrollReveal>
            <InteractiveTerminal resumeData={resumeData} setProjectFilter={setProjectFilter} />
          </ScrollReveal>
        </section>

        {/* ── SKILLS ───────────────────────────── */}
        <section id="skills">
          <SectionHeading icon={Cpu} label="Technical Skills" command="ls -la ~/skills/" />
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
          <SectionHeading icon={Briefcase} label="Work Experience" command="./read_experience.sh" />
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
          <SectionHeading icon={FolderGit2} label="Projects" command="git log --oneline" />

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
          <SectionHeading icon={GraduationCap} label="Education" command="cat education.log" />
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
          <SectionHeading icon={Mail} label="Contact" command="send_message --encrypted" />
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
              <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(100,116,139,0.7)' }}>
                <TypewriterText text="// system ready. awaiting input..." delay={500} speed={40} />
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* ── Architecture Viewer Modal ── */}
      <FlowDiagramViewer
        isOpen={isFlowViewerOpen}
        onClose={() => setIsFlowViewerOpen(false)}
      />
    </>
  );
}

export default App;
