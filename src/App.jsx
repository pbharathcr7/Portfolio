import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Mail, Linkedin, ArrowUpRight, Menu, X, BookOpen, Award, Trophy, ChevronDown } from 'lucide-react';

// â”€â”€â”€ 3D HERO SCENE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TECH_COLORS = {
  Python: '#3B82F6',
  LangGraph: '#00D4FF',
  Streamlit: '#FF4B4B',
  GenAI: '#FFB800',
  React: '#61DAFB',
  Django: '#0ea55f',
  'REST APIs': '#A78BFA',
  Angular: '#DD0031',
  'Node.js': '#22c55e',
  Express: '#6B7280',
  MongoDB: '#22c55e',
  JWT: '#7C3AED',
  SQLite: '#60a5fa',
  yfinance: '#00D4FF',
  SerpAPI: '#FFB800',
};

// â”€â”€â”€ PROJECT CARD (3D tilt) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ProjectCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="relative rounded-3xl border border-white/10 overflow-hidden group"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))' }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'radial-gradient(circle at 50% -20%, rgba(0,212,255,0.12), transparent 60%)' }}
        />

        <div className="relative z-10 p-8 lg:p-12">
          {/* Ghost number */}
          <div
            className="absolute top-4 right-8 select-none pointer-events-none font-black"
            style={{ color: 'rgba(255,255,255,0.04)', fontFamily: 'Orbitron, sans-serif', fontSize: '5rem', lineHeight: 1 }}
          >
            {project.number}
          </div>

          {/* Title */}
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #00D4FF 0%, #FFB800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.title}
          </h3>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold border"
                style={{
                  color: TECH_COLORS[tech] || '#9CA3AF',
                  borderColor: (TECH_COLORS[tech] || '#9CA3AF') + '40',
                  backgroundColor: (TECH_COLORS[tech] || '#9CA3AF') + '10',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #FFB800)', color: '#000' }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 text-sm font-bold transition-all duration-300 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #FFB800, transparent)' }}
        />
      </motion.div>
    </motion.div>
  );
}

// â”€â”€â”€ CERTIFICATE FLIP CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CertFlipCard({ title, issuer, image, isRecognition, index }) {
  const [flipped, setFlipped] = useState(false);
  const accentColor = isRecognition ? '#FFB800' : '#00D4FF';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: '1200px' }}
      className="h-72 select-none"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => window.open(image, '_blank')}
      title="Click to open full certificate"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: isRecognition
              ? 'linear-gradient(135deg, rgba(255,184,0,0.08), rgba(255,255,255,0.03))'
              : 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(255,255,255,0.02))',
            borderColor: isRecognition ? 'rgba(255,184,0,0.3)' : 'rgba(0,212,255,0.2)',
          }}
        >
          <div className="flex items-start justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: isRecognition ? 'rgba(255,184,0,0.15)' : 'rgba(0,212,255,0.15)' }}
            >
              {isRecognition
                ? <Trophy className="w-5 h-5" style={{ color: '#FFB800' }} />
                : <Award className="w-5 h-5" style={{ color: '#00D4FF' }} />}
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{
                color: accentColor,
                borderColor: accentColor + '50',
                background: accentColor + '15',
              }}
            >
              {isRecognition ? 'Recognition' : 'Certificate'}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">{title}</h4>
            {issuer && <p className="text-xs text-gray-500">{issuer}</p>}
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <div className="w-4 h-px" style={{ background: accentColor }} />
            <span>Hover to preview · Click to open</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: accentColor + '50',
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
            style={{ background: '#0a0f1a' }}
          />
          {/* Click-to-open overlay hint */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(5,8,17,0.55)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border"
              style={{ background: accentColor + '20', borderColor: accentColor + '60', color: accentColor }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open full size
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 py-2 px-3 text-center"
            style={{ background: 'linear-gradient(to top, rgba(5,8,17,0.9), transparent)' }}
          >
            <span className="text-xs text-gray-400">{title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ IEEE PUBLICATION CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PublicationCard() {
  return (
    <motion.a
      href="https://ieeexplore.ieee.org/document/11076377"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -4 }}
      className="block rounded-3xl border p-8 md:p-10 relative overflow-hidden group"
      style={{
        borderColor: 'rgba(0,111,186,0.35)',
        background: 'linear-gradient(135deg, rgba(0,111,186,0.08), rgba(255,255,255,0.02))',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{ background: 'linear-gradient(90deg, #006fba, #00a8e8)' }}
      />
      <div className="flex flex-col md:flex-row gap-6 items-start mt-2">
        <div
          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg"
          style={{
            background: 'linear-gradient(135deg, #006fba, #00a8e8)',
            color: 'white',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.02em',
          }}
        >
          IEEE
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,111,186,0.2)', color: '#00a8e8', border: '1px solid rgba(0,111,186,0.4)' }}
            >
              IEEE Publication
            </span>
            <span className="text-xs text-gray-600">· 2025</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug group-hover:text-[#00a8e8] transition-colors duration-300">
            Campus Commute: An Innovative Approach to College Bus Tracking and Management
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Published on IEEE Xplore — Research on real-time bus tracking, route management, and student commute optimization using modern web technologies.
          </p>
          <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: '#00a8e8' }}>
            <BookOpen className="w-4 h-4" />
            <span>View on IEEE Xplore</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// â”€â”€â”€ MAIN PORTFOLIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.dataset.section); }),
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section) => {
    document.querySelector(`[data-section="${section}"]`)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const projects = [
    {
      number: '01',
      title: 'Investment Guidance Agent',
      description: 'AI-powered investment advisor built with LangGraph and Google Gemini. Analyzes stocks using real-time financial data, technical indicators, and news sentiment to generate personalized portfolio recommendations.',
      tech: ['Python', 'LangGraph', 'GenAI', 'Streamlit', 'yfinance', 'SerpAPI'],
      github: 'https://github.com/pbharathcr7/Investment-Guidance-Agent',
      live: 'https://investment-guidance-agent.streamlit.app/',
    },
    {
      number: '02',
      title: 'Smart Recruitment',
      description: 'Full-stack AI recruitment platform with intelligent resume analysis powered by Google Gemini. Features JWT auth, role-based HR and Applicant dashboards, AI-generated job descriptions, and real-time application tracking.',
      tech: ['React', 'Django', 'REST APIs', 'GenAI', 'JWT', 'SQLite'],
      github: 'https://github.com/pbharathcr7/Smart_Recruitment',
      live: 'https://pbharathcr7.github.io/Smart_Recruitment',
    },
    {
      number: '03',
      title: 'E-Commerce Platform',
      description: 'Complete online retail solution with product catalog, shopping cart and order management. Angular frontend with Node.js/Express backend and MongoDB for flexible data storage.',
      tech: ['Angular', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/pbharathcr7/online-retail-frontend',
      live: 'https://pbharathcr7.github.io/online-retail-frontend/',
    },
  ];

  const certificates = [
    {
      title: 'Recognition of Excellence — Data & Insights',
      image: `${import.meta.env.BASE_URL}assets/recognition-1.png`,
      isRecognition: true,
    },
    {
      title: 'Recognition of Excellence — UI & Visualization',
      image: `${import.meta.env.BASE_URL}assets/recognition-2.png`,
      isRecognition: true,
    },
    {
      title: 'Django Framework Certification',
      issuer: 'Udemy',
      image: `${import.meta.env.BASE_URL}assets/django_certificate.jfif`,
      isRecognition: false,
    },
    {
      title: 'React Development Certification',
      issuer: 'Udemy',
      image: `${import.meta.env.BASE_URL}assets/react_certificate.jfif`,
      isRecognition: false,
    },
    {
      title: 'Research Paper Presentation',
      issuer: 'Conference Certificate',
      image: `${import.meta.env.BASE_URL}assets/presentation_research_paper_certificate.jfif`,
      isRecognition: false,
    },
  ];

  const NAV_LINKS = ['about', 'projects', 'awards', 'publications', 'contact'];
  const NAV_DOTS = ['hero', ...NAV_LINKS];
  const CYAN = '#00D4FF';
  const GOLD = '#FFB800';

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: '#050811', color: 'white', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ left: '-12px', top: '-12px', width: '24px', height: '24px' }}
      >
        <div
          className="w-full h-full rounded-full border-2 border-white transition-transform duration-150"
          style={{ transform: cursorVariant === 'hover' ? 'scale(1.8)' : 'scale(1)' }}
        />
      </div>

      {/* â”€â”€ NAVBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(5,8,17,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="relative text-sm font-medium capitalize transition-colors duration-300 pb-1"
                style={{ color: activeSection === link ? CYAN : 'rgba(255,255,255,0.5)' }}
              >
                {link}
                {activeSection === link && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: `linear-gradient(90deg, ${CYAN}, ${GOLD})` }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 flex flex-col gap-1 max-w-7xl mx-auto">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link)}
                    className="py-3 px-4 text-left text-sm font-medium capitalize rounded-xl transition-colors duration-200"
                    style={{
                      color: activeSection === link ? CYAN : 'rgba(255,255,255,0.6)',
                      background: activeSection === link ? 'rgba(0,212,255,0.08)' : 'transparent',
                    }}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* â”€â”€ SIDE NAV DOTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5">
        {NAV_DOTS.map((section) => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group relative flex items-center justify-end gap-3"
          >
            <span
              className="text-xs font-medium capitalize whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: activeSection === section ? CYAN : 'rgba(255,255,255,0.4)' }}
            >
              {section}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: activeSection === section ? '10px' : '6px',
                height: activeSection === section ? '10px' : '6px',
                background: activeSection === section ? CYAN : 'rgba(255,255,255,0.25)',
                boxShadow: activeSection === section ? `0 0 8px ${CYAN}` : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        data-section="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated CSS background — glowing orbs + grid */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Large cyan orb */}
          <div
            className="absolute rounded-full"
            style={{
              width: '70vw', height: '70vw',
              top: '-10%', left: '15%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)',
              animation: 'pulse-orb 6s ease-in-out infinite',
            }}
          />
          {/* Gold orb bottom-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: '50vw', height: '50vw',
              bottom: '-10%', right: '-10%',
              background: 'radial-gradient(circle, rgba(255,184,0,0.09) 0%, transparent 65%)',
              animation: 'pulse-orb 8s ease-in-out infinite reverse',
            }}
          />
          {/* Purple orb top-left */}
          <div
            className="absolute rounded-full"
            style={{
              width: '40vw', height: '40vw',
              top: '-5%', left: '-5%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
              animation: 'pulse-orb 10s ease-in-out infinite',
            }}
          />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,8,17,0) 0%, rgba(5,8,17,0.65) 65%, #050811 100%)' }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.88] tracking-tighter mb-6"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(4.5rem, 15vw, 15rem)' }}
          >
            <span
              style={{
                display: 'block',
                background: `linear-gradient(135deg, #ffffff 0%, ${CYAN} 50%, ${GOLD} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BHARATH
            </span>
            <span
              style={{
                display: 'block',
                background: `linear-gradient(135deg, ${GOLD} 0%, ${CYAN} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              P
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg md:text-2xl font-light mb-10"
            style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}
          >
            Full Stack Developer &nbsp;·&nbsp; AI / GenAI &nbsp;·&nbsp; IEEE Author
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${CYAN}, ${GOLD})`, color: '#000' }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-10 py-4 rounded-full font-bold text-base border transition-all duration-300 hover:scale-105"
              style={{ borderColor: `${CYAN}50`, color: CYAN, background: `${CYAN}08` }}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('about')}
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* â”€â”€ ABOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section data-section="about" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="w-12 h-[2px]" style={{ background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
            <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: CYAN }}>About Me</span>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 rounded-3xl p-8 lg:p-10 border border-white/10 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${CYAN}08, rgba(255,255,255,0.02))` }}
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: CYAN, opacity: 0.06, transform: 'translate(30%, -30%)' }}
              />
              <h2
                className="text-4xl md:text-5xl font-black mb-5 leading-tight"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span style={{ background: `linear-gradient(135deg, ${CYAN}, ${GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Turning Ideas
                </span>
                <span className="block text-white"> into Reality</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-3">
                Junior Software Developer at{' '}
                <span className="font-semibold text-white">Peninsular Research Operation</span>
                {' '}specializing in full-stack applications and AI-powered solutions.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                I specialize in Angular, Python, LangChain, LangGraph and MongoDB, developing systems that transform natural language into actionable insights. From conversational analytics and automated visualization pipelines to secure enterprise applications, I enjoy solving complex business problems through practical software engineering.
              </p>
            </motion.div>

            {/* Stats column */}
            <div className="flex flex-col gap-4">
              {[
                { value: '1', label: 'IEEE Publication', color: GOLD, section: 'publications' },
                { value: '2', label: 'Recognitions', color: '#A78BFA', section: 'awards' },
                { value: '3', label: 'Live Projects', color: CYAN, section: 'projects' },
              ].map((stat, i) => (
                <motion.button
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, x: -3 }}
                  onClick={() => scrollTo(stat.section)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="flex-1 rounded-2xl p-6 border flex items-center gap-4 text-left transition-colors duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = stat.color + '50'; e.currentTarget.style.background = stat.color + '08'; setCursorVariant('hover'); }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; setCursorVariant('default'); }}
                >
                  <div
                    className="text-4xl font-black"
                    style={{ fontFamily: 'Orbitron, sans-serif', color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="flex-1 text-sm text-gray-400 font-medium leading-tight">{stat.label}</div>
                  <ArrowUpRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: stat.color }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Skills card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3 rounded-3xl p-8 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium mb-6">Tech Stack</h3>
              <div className="flex flex-col gap-5">
                {[
                  { category: 'Frontend', skills: ['React', 'Angular', 'TypeScript', 'Flutter', 'Tailwind CSS'], color: '#61DAFB' },
                  { category: 'Backend', skills: ['Node.js', 'Python', 'Django', 'C#', 'REST APIs', 'LangGraph', 'GenAI'], color: '#22c55e' },
                  { category: 'Database & Cloud', skills: ['MongoDB', 'MySQL', 'SQLite', 'Azure Functions', 'Blob Storage'], color: GOLD },
                ].map(({ category, skills, color }) => (
                  <div key={category}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span className="text-xs text-gray-600 uppercase tracking-widest">{category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + '60'; e.currentTarget.style.color = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = ''; }}
                          className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-default"
                          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.65)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* â”€â”€ PROJECTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section data-section="projects" id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px]" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: GOLD }}>Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-none mb-20"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.35) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Work
          </motion.h2>

          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ AWARDS & RECOGNITION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section data-section="awards" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px]" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: GOLD }}>Awards & Recognition</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-none mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              background: `linear-gradient(135deg, ${GOLD} 0%, #fff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Achievements
          </motion.h2>
          <p className="text-gray-600 text-base mb-16">Hover to preview · Click to open the certificate.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {certificates.map((cert, i) => (
              <CertFlipCard key={cert.title} {...cert} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ PUBLICATIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section data-section="publications" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px]" style={{ background: 'linear-gradient(90deg, #006fba, transparent)' }} />
            <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: '#00a8e8' }}>Publications</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-none mb-20"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              background: 'linear-gradient(135deg, #00a8e8 0%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Research
          </motion.h2>

          <PublicationCard />
        </div>
      </section>

      {/* â”€â”€ CONTACT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section data-section="contact" id="contact" className="relative py-32 px-6 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="w-12 h-[2px]" style={{ background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
            <span className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: CYAN }}>Contact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.9] mb-10"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(3rem, 10vw, 10rem)' }}
          >
            <span
              className="block"
              style={{ background: `linear-gradient(135deg, #fff, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              LET'S
            </span>
            <span
              className="block"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              COLLABORATE
            </span>
          </motion.h2>

          <p className="text-lg text-gray-500 mb-16 max-w-xl">
            Open to exciting opportunities, freelance projects, and collaborations. Let's build something extraordinary.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'pbharathcr7@gmail.com', href: 'mailto:pbharathcr7@gmail.com', color: CYAN },
              { icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn', value: 'bharath-p-dev', href: 'https://www.linkedin.com/in/bharath-p-dev/', color: '#0077B5' },
              { icon: <Github className="w-6 h-6" />, label: 'GitHub', value: 'pbharathcr7', href: 'https://github.com/pbharathcr7', color: GOLD },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = contact.color + '50';
                  e.currentTarget.style.background = contact.color + '08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
                className="flex flex-col gap-4 p-7 rounded-2xl border border-white/10 group transition-colors duration-300"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: contact.color + '15', color: contact.color }}
                >
                  {contact.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">{contact.label}</div>
                  <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 break-all">
                    {contact.value}
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: contact.color }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-white/5 py-8 px-6 text-center text-xs"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        <span style={{ fontFamily: 'Orbitron, sans-serif', color: CYAN }}>BP</span>
        {' '}· Designed & built by Bharath P · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
