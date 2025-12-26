
import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { ShieldCheck, ArrowRight, MessageSquare, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out' });
  }, []);

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    if (val && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 4) {
      gsap.to(containerRef.current, { opacity: 0, y: -20, duration: 0.5, onComplete: () => navigate('/dashboard') });
    } else {
      alert("Please enter a valid 4-digit code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black bg-white px-6">
      <div ref={containerRef} className="max-w-md w-full text-center space-y-12 bg-slate-50 dark:bg-white/5 p-12 rounded-[50px] border border-black/5 dark:border-white/10 shadow-2xl">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-black mx-auto shadow-xl shadow-yellow-400/20">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">VERIFY IDENTITY.</h1>
          <p className="text-sm dark:text-white/40 text-black/40">We've sent a unique resonance code to your email and phone. Enter it below to unlock your orbit.</p>
        </div>

        <div className="flex justify-center gap-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e.target.value, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              className="w-16 h-20 text-center text-3xl font-black dark:bg-white/5 bg-white border-2 dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all"
            />
          ))}
        </div>

        <button 
          onClick={handleVerify}
          className="interactive w-full bg-yellow-400 text-black py-6 rounded-2xl font-black text-lg tracking-widest flex items-center justify-center gap-4 hover:scale-105 active:scale-95 shadow-xl shadow-yellow-400/20"
        >
          VERIFY ACCESS
          <ArrowRight size={24} />
        </button>

        <div className="flex flex-col gap-4">
            <button className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">Resend via Email</button>
            <button className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">Resend via SMS</button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
