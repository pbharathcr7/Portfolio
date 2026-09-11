import { motion } from 'framer-motion';
import {
  Workflow,
  Atom,
  Terminal,
  Network,
  Shield,
  Zap,
  FileCode2,
  Sparkles,
  Smartphone,
  Layout,
  Server,
  Database,
  Cloud,
  Boxes,
  Flame,
  HardDrive,
  Globe,
  Code2,
  Cpu,
} from 'lucide-react';

const ROW_1 = [
  { name: 'LangChain', subtitle: 'Agentic AI & Chains', color: '#00D4FF', icon: Workflow },
  { name: 'React', subtitle: 'Modern Web UI', color: '#61DAFB', icon: Atom },
  { name: 'Python', subtitle: 'AI & Backend Core', color: '#38BDF8', icon: Terminal },
  { name: 'LangGraph', subtitle: 'Multi-Agent Systems', color: '#A78BFA', icon: Network },
  { name: 'Angular', subtitle: 'Enterprise Frontends', color: '#F43F5E', icon: Shield },
  { name: 'FastAPI', subtitle: 'High-Perf REST APIs', color: '#10B981', icon: Zap },
  { name: 'TypeScript', subtitle: 'Type-Safe Architecture', color: '#3B82F6', icon: FileCode2 },
  { name: 'GenAI', subtitle: 'LLMs & Prompt Systems', color: '#FFB800', icon: Sparkles },
  { name: 'Flutter', subtitle: 'Cross-Platform Mobile', color: '#0284C7', icon: Smartphone },
  { name: 'Tailwind CSS', subtitle: 'Modern Design Systems', color: '#06B6D4', icon: Layout },
];

const ROW_2 = [
  { name: 'Node.js', subtitle: 'Event-Driven Engine', color: '#22C55E', icon: Server },
  { name: 'MongoDB', subtitle: 'NoSQL Document Store', color: '#10B981', icon: Database },
  { name: 'Azure Functions', subtitle: 'Serverless Compute', color: '#0EA5E9', icon: Cloud },
  { name: 'Django', subtitle: 'Robust Web Framework', color: '#059669', icon: Boxes },
  { name: 'Redis', subtitle: 'In-Memory Cache & Queues', color: '#EF4444', icon: Flame },
  { name: 'MySQL', subtitle: 'Relational Database', color: '#F59E0B', icon: Database },
  { name: 'Blob Storage', subtitle: 'Cloud Object Storage', color: '#38BDF8', icon: HardDrive },
  { name: 'REST APIs', subtitle: 'Distributed Integration', color: '#8B5CF6', icon: Globe },
  { name: 'JavaScript', subtitle: 'Interactive Web Core', color: '#EAB308', icon: Code2 },
  { name: 'Streamlit', subtitle: 'Rapid ML & Data UIs', color: '#FF4B4B', icon: Cpu },
];

function TechCard({ item, setCursorVariant }) {
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={(e) => {
        setCursorVariant?.('hover');
        e.currentTarget.style.borderColor = `${item.color}80`;
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = `0 0 24px -2px ${item.color}35`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        setCursorVariant?.('default');
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.background = 'rgba(12, 18, 32, 0.65)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      className="shrink-0 flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl border transition-all duration-300 backdrop-blur-md cursor-default select-none group/card"
      style={{
        background: 'rgba(12, 18, 32, 0.65)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        minWidth: '220px',
      }}
    >
      {/* Icon squircle with glowing accent tint */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover/card:scale-105"
        style={{
          backgroundColor: `${item.color}14`,
          borderColor: `${item.color}30`,
        }}
      >
        <Icon size={20} style={{ color: item.color }} strokeWidth={2} />
      </div>

      {/* Title and Subtitle */}
      <div className="flex flex-col text-left justify-center min-w-0">
        <span className="text-sm font-semibold text-white tracking-wide leading-tight truncate">
          {item.name}
        </span>
        <span className="text-[11px] text-gray-400 font-normal tracking-wider mt-0.5 leading-tight truncate">
          {item.subtitle}
        </span>
      </div>
    </div>
  );
}

export default function TechStackMarquee({ setCursorVariant }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="lg:col-span-3 rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group/marquee"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.07), rgba(124,58,237,0.05), transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-7 relative z-10 px-1 sm:px-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff] animate-pulse" />
          <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">
            Tech Stack
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-gray-400 border border-white/10 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active Ecosystem
          </span>
        </div>
      </div>

      {/* Infinite Marquee Container with edge mask */}
      <div className="relative w-full overflow-hidden marquee-mask py-1">
        {/* Subtle gradient overlays on left and right edges for depth */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050811] via-[#050811]/60 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050811] via-[#050811]/60 to-transparent z-20" />

        <div className="flex flex-col gap-4">
          {/* Row 1: moves continuously right to left */}
          <div className="marquee-row relative flex overflow-hidden w-full">
            <div className="flex gap-4 shrink-0 animate-marquee-left pr-4">
              {ROW_1.map((item, i) => (
                <TechCard key={`r1-1-${i}`} item={item} setCursorVariant={setCursorVariant} />
              ))}
            </div>
            <div className="flex gap-4 shrink-0 animate-marquee-left pr-4" aria-hidden="true">
              {ROW_1.map((item, i) => (
                <TechCard key={`r1-2-${i}`} item={item} setCursorVariant={setCursorVariant} />
              ))}
            </div>
          </div>

          {/* Row 2: moves continuously left to right */}
          <div className="marquee-row relative flex overflow-hidden w-full">
            <div className="flex gap-4 shrink-0 animate-marquee-right pr-4">
              {ROW_2.map((item, i) => (
                <TechCard key={`r2-1-${i}`} item={item} setCursorVariant={setCursorVariant} />
              ))}
            </div>
            <div className="flex gap-4 shrink-0 animate-marquee-right pr-4" aria-hidden="true">
              {ROW_2.map((item, i) => (
                <TechCard key={`r2-2-${i}`} item={item} setCursorVariant={setCursorVariant} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
