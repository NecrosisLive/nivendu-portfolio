import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Terminal, ArrowUp, Shield, Code2, Zap, Lock, Cpu, Activity } from 'lucide-react';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [hackText, setHackText] = useState('');
  const [progress, setProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const canvasRef = useRef(null);
  const mainCanvasRef = useRef(null);
  
  const hackingLines = [
    '> Initializing secure connection...',
    '> Establishing encrypted tunnel',
    '> Loading security protocols',
    '> Authenticating credentials',
    '> Access granted',
    '> Loading profile data',
    '> System ready'
  ];

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      const sections = ['home', 'experience', 'education', 'skills', 'contact'];
      const scrollPosition = currentScroll + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading animation
  useEffect(() => {
    if (!loading) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array(60).fill(null).map(() => new Particle());
    let animationId;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [loading]);

  
  
  // Main page background
  useEffect(() => {
    if (loading) return;
    
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const formulas = [
      'E = mc²', 'F = ma', 'a² + b² = c²', 'PV = nRT', 'Σ F = 0',
      'v = v₀ + at', '∇ × E = -∂B/∂t', 'S = k log W', 'λ = h/p',
      'ψ(x,t) = Ae^i(kx-ωt)', 'G = H - TS', 'ΔG = ΔH - TΔS',
      'pH = -log[H⁺]', 'I = V/R', 'P = IV', 'W = Fd cos θ',
      'KE = ½mv²', 'PE = mgh', 'τ = r × F', 'L = Iω',
      'f(x) = ∫ g(x)dx', 'dy/dx = lim[h→0]', '∇²ψ + k²ψ = 0',
      'Δx·Δp ≥ ℏ/2', 'c = λν', 'n₁sin θ₁ = n₂sin θ₂'
    ];

    class FloatingFormula {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.text = formulas[Math.floor(Math.random() * formulas.length)];
        this.speed = 0.2 + Math.random() * 0.5;
        this.opacity = 0.03 + Math.random() * 0.06;
        this.size = 12 + Math.random() * 8;
      }

      update() {
        this.y -= this.speed;
        if (this.y < -50) {
          this.reset();
          this.y = canvas.height + 50;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#10b981';
        ctx.font = `${this.size}px "Times New Roman", serif`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    const formulas_arr = Array(80).fill(null).map(() => new FloatingFormula());

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      formulas_arr.forEach(formula => {
        formula.update();
        formula.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [loading]);

  // Terminal typing
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    const typeInterval = setInterval(() => {
      if (lineIndex < hackingLines.length) {
        if (charIndex < hackingLines[lineIndex].length) {
          currentLine += hackingLines[lineIndex][charIndex];
          setHackText(prev => {
            const lines = prev.split('\n');
            lines[lineIndex] = currentLine;
            return lines.join('\n');
          });
          charIndex++;
          setProgress(((lineIndex + charIndex / hackingLines[lineIndex].length) / hackingLines.length) * 100);
        } else {
          lineIndex++;
          charIndex = 0;
          currentLine = '';
          setHackText(prev => prev + '\n');
        }
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setLoading(false), 800);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.03) 2px, rgba(16, 185, 129, 0.03) 4px)'
          }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
            <div className="relative inline-flex items-center justify-center w-28 h-28 border-2 border-emerald-500 rounded-lg mb-8 animate-pulse">
              <Shield className="text-emerald-500" size={56} />
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-lg animate-ping" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-emerald-500 tracking-widest relative" style={{ fontFamily: "'Space Mono', monospace" }}>
              <span className="relative inline-block">
                SECURE CONNECTION
                <div className="absolute -inset-2 bg-emerald-500/10 blur-xl" />
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-emerald-500/60 text-sm">
              <Lock size={16} />
              <span className="font-mono">TLS 1.3 ENCRYPTED</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="relative bg-black/95 border-2 border-emerald-500/50 rounded-xl p-8 backdrop-blur-xl shadow-2xl shadow-emerald-500/20">
            {/* Terminal header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-emerald-500/30">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-emerald-500" />
                <span className="text-emerald-500 font-mono text-sm font-bold tracking-wider">root@system:~$</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
            
            <pre className="text-emerald-400 font-mono text-base md:text-lg whitespace-pre-wrap mb-8 min-h-[160px] text-left leading-relaxed tracking-wide">
{hackText}<span className="inline-block w-3 h-5 bg-emerald-500 animate-pulse ml-1">▋</span>
            </pre>
            
            {/* Progress bar */}
            <div className="relative w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-emerald-500/30">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-500/50"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{
                  animation: 'shimmer 2s infinite',
                  backgroundSize: '200% 100%'
                }} />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-emerald-500 font-mono text-sm font-bold">
                LOADING: {Math.round(progress)}%
              </p>
              <div className="flex items-center gap-2 text-emerald-500/70 text-xs font-mono">
                <Activity size={14} className="animate-pulse" />
                <span>INITIALIZING...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const milestones = [
    { id: 'home', label: 'HOME' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <canvas ref={mainCanvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />
      
      {/* Scan line effect */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div 
          className="absolute w-full h-1 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent blur-sm"
          style={{ 
            top: `${scanLine}%`,
            transition: 'top 0.05s linear'
          }}
        />
      </div>
      
      {/* Grid overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        .terminal-box {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(0, 0, 0, 0.9) 100%);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.05);
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.3);
        }
        
        .box-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(16, 185, 129, 0.1);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 border-2 border-emerald-500 rounded-lg flex items-center justify-center bg-black group cursor-pointer">
              <span className="text-emerald-500 font-bold text-xl font-mono">NT</span>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-emerald-500/0 rounded-lg group-hover:bg-emerald-500/20 blur-xl transition-all" />
            </div>
            <div className="hidden md:block">
              <div className="text-emerald-500 font-mono text-sm font-bold tracking-wider">NIVENDU TRIPATHY</div>
              <div className="text-emerald-500/60 font-mono text-xs">Infrastructure Engineer</div>
            </div>
          </div>
          
          {/* Nav items */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="px-5 py-2.5 text-sm font-bold text-emerald-500 border-2 border-emerald-500/50 rounded-lg hover:bg-emerald-500/20 transition-all tracking-widest font-mono box-glow"
            >
              DOWNLOD CV
            </button>
            <a href="https://linkedin.com/in/nivendu-tripathy" target="_blank" rel="noopener noreferrer" 
               className="text-emerald-500 hover:text-emerald-400 transition-all transform hover:scale-110">
              <Linkedin size={22} />
            </a>
            <a href="https://github.com/nivendutripathy" target="_blank" rel="noopener noreferrer" 
               className="text-emerald-500 hover:text-emerald-400 transition-all transform hover:scale-110">
              <Github size={22} />
            </a>
          </div>
        </div>
      </nav>

      {/* Milestone Timeline */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-emerald-500/20" />
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-500/50"
            style={{ height: `${scrollProgress}%`, top: 0 }}
          />
          
          {milestones.map((milestone) => (
            <button
              key={milestone.id}
              onClick={() => scrollToSection(milestone.id)}
              className="relative flex items-center gap-4 mb-16 group"
            >
              <div className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                activeSection === milestone.id 
                  ? 'bg-emerald-500 scale-150 shadow-lg shadow-emerald-500/50' 
                  : 'bg-emerald-500/30 group-hover:bg-emerald-500/60'
              }`}>
                {activeSection === milestone.id && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-emerald-500/50 animate-pulse" />
                  </>
                )}
              </div>
              <div className={`transition-all duration-300 ${
                activeSection === milestone.id 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                <span className={`text-xs tracking-widest font-mono font-bold block ${
                  activeSection === milestone.id 
                    ? 'text-emerald-500 text-shadow-glow' 
                    : 'text-emerald-500/60'
                }`}>
                  {milestone.label}
                </span>
                {activeSection === milestone.id && (
                  <span className="text-[10px] text-emerald-500/60 font-mono block">ACTIVE</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-4 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-xl text-emerald-500 hover:bg-emerald-500/30 transition-all box-glow group"
        style={{ opacity: scrollProgress > 10 ? 1 : 0, pointerEvents: scrollProgress > 10 ? 'auto' : 'none' }}
      >
        <ArrowUp size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="relative z-10 text-center max-w-6xl">
          {/* Status badge */}
          <div className="mb-10 inline-flex items-center gap-3 px-6 py-3 border-2 border-emerald-500/50 rounded-full bg-emerald-500/10 box-glow">
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <span className="text-sm text-emerald-500 tracking-widest font-mono font-bold">SYSTEM ONLINE • AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Main heading with glitch */}
          <h1 className={`text-6xl md:text-8xl font-black mb-6 text-white tracking-tight ${glitchActive ? 'animate-glitch' : ''}`}
              style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="relative inline-block">
              Nivendu Tripathy
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl -z-10" />
            </span>
          </h1>
          
          {/* Role */}
          <div className="mb-10 relative">
            <div className="inline-block border-2 border-emerald-500/30 rounded-xl px-8 py-4 bg-black/80 backdrop-blur terminal-box">
              <div className="flex items-center gap-4 mb-2">
                <Terminal size={20} className="text-emerald-500 animate-pulse" />
                <p className="text-2xl md:text-3xl text-emerald-500 font-bold tracking-wide font-mono text-shadow-glow">
                  Senior Infrastructure Engineer
                </p>
              </div>
              <p className="text-base text-gray-400 max-w-3xl leading-relaxed font-medium">
                Architecting scalable cloud infrastructure • Kubernetes orchestration • CI/CD optimization • Zero-downtime systems
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-14">
            {[
              { value: '2+', label: 'Years Experience', icon: Zap },
              { value: '200+', label: 'Systems Managed', icon: Cpu },
              { value: '99.9%', label: 'Uptime SLA', icon: Activity }
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/30 transition-all" />
                <div className="relative border-2 border-emerald-500/30 rounded-xl p-6 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                  <stat.icon size={24} className="text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-black text-emerald-500 mb-2 font-mono text-shadow-glow">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-medium tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Docker', 'Kubernetes', 'Terraform', 'AWS', 'PostgreSQL', 'React', 'Python', 'CI/CD'].map((tech, i) => (
              <span 
                key={i} 
                className="relative px-6 py-3 border-2 border-emerald-500/40 rounded-lg text-emerald-500 font-mono font-bold hover:bg-emerald-500/20 transition-all cursor-pointer group box-glow"
              >
                <span className="relative z-10">{tech}</span>
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 rounded-lg transition-all" />
                <div className="absolute -inset-1 bg-emerald-500/0 group-hover:bg-emerald-500/20 blur-lg transition-all" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Code2 size={32} className="text-emerald-500" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">EXPERIENCE</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
          </div>

          <div className="space-y-12">
            {/* Job 1 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-8 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      <h3 className="text-2xl font-black text-white">Production Systems Engineer</h3>
                    </div>
                    <p className="text-emerald-500 font-bold text-lg mb-2 font-mono">Mindmap Infotech Pvt Ltd</p>
                    <p className="text-sm text-gray-400 font-mono">Feb 2024 – Present · Bengaluru, Karnataka</p>
                  </div>
                  <span className="text-xs text-emerald-500 border-2 border-emerald-500/50 px-4 py-2 rounded-lg font-mono font-bold box-glow animate-pulse">
                    ACTIVE
                  </span>
                </div>

                <ul className="space-y-4 text-base text-gray-300 leading-relaxed">
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Architected CI/CD pipelines using Apache Airflow, Docker, and Kubernetes, reducing deployment cycles by <span className="text-emerald-500 font-bold">25%</span> and enabling zero-downtime releases for 50+ microservices</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Optimized PostgreSQL databases handling <span className="text-emerald-500 font-bold">1M+ transactions</span> with query tuning and indexing, improving performance by 30% with 99.9% uptime</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Automated infrastructure provisioning using Terraform and Ansible across AWS/Azure, reducing manual errors by <span className="text-emerald-500 font-bold">90%</span> and costs by 20%</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Implemented monitoring with Grafana and Prometheus, creating dashboards and alerts that increased uptime by 30% and reduced MTTR by <span className="text-emerald-500 font-bold">40%</span></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 2 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-8 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-emerald-500/70 rounded-full" />
                    <h3 className="text-2xl font-black text-white">Full Stack Developer</h3>
                  </div>
                  <p className="text-emerald-500 font-bold text-lg mb-2 font-mono">Sakanyagi Research</p>
                  <p className="text-sm text-gray-400 font-mono">Oct 2023 – Jan 2024 · Bengaluru, Karnataka</p>
                </div>

                <ul className="space-y-4 text-base text-gray-300 leading-relaxed">
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Engineered RESTful APIs using Node.js, Express.js, and MongoDB with OAuth 2.0, handling <span className="text-emerald-500 font-bold">50K+ daily requests</span></span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Built testing framework using Jest and Selenium, achieving <span className="text-emerald-500 font-bold">85% code coverage</span> and reducing bugs by 40%</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Developed React.js frontend with Redux and Tailwind CSS, reducing page load time by <span className="text-emerald-500 font-bold">35%</span></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Job 3 */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-8 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-emerald-500/50 rounded-full" />
                    <h3 className="text-2xl font-black text-white">Active Directory & IT Operations Intern</h3>
                  </div>
                  <p className="text-emerald-500 font-bold text-lg mb-2 font-mono">Ethnotech Solutions</p>
                  <p className="text-sm text-gray-400 font-mono">Dec 2022 – Jan 2023 · Bengaluru, Karnataka</p>
                </div>

                <ul className="space-y-4 text-base text-gray-300 leading-relaxed">
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Administered Active Directory for <span className="text-emerald-500 font-bold">500+ users</span>, managing lifecycle, GPO, LDAP, and domain services</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Implemented IAM policies including RBAC, MFA, and SSO for secure access management</span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="text-emerald-500 mt-1 text-xl font-bold">▸</span>
                    <span className="group-hover/item:text-white transition-colors">Automated operations using PowerShell scripting, reducing manual effort by <span className="text-emerald-500 font-bold">60%</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-32 px-6 z-10 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Shield size={32} className="text-emerald-500" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">CREDENTIALS</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-3 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-10 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">🎓</div>
                <h3 className="text-2xl font-black text-white mb-4 font-mono">Bachelor's Degree</h3>
                <p className="text-base text-gray-300 mb-3 font-medium">Computer Science & Engineering</p>
                <p className="text-sm text-emerald-500 font-mono tracking-wider">University Name · Year</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-3 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-10 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">📜</div>
                <h3 className="text-2xl font-black text-white mb-4 font-mono">Certifications</h3>
                <p className="text-base text-gray-300 mb-3 font-medium">AWS, Kubernetes, Docker</p>
                <p className="text-sm text-emerald-500 font-mono tracking-wider">Professional Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Cpu size={32} className="text-emerald-500" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">TECHNICAL ARSENAL</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Docker', category: 'Container', icon: '🐳' },
              { name: 'Kubernetes', category: 'Orchestration', icon: '☸️' },
              { name: 'AWS', category: 'Cloud', icon: '☁️' },
              { name: 'Terraform', category: 'IaC', icon: '🏗️' },
              { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
              { name: 'MongoDB', category: 'Database', icon: '🍃' },
              { name: 'React', category: 'Frontend', icon: '⚛️' },
              { name: 'Node.js', category: 'Backend', icon: '🟢' },
              { name: 'Python', category: 'Language', icon: '🐍' },
              { name: 'Grafana', category: 'Monitor', icon: '📊' },
              { name: 'RabbitMQ', category: 'Queue', icon: '🐰' },
              { name: 'Git', category: 'VCS', icon: '📦' }
            ].map((tech, i) => (
              <div key={i} className="relative group cursor-pointer">
                <div className="absolute -inset-2 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative border-2 border-emerald-500/30 rounded-xl p-6 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all transform group-hover:scale-105">
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{tech.icon}</div>
                  <p className="text-white font-black text-lg mb-2 font-mono">{tech.name}</p>
                  <p className="text-xs text-emerald-500/80 font-mono tracking-wider">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 z-10 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <Mail size={32} className="text-emerald-500" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">ESTABLISH CONNECTION</h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <a href="mailto:your.email@example.com" className="relative group">
              <div className="absolute -inset-3 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-10 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                <Mail size={48} className="text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black text-white mb-3 font-mono">EMAIL PROTOCOL</h3>
                <p className="text-base text-emerald-500 font-mono">your.email@example.com</p>
              </div>
            </a>

            <a href="tel:+91XXXXXXXXXX" className="relative group">
              <div className="absolute -inset-3 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative border-2 border-emerald-500/30 rounded-2xl p-10 bg-black/90 backdrop-blur terminal-box group-hover:border-emerald-500/60 transition-all">
                <Phone size={48} className="text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black text-white mb-3 font-mono">VOICE CHANNEL</h3>
                <p className="text-base text-emerald-500 font-mono">+91 XXXXX XXXXX</p>
              </div>
            </a>
          </div>

          <div className="flex justify-center gap-8">
            <a href="https://linkedin.com/in/nivendu-tripathy" target="_blank" rel="noopener noreferrer" 
               className="relative group">
              <div className="absolute -inset-2 bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative p-6 border-2 border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all box-glow">
                <Linkedin size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
            </a>
            <a href="https://github.com/NecrosisLive" target="_blank" rel="noopener noreferrer" 
               className="relative group">
              <div className="absolute -inset-2 bg-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative p-6 border-2 border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all box-glow">
                <Github size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t-2 border-emerald-500/30 z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-emerald-500 rounded-lg flex items-center justify-center bg-black">
                <span className="text-emerald-500 font-bold text-lg font-mono">NT</span>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-mono">
                  © 2024 Nivendu Tripathy
                </p>
                <p className="text-xs text-emerald-500/60 font-mono">
                  Built with React · Tailwind CSS · Lucide Icons
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-500 font-mono tracking-wider">SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;