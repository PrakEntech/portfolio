import React from 'react';
import HackerBackground from './components/HackerBackground';
import TypewriterText from './components/TypewriterText';
import TerminalWindow from './components/TerminalWindow';
import { resumeData } from './data/resumeData';
import {
  Briefcase, GraduationCap, Github, Linkedin,
  Mail, Phone, MapPin, Cpu, FolderGit2, ChevronRight, Star
} from 'lucide-react';

/* ── Reusable section heading ───────────────────────────── */
const SectionHeading = ({ icon: Icon, label, command }) => (
  <div className="section-heading">
    <Icon className="section-heading-icon" size={22} />
    <span className="section-heading-label">{label}</span>
    <div className="section-heading-line" />
    {command && <span className="section-heading-command">{command}</span>}
  </div>
);

/* ── Featured Weberon card ──────────────────────────────── */
const FeaturedExpCard = ({ exp }) => (
  <div className="exp-card featured-card">
    {/* Header */}
    <div className="exp-header">
      <div>
        <div className="exp-company">
          <Star size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-yellow)', verticalAlign: 'middle' }} />
          {exp.company}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
          <span className="epoch-badge intern">{exp.internPeriod}</span>
          <span className="epoch-badge fulltime">{exp.fullTimePeriod}</span>
        </div>
      </div>
      <div className="exp-period">{exp.period}</div>
    </div>

    <div className="exp-role fulltime">{exp.role}</div>

    {/* Overview */}
    <p className="exp-overview">{exp.overview}</p>

    {/* Grouped sections */}
    <div className="exp-groups">
      {exp.groups.map((group, gi) => (
        <div key={gi} className="exp-group">
          <div className="exp-group-label">
            <ChevronRight size={12} style={{ marginRight: '4px' }} />
            {group.label}
          </div>
          <ul className="exp-bullets">
            {group.bullets.map((bullet, bi) => (
              <li key={bi} className="exp-bullet">{bullet}</li>
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
        <li key={i} className="exp-bullet">{bullet}</li>
      ))}
    </ul>
  </div>
);

function App() {
  const { personalInfo, summary, education, skills, experience, projects } = resumeData;

  return (
    <>
      <HackerBackground />

      {/* NAV */}
      <nav className="nav-bar">
        <div className="nav-logo">~/prakhar</div>
        <ul className="nav-links">
          {['#about', '#skills', '#experience', '#projects', '#education', '#contact'].map(href => (
            <li key={href}>
              <a href={href} className="nav-link">{href.replace('#', '')}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="page-wrapper page-content">

        {/* ── HERO ─────────────────────────────── */}
        <section id="about" style={{ paddingTop: '6rem' }}>
          <TerminalWindow title="prakhar@system: ~ — bash">
            <div className="terminal-body">
              <div style={{ marginBottom: '2rem' }}>
                <div className="prompt-line">
                  <span className="prompt">visitor@portfolio:~$</span>
                  <span className="command">whoami</span>
                </div>
                <div className="status-badge">
                  <span className="status-dot" />
                  Open to new opportunities
                </div>
                <div className="glitch-wrapper hero-name" data-text={personalInfo.name}>
                  {personalInfo.name}
                </div>
                <div className="hero-role">▸ {personalInfo.role}</div>
                <div className="hero-location">
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {personalInfo.location}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(34,211,238,0.1)', paddingTop: '1.5rem' }}>
                <div className="prompt-line">
                  <span className="prompt">visitor@portfolio:~$</span>
                  <span className="command">cat about_me.txt</span>
                </div>
                <p className="hero-summary">{summary}</p>
              </div>
            </div>
          </TerminalWindow>
        </section>

        {/* ── SKILLS ───────────────────────────── */}
        <section id="skills">
          <SectionHeading icon={Cpu} label="Technical Skills" command="ls -la ~/skills/" />
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
        </section>

        {/* ── EXPERIENCE ───────────────────────── */}
        <section id="experience">
          <SectionHeading icon={Briefcase} label="Work Experience" command="./read_experience.sh" />
          {experience.map((exp, idx) =>
            exp.type === 'featured'
              ? <FeaturedExpCard key={idx} exp={exp} />
              : <RegularExpCard key={idx} exp={exp} />
          )}
        </section>

        {/* ── PROJECTS ─────────────────────────── */}
        <section id="projects">
          <SectionHeading icon={FolderGit2} label="Projects" command="git log --oneline" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {projects.map((proj, idx) => (
              <div key={idx} className={`project-card ${proj.highlight ? 'highlight' : ''}`}>
                <div className="project-name">
                  {proj.highlight && (
                    <Star size={13} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-yellow)', verticalAlign: 'middle' }} />
                  )}
                  {proj.name}
                </div>
                <p className="project-desc">{proj.description}</p>
                <div className="project-tech">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ────────────────────────── */}
        <section id="education">
          <SectionHeading icon={GraduationCap} label="Education" command="cat education.log" />
          {education.map((edu, idx) => (
            <div key={idx} className="edu-card">
              <div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-grade">{edu.grade}</div>
              </div>
              <div className="edu-period">{edu.period}</div>
            </div>
          ))}
        </section>

        {/* ── CONTACT ──────────────────────────── */}
        <section id="contact" style={{ paddingBottom: '6rem' }}>
          <SectionHeading icon={Mail} label="Contact" command="send_message --encrypted" />
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
        </section>

      </div>
    </>
  );
}

export default App;
