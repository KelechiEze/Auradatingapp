
import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Heart, Globe, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      // Redirect to onboarding for new registrations
      navigate('/onboarding');
    } else {
      // Direct navigation to dashboard for login as requested
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex items-center justify-center dark:bg-black bg-white overflow-hidden relative transition-colors duration-700">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle, ${isDark ? 'white' : 'black'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse delay-1000"></div>

      <div ref={containerRef} className="w-full max-w-2xl relative z-10">
        <div className="dark:bg-white/5 bg-slate-50 backdrop-blur-3xl border dark:border-white/10 border-black/5 p-10 md:p-20 rounded-[60px] shadow-2xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-yellow-500 mb-6 bg-yellow-400/10 px-6 py-2 rounded-full border border-yellow-400/20">
                <Sparkles size={16} />
                <span className="text-xs font-black uppercase tracking-[0.4em]">Secure Access</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                {isLogin ? "SOUL LOGIN." : "BECOME ELITE."}
            </h2>
            <p className="dark:text-white/40 text-black/50 text-xl font-light">
                {isLogin ? "Reconnect with your global resonance." : "Begin your journey into a borderless world of love."}
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/30 text-black/30 ml-6">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 dark:text-white/20 text-black/20 group-focus-within:text-yellow-400 transition-colors" size={24} />
                        <input 
                            required
                            type="text" 
                            placeholder="Aura Member" 
                            className="interactive w-full dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 rounded-3xl py-6 px-16 focus:outline-none focus:border-yellow-400 transition-all font-medium text-lg"
                        />
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/30 text-black/30 ml-6">Frequency ID (Email)</label>
                <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 dark:text-white/20 text-black/20 group-focus-within:text-yellow-400 transition-colors" size={24} />
                    <input 
                        required
                        type="email" 
                        placeholder="soul@aura.com" 
                        className="interactive w-full dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 rounded-3xl py-6 px-16 focus:outline-none focus:border-yellow-400 transition-all font-medium text-lg"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/30 text-black/30 ml-6">Access Code (Password)</label>
                <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 dark:text-white/20 text-black/20 group-focus-within:text-yellow-400 transition-colors" size={24} />
                    <input 
                        required
                        type={showPass ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="interactive w-full dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 rounded-3xl py-6 px-16 focus:outline-none focus:border-yellow-400 transition-all font-medium text-lg"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 dark:text-white/30 text-black/30 hover:text-yellow-400 transition-colors"
                    >
                        {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                </div>
            </div>

            <button type="submit" className="interactive w-full bg-yellow-400 text-black py-7 rounded-3xl font-black text-xl tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl shadow-yellow-400/20">
                {isLogin ? "AUTHORIZE ACCESS" : "INITIALIZE RESONANCE"}
                <ArrowRight size={24} />
            </button>
          </form>

          <div className="mt-16 pt-10 border-t dark:border-white/5 border-black/5 text-center flex flex-col gap-6">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="interactive dark:text-white/40 text-black/40 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors font-black uppercase tracking-widest text-xs"
            >
                {isLogin ? "New to Aura? Register Identity" : "Member of Aura? Signal Access"}
            </button>
            <div className="flex justify-center items-center gap-12 mt-4">
                 <div className="flex items-center gap-2 opacity-30">
                     <Shield size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
                 </div>
                 <div className="flex items-center gap-2 opacity-30">
                     <Globe size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Global Node</span>
                 </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center items-center gap-8 opacity-20 group">
            <Heart size={32} className="animate-pulse group-hover:text-yellow-400 transition-colors" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
