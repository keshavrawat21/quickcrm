import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, ArrowRight, CheckCircle2, Volume2, Activity } from 'lucide-react';

// --- Subcomponents ---

const AmbientBackgroundLight = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px]" />
    <div 
      className="absolute inset-0 opacity-[0.02]" 
      style={{
        backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
  </div>
);

const AmbientBackgroundDark = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[130px] animate-pulse" style={{ animationDuration: '4s' }} />
    <div className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[100px]" />
    <div 
      className="absolute inset-0 opacity-[0.05]" 
      style={{
        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
    />
  </div>
);

const AudioWaveform = ({ barCount = 40 }) => {
  const [bars, setBars] = useState(Array(barCount).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.max(10, Math.random() * 100)));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-0.5 sm:gap-1 h-10 sm:h-16 w-full max-w-sm px-4 relative z-10">
      {bars.map((height, i) => (
        <div
          key={i}
          className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 to-indigo-500 transition-all duration-150 ease-out"
          style={{ 
            height: `${height}%`,
            opacity: 0.4 + (height / 150),
            boxShadow: `0 0 ${height / 4}px rgba(56, 189, 248, 0.5)`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* Main Split-Screen Card */}
      {/* Removed drop shadow completely */}
      <div className="relative w-full max-w-5xl h-[85vh] sm:h-[85vh] lg:h-[500px] xl:h-[550px] bg-white rounded-xl lg:rounded-2xl border border-slate-200 flex flex-col lg:flex-row overflow-hidden min-h-0">
        
        {/* ================= LEFT COLUMN: CONTENT (Light Theme) ================= */}
        <div className="flex-[0.8] xl:flex-1 flex flex-col justify-start relative z-10 p-5 sm:p-6 lg:p-8 xl:p-12 overflow-y-auto min-h-0">
          <AmbientBackgroundLight />
          
          <div className="relative z-10 w-full max-w-sm mx-auto lg:mx-0 flex flex-col justify-start mt-2">
            
            {/* Top Badge */}
            <div className="flex justify-start mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm text-blue-700 text-[9px] sm:text-[10px] font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                <span>Beta Access Opening Soon</span>
              </div>
            </div>

            {/* Headers */}
            <div className="text-left mb-4 sm:mb-5">
              <h1 className="font-extrabold tracking-tight mb-0 flex flex-col gap-0.5 sm:gap-1">
                <span className="text-xs sm:text-sm text-slate-500 font-bold tracking-wider uppercase">Quick CRM</span>
                <span className="text-2xl sm:text-3xl xl:text-4xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pb-1">
                  AI Voice Agent
                </span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed mt-0.5 sm:mt-1">
                Human-like conversational intelligence natively integrated into your CRM. We are building the future of automated, zero-latency voice interactions.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="w-full max-w-xs">
              {submitted ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-emerald-900">You're on the priority list!</h3>
                    <p className="text-[10px] sm:text-xs mt-0.5 text-emerald-700">Watch your inbox for early access details.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
                  <div className="relative flex items-center rounded-lg bg-white border border-slate-200 p-1 transition-all group-hover:border-blue-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email..."
                      className="flex-1 bg-transparent border-none outline-none px-2 sm:px-3 py-1.5 sm:py-2 text-slate-900 placeholder-slate-400 text-xs focus:ring-0"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all active:scale-95 whitespace-nowrap"
                    >
                      <span className="hidden sm:inline">Get Access</span>
                      <span className="sm:hidden">Join</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Trust Indicators */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-slate-500 font-medium">
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                <Volume2 className="w-3 h-3 text-blue-500" />
                <span>&lt; 500ms Latency</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                <Activity className="w-3 h-3 text-indigo-500" />
                <span>Natural Prosody</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMN: VISUAL (Dark Theme) ================= */}
        {/* Removed inner shadow from the right panel as well */}
        <div className="flex-[0.6] lg:flex-1 relative bg-blue-950 m-3 sm:m-4 lg:self-start lg:mt-8 xl:mt-12 lg:h-[55%] lg:max-h-[300px] lg:mr-6 lg:ml-2 rounded-xl lg:rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-blue-900 min-h-[160px] sm:min-h-[200px] lg:min-h-0">
          <AmbientBackgroundDark />

          {/* Core Interactive Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-4">
            
            {/* Glowing Mic Orb */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center mb-4 sm:mb-6">
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-blue-500/20 animate-pulse" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-3 sm:inset-5 rounded-full bg-indigo-500/30 animate-pulse delay-100" />
              
              <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-white/20 backdrop-blur-md transition-transform hover:scale-105 duration-300">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Dynamic Waveform Visualizer */}
            <AudioWaveform barCount={window.innerWidth < 640 ? 25 : 35} />
            
            {/* System Status Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-slate-300 text-[8px] sm:text-[9px] font-medium tracking-wider">AGENT ONLINE</span>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}