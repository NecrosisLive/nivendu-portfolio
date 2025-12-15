/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0f',
          darker: '#0d0d14',
          dark: '#12121a',
          medium: '#1a1a24',
          light: '#242430',
          border: '#2a2a3a',
        },
        status: {
          secure: '#00f0ff',
          secureGlow: '#00f0ff40',
          active: '#3b82f6',
          activeGlow: '#3b82f640',
          success: '#10b981',
          successGlow: '#10b98140',
        },
        alert: {
          warning: '#f59e0b',
          warningGlow: '#f59e0b40',
          critical: '#ef4444',
          criticalGlow: '#ef444440',
          elevated: '#ff6b35',
          elevatedGlow: '#ff6b3540',
        },
        text: {
          primary: '#e4e4e7',
          secondary: '#a1a1aa',
          muted: '#71717a',
          accent: '#00f0ff',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'boot-text': 'bootText 0.5s ease-out forwards',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'typing': 'typing 2s steps(30) forwards',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'status-pulse': 'statusPulse 2s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        bootText: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0, 240, 255, 0.3)' },
          '50%': { borderColor: 'rgba(0, 240, 255, 0.6)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        statusPulse: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 240, 255, 0.15)',
        'cyber-lg': '0 0 40px rgba(0, 240, 255, 0.2)',
        'cyber-glow': '0 0 60px rgba(0, 240, 255, 0.3), inset 0 0 60px rgba(0, 240, 255, 0.05)',
        'warning': '0 0 20px rgba(245, 158, 11, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(0, 240, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
