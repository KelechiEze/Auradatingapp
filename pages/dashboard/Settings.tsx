
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Shield, Globe, Bell, Lock, LogOut, ChevronRight, User, Sparkles, Moon, Sun, Trash2, ArrowLeft, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ThemeContext } from '../../App';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (showDeactivateModal) {
      gsap.fromTo(modalRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [showDeactivateModal]);

  const handleDeactivate = () => {
    // Logic for deactivating
    gsap.to('body', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        navigate('/');
      }
    });
  };

  const SettingToggle = ({ icon: Icon, label, desc, active, onToggle }: any) => (
    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 group hover:border-yellow-400 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-yellow-400 shadow-sm">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest">{label}</h4>
          <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1">{desc}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`w-14 h-8 rounded-full relative transition-all duration-300 ${active ? 'bg-yellow-400' : 'bg-black/10 dark:bg-white/10'}`}
      >
        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-black shadow-lg transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );

  const SettingLink = ({ icon: Icon, label, onClick, color = 'text-current' }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-black/5 dark:border-white/10 group hover:border-yellow-400 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-black flex items-center justify-center ${color} shadow-sm`}>
          <Icon size={20} />
        </div>
        <h4 className={`font-black text-sm uppercase tracking-widest ${color}`}>{label}</h4>
      </div>
      <ChevronRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </button>
  );

  return (
    <div ref={containerRef} className="h-full overflow-y-auto no-scrollbar p-6 lg:p-12 space-y-12 pb-32 relative">
      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setShowDeactivateModal(false)}
        >
          <div 
            ref={modalRef} 
            className="w-full max-w-lg bg-white dark:bg-black rounded-[50px] p-10 lg:p-16 border dark:border-white/10 border-black/5 shadow-2xl space-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl mx-auto flex items-center justify-center">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-4xl font-black tracking-tighter">ARE YOU SURE?</h3>
              <p className="text-black/40 dark:text-white/40 font-medium leading-relaxed italic">
                "Deactivating your identity will dissolve all current resonances and purge your aura from the global orbit."
              </p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={handleDeactivate}
                className="w-full bg-red-500 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                CONFIRM DEACTIVATION
              </button>
              <button 
                onClick={() => setShowDeactivateModal(false)}
                className="w-full bg-slate-100 dark:bg-white/10 dark:text-white text-black py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                RETURN TO ORBIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">SETTINGS.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appearance & Core */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Resonance Environment</h3>
          <div className="space-y-4">
             <SettingToggle 
                icon={isDark ? Moon : Sun} 
                label="Dark Mode" 
                desc="Aura dark sanctuary" 
                active={isDark} 
                onToggle={toggleTheme} 
             />
             <SettingToggle 
                icon={Globe} 
                label="Global Discovery" 
                desc="Show profile worldwide" 
                active={true} 
             />
             <SettingToggle 
                icon={Bell} 
                label="Instant Sync" 
                desc="Real-time notifications" 
                active={true} 
             />
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Privacy Sanctum</h3>
          <div className="space-y-4">
             <SettingToggle 
                icon={Lock} 
                label="Incognito Mode" 
                desc="Only people I like see me" 
                active={false} 
             />
             <SettingToggle 
                icon={Shield} 
                label="Biometric Access" 
                desc="Verify identity on login" 
                active={true} 
             />
             <SettingLink 
               icon={User} 
               label="Account Security" 
               onClick={() => {}}
             />
          </div>
        </div>

        {/* Premium Banner */}
        <div className="md:col-span-2 p-8 bg-yellow-400 rounded-[48px] relative overflow-hidden group interactive">
            <Sparkles className="absolute -top-6 -right-6 text-black opacity-10 scale-[3] group-hover:rotate-45 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                  <h4 className="text-3xl font-black tracking-tighter text-black leading-none">AURA PREMIUM STATUS.</h4>
                  <p className="text-black/60 font-black uppercase tracking-widest text-[10px] mt-2 italic">Reconnect with your unlimited potential.</p>
               </div>
               <button className="bg-black text-white px-10 py-5 rounded-3xl font-black text-xs tracking-widest uppercase hover:scale-110 active:scale-95 transition-all shadow-xl">
                 Upgrade Frequency
               </button>
            </div>
        </div>

        {/* Critical Actions */}
        <div className="md:col-span-2 space-y-4 pt-12">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Danger Zone</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingLink 
                icon={LogOut} 
                label="Sign Out of Session" 
                onClick={() => navigate('/')}
              />
              <SettingLink 
                icon={Trash2} 
                label="Deactivate Identity" 
                color="text-red-500"
                onClick={() => setShowDeactivateModal(true)}
              />
           </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="pt-20 text-center opacity-10">
         <h4 className="text-8xl font-black tracking-tighter">AURA.</h4>
         <p className="text-[8px] font-black uppercase tracking-[1em] mt-4">V: 2.5.0-RESONANCE</p>
      </div>
    </div>
  );
};

export default SettingsPage;
