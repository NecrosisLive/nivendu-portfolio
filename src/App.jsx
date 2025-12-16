import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, ArrowRight, Download, MapPin, Calendar, Briefcase, GraduationCap, Award, ChevronDown, User, Send, Shield, Lock, Eye, Terminal, Database, Server, Cpu, Network, Activity, AlertTriangle, CheckCircle, Fingerprint, Zap, Globe, Code, FileText, Menu, X } from 'lucide-react';

const CyberPortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [bootStage, setBootStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const heroRef = useRef(null);

  const bootMessages = [
    { text: '[INIT] NEXUS Security Framework v4.2.1', delay: 0 },
    { text: '[OK] Cryptographic modules loaded', delay: 200 },
    { text: '[OK] Neural network interface initialized', delay: 400 },
    { text: '[OK] Threat detection systems online', delay: 600 },
    { text: '[OK] Security protocols established', delay: 800 },
    { text: '[OK] Authentication systems verified', delay: 1000 },
    { text: '[READY] System operational - Welcome, Operator', delay: 1200 },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { bootMessages.forEach((msg, i) => setTimeout(() => setBootStage(i + 1), msg.delay)); const t = setTimeout(() => setLoading(false), 2500); return () => clearTimeout(t); }, []);
  useEffect(() => { const h = (e) => setMousePosition({ x: e.clientX, y: e.clientY }); window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, []);
  useEffect(() => { const handleScroll = () => { const total = document.documentElement.scrollHeight - window.innerHeight; const current = window.scrollY; setScrollProgress((current / total) * 100); setIsNavScrolled(current > 50); ['home', 'about', 'experience', 'skills', 'hire'].forEach(section => { const el = document.getElementById(section); if (el && current + 300 >= el.offsetTop && current + 300 < el.offsetTop + el.offsetHeight) setActiveSection(section); }); }; window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  // Scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealOnScroll = () => {
      revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, [loading]);

  const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleFormSubmit = (e) => { e.preventDefault(); setFormStatus('sending'); setTimeout(() => { setFormStatus('success'); setFormData({ name: '', email: '', subject: '', message: '' }); setTimeout(() => setFormStatus('idle'), 3000); }, 1500); };

  if (loading) return (
    <div className="fixed inset-0 bg-cyber-black flex items-center justify-center overflow-hidden">
      <div className="noise-overlay"></div>
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="scan-line"></div>
      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-status-secure animate-pulse" />
            <span className="text-3xl font-bold text-white font-mono">NEXUS</span>
          </div>
          <p className="text-text-muted font-mono text-sm">Security Operations Center</p>
        </div>
        <div className="glass-panel rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyber-border">
            <div className="w-3 h-3 rounded-full bg-alert-critical"></div>
            <div className="w-3 h-3 rounded-full bg-alert-warning"></div>
            <div className="w-3 h-3 rounded-full bg-status-success"></div>
            <span className="ml-2 text-text-muted text-xs">system_init.sh</span>
          </div>
          <div className="space-y-2 min-h-[200px]">
            {bootMessages.slice(0, bootStage).map((msg, i) => (
              <div key={i} className="boot-line flex items-start gap-2" style={{ animationDelay: `${i * 0.1}s` }}>
                {msg.text.includes('[OK]') && <CheckCircle className="w-4 h-4 text-status-success mt-0.5 flex-shrink-0" />}
                {msg.text.includes('[INIT]') && <Terminal className="w-4 h-4 text-status-secure mt-0.5 flex-shrink-0" />}
                {msg.text.includes('[READY]') && <Zap className="w-4 h-4 text-alert-warning mt-0.5 flex-shrink-0" />}
                <span className={`${msg.text.includes('[READY]') ? 'text-alert-warning' : msg.text.includes('[OK]') ? 'text-status-success' : 'text-status-secure'}`}>{msg.text}</span>
              </div>
            ))}
            {bootStage < bootMessages.length && <div className="flex items-center gap-2 text-status-secure"><span className="typing-cursor">_</span></div>}
          </div>
          <div className="mt-6 pt-4 border-t border-cyber-border">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Establishing secure connection...</span>
              <span>{Math.min(bootStage * 15, 100)}%</span>
            </div>
            <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-status-secure to-status-active transition-all duration-300" style={{ width: `${Math.min(bootStage * 15, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Activity },
    { id: 'about', label: 'Profile', icon: User },
    { id: 'experience', label: 'Operations', icon: Briefcase },
    { id: 'skills', label: 'Arsenal', icon: Database },
    { id: 'hire', label: 'Connect', icon: Send }
  ];

  const skills = [
    { category: 'DevOps & Cloud', icon: Server, severity: 'CRITICAL', items: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Apache Airflow', 'Terraform', 'Ansible', 'AWS', 'Azure', 'Helm'] },
    { category: 'Monitoring & Observability', icon: Activity, severity: 'HIGH', items: ['Grafana', 'Prometheus', 'ELK Stack', 'CloudWatch', 'APM', 'Datadog'] },
    { category: 'Database & Storage', icon: Database, severity: 'CRITICAL', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Query Optimization'] },
    { category: 'Backend & APIs', icon: Cpu, severity: 'HIGH', items: ['Node.js', 'Express.js', 'RESTful API', 'Microservices', 'OAuth 2.0', 'JWT', 'RabbitMQ', 'Kafka'] },
    { category: 'Frontend', icon: Globe, severity: 'MEDIUM', items: ['React.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { category: 'Languages', icon: Code, severity: 'HIGH', items: ['Python', 'JavaScript', 'C/C++', 'SQL', 'Bash', 'PowerShell'] },
    { category: 'Security', icon: Shield, severity: 'CRITICAL', items: ['Penetration Testing', 'OWASP', 'IDA Pro', 'Ghidra', 'Vulnerability Assessment'] },
    { category: 'Tools & Management', icon: Network, severity: 'MEDIUM', items: ['Git', 'JIRA', 'Confluence', 'Active Directory', 'IAM', 'RBAC', 'MFA', 'Agile/Scrum'] }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'CRITICAL': return 'text-alert-critical border-alert-critical/30 bg-alert-critical/10';
      case 'HIGH': return 'text-alert-warning border-alert-warning/30 bg-alert-warning/10';
      case 'MEDIUM': return 'text-status-secure border-status-secure/30 bg-status-secure/10';
      default: return 'text-status-success border-status-success/30 bg-status-success/10';
    }
  };

  return (
    <div className="bg-cyber-black text-white min-h-screen overflow-x-hidden font-sans">
      <div className="noise-overlay"></div>
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-darker to-cyber-black"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>

        {/* Floating orbs */}
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-status-secure/8 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-status-active/6 rounded-full blur-3xl animate-float" style={{ animationDuration: '12s', animationDelay: '-4s' }}></div>
        <div className="absolute bottom-[20%] left-[20%] w-80 h-80 bg-status-secure/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '-2s' }}></div>
        <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-alert-warning/4 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Interactive cursor glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl pointer-events-none bg-gradient-radial from-status-secure to-transparent transition-all duration-700 ease-out" style={{ left: mousePosition.x - 250, top: mousePosition.y - 250 }} />

        {/* Network nodes - floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle absolute w-1 h-1 bg-status-secure/40 rounded-full" style={{ top: '15%', left: '10%', animation: 'floatParticle 20s infinite linear' }}></div>
          <div className="particle absolute w-1.5 h-1.5 bg-status-active/30 rounded-full" style={{ top: '25%', left: '85%', animation: 'floatParticle 25s infinite linear', animationDelay: '-5s' }}></div>
          <div className="particle absolute w-1 h-1 bg-status-secure/30 rounded-full" style={{ top: '70%', left: '15%', animation: 'floatParticle 22s infinite linear', animationDelay: '-10s' }}></div>
          <div className="particle absolute w-2 h-2 bg-status-secure/20 rounded-full" style={{ top: '80%', left: '75%', animation: 'floatParticle 30s infinite linear', animationDelay: '-15s' }}></div>
          <div className="particle absolute w-1 h-1 bg-status-active/40 rounded-full" style={{ top: '45%', left: '5%', animation: 'floatParticle 18s infinite linear', animationDelay: '-8s' }}></div>
          <div className="particle absolute w-1.5 h-1.5 bg-status-success/30 rounded-full" style={{ top: '55%', left: '90%', animation: 'floatParticle 24s infinite linear', animationDelay: '-12s' }}></div>
        </div>

        {/* Geometric accent lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#00f0ff" strokeWidth="1" />
          <line x1="0" y1="70%" x2="100%" y2="65%" stroke="#3b82f6" strokeWidth="1" />
          <line x1="20%" y1="0" x2="25%" y2="100%" stroke="#00f0ff" strokeWidth="1" />
          <line x1="80%" y1="0" x2="75%" y2="100%" stroke="#3b82f6" strokeWidth="1" />
        </svg>

        {/* Corner tech accents */}
        <div className="absolute top-8 left-8 w-32 h-32 opacity-20">
          <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-status-secure to-transparent"></div>
          <div className="absolute top-0 left-0 h-16 w-[1px] bg-gradient-to-b from-status-secure to-transparent"></div>
          <div className="absolute top-4 left-4 w-2 h-2 border border-status-secure/50"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-32 h-32 opacity-20">
          <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-status-secure to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-16 w-[1px] bg-gradient-to-t from-status-secure to-transparent"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 border border-status-secure/50"></div>
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyber-black/50"></div>
      </div>
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60]">
        <div className="h-full bg-gradient-to-r from-status-secure via-status-active to-status-secure" style={{ width: scrollProgress + '%' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isNavScrolled ? 'glass-panel border-b border-cyber-border' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-status-secure to-status-active rounded-lg flex items-center justify-center shadow-cyber group-hover:shadow-cyber-lg transition-all">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-status-success rounded-full border-2 border-cyber-black animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-sm sm:text-base">NIVENDU</span>
                <span className="text-status-secure font-mono text-xs block -mt-1">SEC-OPS</span>
              </div>
            </button>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'text-status-secure bg-status-secure/10 border border-status-secure/30' : 'text-text-secondary hover:text-white hover:bg-cyber-light/50'}`}>
                  <item.icon size={16} />
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-status-success/10 border border-status-success/30 rounded-full">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-status-success rounded-full animate-pulse"></div>
                <span className="text-status-success text-xs font-mono">ONLINE</span>
              </div>
              <a href="/resume.pdf" download className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-status-secure hover:bg-status-secure/80 text-cyber-black rounded-lg font-semibold text-sm transition-all cyber-btn">
                <Download size={16} /><span className="hidden md:inline">Resume</span>
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-text-secondary hover:text-white">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-cyber-border">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id ? 'text-status-secure bg-status-secure/10 border border-status-secure/30' : 'text-text-secondary hover:text-white hover:bg-cyber-light/50'}`}>
                  <item.icon size={18} />{item.label}
                </button>
              ))}
              <a href="/resume.pdf" download className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-status-secure hover:bg-status-secure/80 text-cyber-black rounded-lg font-semibold text-sm transition-all mt-4">
                <Download size={16} />Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-12">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 glass-panel rounded-full mb-6">
                <div className="relative">
                  <div className="w-2 h-2 bg-status-success rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-status-success rounded-full animate-ping"></div>
                </div>
                <span className="text-status-success text-xs sm:text-sm font-mono">STATUS: AVAILABLE FOR HIRE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-alert-warning/10 border border-alert-warning/30 rounded mb-4 ml-2 sm:ml-4">
                <Lock className="w-3 h-3 text-alert-warning" />
                <span className="text-alert-warning text-xs font-mono">CLEARANCE: TOP SECRET</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                <span className="text-text-muted font-mono text-base sm:text-lg block mb-2">{"//"} OPERATOR_ID:</span>
                <span className="text-glow-cyan">Nivendu Tripathy</span>
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-6 font-mono">
                <span className="text-status-secure">&gt;</span> Senior Infrastructure Engineer
              </h2>
              <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Architecting secure, scalable cloud infrastructure and building robust CI/CD pipelines. Specialized in automation, Kubernetes orchestration, and creating mission-critical systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
                <button onClick={() => scrollToSection('hire')} className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-status-secure hover:bg-status-secure/90 text-cyber-black rounded-xl font-semibold shadow-cyber hover:shadow-cyber-lg transition-all cyber-btn">
                  <Fingerprint size={20} />Initiate Contact<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => scrollToSection('experience')} className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 glass-panel glass-panel-hover rounded-xl font-semibold">
                  <Eye size={20} className="text-status-secure" />View Operations
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start text-sm">
                <div className="flex items-center gap-2 text-text-secondary"><MapPin size={16} className="text-status-secure" /><span>Bengaluru, India</span></div>
                <div className="flex items-center gap-2 text-text-secondary"><Briefcase size={16} className="text-status-secure" /><span>2+ Years Active</span></div>
                <div className="flex items-center gap-2 text-text-secondary"><Shield size={16} className="text-status-success" /><span>Verified Operator</span></div>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative profile-container">
                {/* Ambient glow */}
                <div className="absolute -inset-8 sm:-inset-12 bg-status-secure/10 rounded-full blur-3xl animate-pulse-slow"></div>
                
                {/* Outer arc ring - rotating */}
                <svg className="absolute -inset-6 sm:-inset-8 w-[calc(100%+3rem)] h-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] sm:h-[calc(100%+4rem)] animate-spin" style={{ animationDuration: '30s' }}>
                  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#arcGradient)" strokeWidth="1" strokeDasharray="8 12" opacity="0.6" />
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Inner arc ring - counter rotating */}
                <svg className="absolute -inset-3 sm:-inset-4 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)] sm:h-[calc(100%+2rem)] animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="60 200" opacity="0.5" />
                </svg>
                
                {/* Glowing border ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-status-secure via-status-active to-status-secure p-[2px] opacity-60">
                  <div className="w-full h-full rounded-full bg-cyber-black"></div>
                </div>
                
                {/* Main image container */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-status-secure/30 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
                  <img src="/profile.jpg" alt="Nivendu Tripathy" className="w-full h-full object-cover object-center" />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/20 via-transparent to-status-secure/5"></div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-status-secure/60 rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-status-secure/60 rounded-bl-lg"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown size={20} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Activity className="w-4 h-4 text-status-secure" />
              <span className="text-status-secure text-sm font-mono">SYSTEM.PROFILE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Operator Intelligence</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12 reveal">
            {[
              { number: '2+', label: 'Years Active', icon: Calendar, status: 'VERIFIED' },
              { number: '99.9%', label: 'Uptime Record', icon: Activity, status: 'OPTIMAL' },
              { number: '50+', label: 'Systems Deployed', icon: Server, status: 'ACTIVE' },
              { number: '1M+', label: 'Transactions/Day', icon: Database, status: 'PROCESSING' }
            ].map((stat, i) => (
              <div key={i} className="glass-panel mission-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-status-secure" />
                  <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 bg-status-success/10 text-status-success rounded">{stat.status}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-text-muted text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-6 sm:p-8 reveal">
            <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-border">
              <Terminal className="w-5 h-5 text-status-secure" />
              <span className="font-mono text-status-secure text-sm">operator_profile.json</span>
            </div>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
              Production Systems Engineer with 2+ years of hands-on experience architecting scalable cloud infrastructure, optimizing CI/CD pipelines, and managing high-availability database systems. Specialized in Kubernetes orchestration, infrastructure automation with Terraform/Ansible, and implementing robust monitoring solutions. Proven track record of reducing deployment cycles by 25%, improving database performance by 30%, and maintaining 99.9% uptime for mission-critical systems handling 1M+ daily transactions.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Problem Solver', 'Security Focused', 'System Architect', 'Automation Expert'].map((trait, i) => (
                <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-status-secure/10 border border-status-secure/30 text-status-secure rounded-lg text-xs sm:text-sm font-mono">{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Briefcase className="w-4 h-4 text-status-secure" />
              <span className="text-status-secure text-sm font-mono">OPERATIONS.LOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Mission History</h2>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="group relative pl-6 sm:pl-8 border-l-2 border-status-secure/30 reveal-left hover:border-status-secure transition-colors">
              <div className="absolute -left-2 sm:-left-2.5 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-status-secure rounded-full shadow-cyber flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-black rounded-full"></div>
              </div>
              <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-1 bg-status-success/10 text-status-success rounded">ACTIVE</span>
                      <span className="text-xs font-mono text-text-muted">ID: OP-2024-001</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Production Systems Engineer</h3>
                    <p className="text-status-secure font-medium">Mindmap Infotech Pvt Ltd</p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono px-3 py-1 glass-panel rounded-full text-text-secondary whitespace-nowrap">Feb 2024 - Present</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Architected CI/CD pipelines using Apache Airflow, Docker, and Kubernetes, reducing deployment cycles by <span className="text-status-secure font-semibold">25%</span> with zero-downtime releases for 50+ microservices</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Optimized PostgreSQL databases handling <span className="text-status-secure font-semibold">1M+ transactions</span> with query tuning, improving performance by <span className="text-status-secure font-semibold">30%</span> with 99.9% uptime</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Automated infrastructure provisioning using Terraform and Ansible across AWS/Azure, reducing manual errors by <span className="text-status-secure font-semibold">90%</span> and costs by <span className="text-status-secure font-semibold">20%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Implemented monitoring with Grafana and Prometheus, increasing uptime by <span className="text-status-secure font-semibold">30%</span> and reducing MTTR by <span className="text-status-secure font-semibold">40%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Configured RabbitMQ message broker supporting <span className="text-status-secure font-semibold">10K+ messages/second</span> with 99% reliability</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Managed JIRA administration for <span className="text-status-secure font-semibold">200+ users</span> with workflows and automation, reducing ticket resolution time by <span className="text-status-secure font-semibold">20%</span></span></li>
                </ul>
              </div>
            </div>
            <div className="group relative pl-6 sm:pl-8 border-l-2 border-cyber-border hover:border-status-secure/50 transition-colors">
              <div className="absolute -left-2 sm:-left-2.5 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-cyber-light group-hover:bg-status-secure rounded-full transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-black rounded-full"></div>
              </div>
              <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-1 bg-text-muted/10 text-text-muted rounded">COMPLETED</span>
                      <span className="text-xs font-mono text-text-muted">ID: OP-2023-002</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Full Stack Developer</h3>
                    <p className="text-status-secure font-medium">Sakanyagi Research</p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono px-3 py-1 glass-panel rounded-full text-text-secondary whitespace-nowrap">Oct 2023 - Jan 2024</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Engineered secure RESTful APIs using Node.js, Express.js, and MongoDB with OAuth 2.0 authentication, handling <span className="text-status-secure font-semibold">50K+ daily requests</span> with 99.5% uptime</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Developed comprehensive testing framework using Jest and Selenium, achieving <span className="text-status-secure font-semibold">85% code coverage</span> and reducing bug rate by <span className="text-status-secure font-semibold">40%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Built responsive React.js frontend with Redux state management and Tailwind CSS, reducing page load times by <span className="text-status-secure font-semibold">35%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Implemented GitLab CI/CD pipeline for automated testing, linting, and deployments, cutting release cycles by <span className="text-status-secure font-semibold">50%</span></span></li>
                </ul>
              </div>
            </div>
            <div className="group relative pl-6 sm:pl-8 border-l-2 border-cyber-border hover:border-status-secure/50 transition-colors">
              <div className="absolute -left-2 sm:-left-2.5 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-cyber-light group-hover:bg-status-secure rounded-full transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-black rounded-full"></div>
              </div>
              <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-1 bg-text-muted/10 text-text-muted rounded">COMPLETED</span>
                      <span className="text-xs font-mono text-text-muted">ID: OP-2022-003</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">IT Operations Intern</h3>
                    <p className="text-status-secure font-medium">Ethnotech Solutions</p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono px-3 py-1 glass-panel rounded-full text-text-secondary whitespace-nowrap">Dec 2022 - Jan 2023</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Administered Active Directory for <span className="text-status-secure font-semibold">500+ users</span> across multiple domains, managing user provisioning, group policies, and access controls</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Implemented IAM policies including RBAC, MFA, and SSO, reducing unauthorized access incidents by <span className="text-status-secure font-semibold">70%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Automated routine operations using Python and PowerShell scripts, reducing manual effort by <span className="text-status-secure font-semibold">60%</span></span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Monitored network infrastructure and resolved L1/L2 support tickets with <span className="text-status-secure font-semibold">95% SLA</span> compliance</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-status-secure" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Training and Certification</h3>
            </div>
            <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-alert-warning" />
                    <span className="text-xs font-mono text-alert-warning">CREDENTIAL VERIFIED</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">B.E. Electronics and Communication Engineering</h4>
                  <p className="text-status-secure">SJB Institute of Technology, Bengaluru</p>
                </div>
                <span className="text-xs sm:text-sm font-mono px-3 py-1 glass-panel rounded-full text-text-secondary whitespace-nowrap">Class of 2019</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Code className="w-4 h-4 text-status-secure" />
              <span className="text-status-secure text-sm font-mono">PROJECTS.REPO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Mission Deployments</h2>
          </div>
          <div className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
            <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2 py-1 bg-status-secure/10 text-status-secure rounded">RESEARCH</span>
                  <span className="text-xs font-mono text-text-muted">ID: PRJ-001</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Sound-Based Communication Infrastructure</h3>
                <p className="text-status-secure font-medium">Research Project</p>
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
              <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Developed an innovative voice-over-sound communication system enabling data transmission through audio frequencies</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Implemented signal processing algorithms for encoding and decoding data in audio streams</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-status-success mt-0.5 flex-shrink-0" /><span>Demonstrated proof-of-concept for secure communication in network-restricted environments</span></li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Signal Processing', 'Python', 'Audio Engineering', 'Research'].map((tech, i) => (
                <span key={i} className="px-2.5 py-1 bg-cyber-light text-text-secondary rounded-lg text-xs border border-cyber-border">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Award className="w-4 h-4 text-alert-warning" />
              <span className="text-alert-warning text-sm font-mono">ACHIEVEMENTS.LOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Commendations</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="glass-panel commendation-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-alert-warning/10 rounded-lg">
                  <Award className="w-6 h-6 text-alert-warning" />
                </div>
                <div>
                  <span className="text-xs font-mono px-2 py-1 bg-alert-warning/10 text-alert-warning rounded">2ND PLACE</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hackathon Winner</h3>
              <p className="text-text-secondary text-sm">Secured 2nd position in competitive hackathon event, demonstrating rapid prototyping and innovative problem-solving skills under time constraints.</p>
            </div>
            <div className="glass-panel commendation-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-status-success/10 rounded-lg">
                  <Award className="w-6 h-6 text-status-success" />
                </div>
                <div>
                  <span className="text-xs font-mono px-2 py-1 bg-status-success/10 text-status-success rounded">EXCELLENCE</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">SPP Award Recipient</h3>
              <p className="text-text-secondary text-sm">Recognized for outstanding performance and significant contributions to project delivery and team success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Database className="w-4 h-4 text-status-secure" />
              <span className="text-status-secure text-sm font-mono">ARSENAL.DB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Technical Arsenal</h2>
            <p className="text-text-muted mt-2 text-sm sm:text-base">Vulnerability Assessment: Skills Inventory</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skillGroup, i) => (
              <div key={i} className="glass-panel mission-card rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="mission-card-glow rounded-xl sm:rounded-2xl"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 bg-status-secure/10 rounded-lg">
                      <skillGroup.icon className="w-5 h-5 sm:w-6 sm:h-6 text-status-secure" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{skillGroup.category}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={"text-xs font-mono px-2 py-1 rounded border " + getSeverityColor(skillGroup.severity)}>{skillGroup.severity}</span>
                  <span className="text-xs text-text-muted font-mono">PROFICIENCY</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span key={j} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-cyber-light text-text-secondary rounded-lg text-xs sm:text-sm hover:bg-status-secure/20 hover:text-status-secure transition-all cursor-default border border-transparent hover:border-status-secure/30">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire Me / Contact Section */}
      <section id="hire" className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12 sm:mb-16 p-6 sm:p-8 lg:p-12 glass-panel rounded-2xl sm:rounded-3xl overflow-hidden reveal-scale">
            <div className="absolute inset-0 bg-gradient-to-br from-status-secure/10 via-transparent to-status-active/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-status-secure/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-alert-warning/10 border border-alert-warning/30 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-alert-warning" />
                <span className="text-alert-warning text-xs sm:text-sm font-mono">PRIORITY: HIGH - SEEKING NEW MISSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Ready for Deployment</h2>
              <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-2xl mx-auto">Looking for a dedicated Infrastructure Engineer? Let us discuss how I can help secure and scale your systems.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a href="mailto:nivendu.tripathy99@gmail.com" className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-status-secure hover:bg-status-secure/90 text-cyber-black rounded-xl font-semibold shadow-cyber hover:shadow-cyber-lg transition-all cyber-btn">
                  <Send size={20} />Send Transmission<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/resume.pdf" download className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 glass-panel glass-panel-hover rounded-xl font-semibold">
                  <FileText size={20} className="text-status-secure" />Download Dossier
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
              <Lock className="w-4 h-4 text-status-secure" />
              <span className="text-status-secure text-sm font-mono">SECURE.CHANNEL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Establish Connection</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-border">
                <Terminal className="w-5 h-5 text-status-secure" />
                <span className="font-mono text-status-secure text-sm">secure_message.init()</span>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-text-secondary text-sm font-mono mb-2">OPERATOR_NAME *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-status-secure/50" placeholder="Enter your designation" />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-mono mb-2">COMM_CHANNEL *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-status-secure/50" placeholder="your.email@domain.com" />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-mono mb-2">SUBJECT_LINE</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-status-secure/50" placeholder="Mission briefing subject" />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-mono mb-2">MESSAGE_PAYLOAD *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={5} className="w-full px-4 py-3 rounded-lg font-mono text-sm focus:ring-2 focus:ring-status-secure/50 resize-none" placeholder="Enter your transmission..." />
                </div>
                <button type="submit" disabled={formStatus === "sending"} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-status-secure hover:bg-status-secure/90 disabled:bg-status-secure/50 text-cyber-black rounded-xl font-semibold transition-all cyber-btn">
                  {formStatus === "sending" ? (<><div className="w-5 h-5 border-2 border-cyber-black/30 border-t-cyber-black rounded-full animate-spin"></div>Transmitting...</>) : formStatus === "success" ? (<><CheckCircle size={20} />Transmission Received</>) : (<><Send size={20} />Send Secure Message</>)}
                </button>
                <p className="text-xs text-text-muted text-center font-mono"><Lock className="w-3 h-3 inline mr-1" />End-to-end encrypted transmission</p>
              </form>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <a href="mailto:nivendu.tripathy99@gmail.com" className="block glass-panel glass-panel-hover rounded-xl sm:rounded-2xl p-5 sm:p-6 card-lift">
                <div className="flex items-center gap-4">
                  <div className="p-3 sm:p-4 bg-status-secure/10 rounded-xl"><Mail className="w-6 h-6 sm:w-8 sm:h-8 text-status-secure" /></div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">Primary Channel</h3>
                    <p className="text-status-secure font-mono text-sm sm:text-base break-all">nivendu.tripathy99@gmail.com</p>
                  </div>
                </div>
              </a>
              <div className="glass-panel glass-panel-hover rounded-xl sm:rounded-2xl p-5 sm:p-6 card-lift">
                <div className="flex items-center gap-4">
                  <div className="p-3 sm:p-4 bg-status-active/10 rounded-xl"><Phone className="w-6 h-6 sm:w-8 sm:h-8 text-status-active" /></div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">Direct Line</h3>
                    <p className="text-text-muted font-mono text-xs sm:text-sm flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Restricted for security reasons</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-4">Network Links</h3>
                <div className="flex gap-3 sm:gap-4">
                  <a href="https://linkedin.com/in/nivendu-tripathy" target="_blank" rel="noopener noreferrer" className="flex-1 p-3 sm:p-4 glass-panel glass-panel-hover rounded-xl flex items-center justify-center gap-2 text-text-secondary hover:text-status-secure transition-colors">
                    <Linkedin size={20} className="sm:w-6 sm:h-6" /><span className="hidden sm:inline font-mono text-sm">LinkedIn</span>
                  </a>
                  <a href="https://github.com/NecrosisLive" target="_blank" rel="noopener noreferrer" className="flex-1 p-3 sm:p-4 glass-panel glass-panel-hover rounded-xl flex items-center justify-center gap-2 text-text-secondary hover:text-status-secure transition-colors">
                    <Github size={20} className="sm:w-6 sm:h-6" /><span className="hidden sm:inline font-mono text-sm">GitHub</span>
                  </a>
                </div>
              </div>
              <div className="glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-status-success" />
                  <span className="font-mono text-status-success text-sm">TRUST_METRICS</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" /><span className="text-text-secondary">Verified Identity</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" /><span className="text-text-secondary">Background Cleared</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" /><span className="text-text-secondary">NDA Compliant</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" /><span className="text-text-secondary">24/7 Available</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-6 sm:py-8 px-4 sm:px-6 border-t border-cyber-border z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-status-secure to-status-active rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-text-muted text-xs sm:text-sm font-mono">2024 NIVENDU.SEC // All systems operational</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-xs sm:text-sm font-mono">
              <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
              <span>Built with React and Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button onClick={scrollToTop} className={"fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 p-2.5 sm:p-3 bg-status-secure hover:bg-status-secure/90 text-cyber-black rounded-xl shadow-cyber transition-all " + (scrollProgress > 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
        <ArrowUp size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default CyberPortfolio;
