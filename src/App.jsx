import { useEffect, useState, useRef } from 'react';
import { Rocket, Github, ExternalLink, Mail, Linkedin, Code2, Sparkles, Terminal, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      setMousePosition(pos);
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5
    }));

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.4)`;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll observer
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Investment Guidance Agent",
      description: "AI-powered investment advisor using Streamlit and advanced ML algorithms. Provides personalized portfolio recommendations based on risk tolerance and financial goals.",
      tech: ["Python", "Streamlit", "Machine Learning", "Financial APIs"],
      github: "https://github.com/pbharathcr7/Investment-Guidance-Agent",
      live: "https://investment-guidance-agent.streamlit.app/",
      number: "01"
    },
    {
      title: "Full-Stack E-Commerce Platform",
      description: "Complete online retail solution with Angular frontend and Node.js backend. Features include product catalog, shopping cart, user authentication, and order management.",
      tech: ["Angular", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/pbharathcr7/online-retail-frontend",
      live: "https://pbharathcr7.github.io/online-retail-frontend/",
      number: "02"
    }
  ];

  const skills = {
    "Frontend": ["React", "Angular", "TypeScript", "Flutter", "Tailwind CSS"],
    "Backend": ["Node.js", "Python", "Django", "C#", "REST APIs"],
    "Database & Cloud": ["MongoDB", "MySQL", "Azure Functions", "Blob Storage"],
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-[9999] mix-blend-difference transition-all duration-150 ease-out"
        style={{ left: '-12px', top: '-12px' }}
      >
        <div className={`w-full h-full rounded-full border-2 border-white pointer-events-none transition-transform duration-150 ${
          cursorVariant === 'hover' ? 'scale-150' : 'scale-100'
        }`} />
      </div>
      
      {/* Animated Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-30"
      />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {['hero', 'about', 'projects', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => document.querySelector(`[data-section="${section}"]`)?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={`group relative transition-all duration-300`}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-white scale-150' 
                : 'bg-white/30 group-hover:bg-white/60'
            }`} />
            <span className={`absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
              activeSection === section ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              {section}
            </span>
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section 
        data-section="hero"
        className="relative h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5 pointer-events-none">
          <h1 className="text-[15vw] font-black whitespace-nowrap">
            DEVELOPER
          </h1>
        </div>

        <div className={`relative z-10 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>

          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="text-[18vw] md:text-[15vw] font-black leading-[0.9] tracking-tighter mb-4">
              <span className="block bg-gradient-to-r ">BHARATH</span>
              <span className="block bg-gradient-to-r ">
                P
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
              Full Stack Developer crafting digital experiences with{' '}
              <span className="text-white font-medium">precision</span> and{' '}
              <span className="text-white font-medium">passion</span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('[data-section="projects"]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group relative px-12 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
            href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('[data-section="contact"]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-12 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-full hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('[data-section="projects"]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
            <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
            <ChevronDown className="w-5 h-5 ml-3.5 text-gray-500" />
            </a>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        data-section="about"
        className="relative min-h-screen flex items-center px-6 py-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Label */}
          <div className="mb-20">
            <span className="text-6xl uppercase tracking-[0.3em] text-white font-medium">
              About Me
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left: Large Text */}
            <div>
              <h2 className="text-6xl md:text-8xl font-black leading-[1.1] mb-12">
                <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">Turning</span>
                <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Ideas
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">into Reality</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  Junior Software Developer at <span className="text-white font-semibold">Peninsular Research Operation</span>&nbsp; 
                  specializing in full-stack applications.
                </p>
              </div>
            </div>

            {/* Right: Skills Grid */}
            <div className="space-y-8 mt-12">
              {Object.entries(skills).map(([category, items], idx) => (
                <div 
                  key={category}
                  className="group"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-white/50 to-transparent" />
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-light">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-full text-sm font-medium border border-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        data-section="projects"
        id="projects"
        className="relative min-h-screen flex items-center px-6 py-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Label */}
          <div className="mb-20">
            <span className="text-6xl uppercase tracking-[0.3em] text-white font-medium">
              Personal Projects
            </span>
          </div>

          <div className="space-y-32">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className="group relative"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {/* Project Number */}
                <div className="absolute md:-left-40 top-0 text-8xl md:text-9xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                  {project.number}
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Left: Title & Description */}
                  <div className="md:col-span-7 space-y-6">
                    <h3 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-500">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm text-gray-500 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Links */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300"
                    >
                      <span className="font-semibold">View Live Site</span>
                      <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                    
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300"
                    >
                      <span className="font-semibold">View Source Code</span>
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Divider */}
                {idx < projects.length - 1 && (
                  <div className="mt-32 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        data-section="contact"
        id="contact"
        className="relative min-h-screen flex items-center justify-center px-6 py-32"
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          {/* Section Label */}
          <div className="mb-16">
            <span className="text-6xl uppercase tracking-[0.3em] text-white font-medium">
              Get in Touch
            </span>
          </div>

          <h2 className="text-4xl md:text-9xl lg:text-[8rem] font-black mb-16 leading-[0.9]">
            <span className="block bg-gradient-to-r from-white via-yellow-400 to-blue-400 bg-clip-text text-transparent">LET'S</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              COLLABORATE
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 mb-20 max-w-2xl mx-auto leading-relaxed">
            Open to exciting opportunities and collaborations. Let's build something extraordinary together.
          </p>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            <a
              href="mailto:pbharathcr7@gmail.com"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <p className="font-semibold text-lg mb-2">Email</p>
              <p className="text-sm text-gray-400">pbharathcr7@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/bharath-p"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <p className="font-semibold text-lg mb-2">LinkedIn</p>
              <p className="text-sm text-gray-400">Connect with me</p>
            </a>

            <a
              href="https://github.com/pbharathcr7"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Github className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <p className="font-semibold text-lg mb-2">GitHub</p>
              <p className="text-sm text-gray-400">View my code</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}