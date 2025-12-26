
import React, { useEffect, useContext, useMemo, useState, createContext, useRef } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { Heart, Users, Star, MessageSquare, User, Sparkles, LogOut, Settings, Globe, Radio, X, Check, Zap, Crown, Shield, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ThemeContext } from '../../App';

interface PremiumContextType {
  isPremium: boolean;
  openUpgrade: () => void;
}

export const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  openUpgrade: () => {},
});

const UpgradeModal = ({ onClose }: { onClose: () => void }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState('semi');

  useEffect(() => {
    gsap.fromTo(modalContainerRef.current, 
      { scale: 0.95, opacity: 0, y: 20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' }
    );
  }, []);

  const plans = [
    { 
      id: 'monthly', 
      name: 'Standard Orbit', 
      price: '$9.99', 
      period: '/ mo', 
      desc: 'Core resonance',
      swipes: '150 Swipes / Day',
      features: ['150 Daily Pulses', 'See who Liked', 'Global Range']
    },
    { 
      id: 'semi', 
      name: 'Atmospheric', 
      price: '$49.99', 
      period: '/ 6 mo', 
      desc: 'High frequency', 
      popular: true,
      swipes: '500 Swipes / Day',
      features: ['500 Daily Pulses', 'Priority Nodes', '10 Soul Gifts']
    },
    { 
      id: 'annual', 
      name: 'Infinite Soul', 
      price: '$79.99', 
      period: '/ yr', 
      desc: 'Ultimate reach',
      swipes: 'Infinite Swipes',
      features: ['Infinite Pulses', 'Soul Mapping', 'Priority Support']
    },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        ref={modalContainerRef} 
        className="w-full max-w-xl bg-white dark:bg-black rounded-[24px] max-h-[90vh] overflow-y-auto no-scrollbar border dark:border-white/10 border-black/5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 lg:p-10">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all z-50">
            <X size={18} />
          </button>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 bg-yellow-400 text-black rounded-xl mx-auto flex items-center justify-center shadow-lg ring-4 ring-yellow-400/10">
              <Crown size={24} />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-2xl lg:text-3xl font-black tracking-tighter uppercase leading-none">UPGRADE SIGNAL.</h2>
              <p className="text-black/40 dark:text-white/40 font-black uppercase tracking-[0.2em] text-[7px]">Select resonance level</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
            {plans.map((plan) => (
              <button 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-4 rounded-[16px] border-2 transition-all text-left relative flex flex-col ${selectedPlan === plan.id ? 'border-yellow-400 bg-yellow-400/5' : 'border-black/5 dark:border-white/5 opacity-60'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest">Popular</span>
                )}
                <h4 className="font-black text-[7px] uppercase tracking-widest mb-0.5">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black">{plan.price}</span>
                  <span className="text-[7px] font-bold opacity-40">{plan.period}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-[20px] border dark:border-white/10 mb-6">
            <div className="grid grid-cols-1 gap-3">
              {currentPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold opacity-70">
                  <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0"><Check size={8} strokeWidth={4} /></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <button onClick={onClose} className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black text-xs tracking-widest uppercase shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
            SYNC {currentPlan.name.split(' ')[0]} NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const navItems = useMemo(() => [
    { label: 'Discover', icon: Heart, path: '/dashboard' },
    { label: 'People', icon: Users, path: '/dashboard/people' },
    { label: 'Likes', icon: Star, path: '/dashboard/liked' },
    { label: 'Profile', icon: User, path: '/dashboard/profile' },
    { label: 'Chats', icon: MessageSquare, path: '/dashboard/chats', badge: 3 },
  ], []);

  useEffect(() => {
    gsap.fromTo('.dash-view', 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <PremiumContext.Provider value={{ isPremium, openUpgrade: () => setShowUpgrade(true) }}>
      <div className="flex h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
        
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex flex-col w-52 border-r dark:border-white/5 border-black/5 p-4 shrink-0 bg-slate-50 dark:bg-black z-50">
          <div className="mb-6 flex items-center gap-2 px-1">
            <div className="bg-yellow-400 p-1.5 rounded-lg shadow-lg">
              <Radio className="text-black" size={16} strokeWidth={3} />
            </div>
            <span className="text-base font-black tracking-tighter uppercase">AURA<span className="text-yellow-400">.</span></span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
              return (
                <NavLink 
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-black text-[9px] uppercase tracking-widest relative ${isActive ? 'bg-yellow-400 text-black shadow-md' : 'opacity-40 hover:opacity-100 dark:text-white text-black hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <item.icon size={14} fill={isActive ? "currentColor" : "none"} />
                  {item.label}
                  {item.badge && !isActive && (
                    <div className="absolute right-3 w-4 h-4 bg-yellow-400 text-black text-[7px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-lg">
                      {item.badge}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t dark:border-white/5 border-black/5 space-y-1">
            <Link to="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg opacity-40 hover:opacity-100 transition-all font-black text-[9px] uppercase tracking-widest"><Settings size={14} />Settings</Link>
            {!isPremium && (
              <button onClick={() => setShowUpgrade(true)} className="w-full bg-yellow-400/10 text-yellow-400 p-3 rounded-xl border border-yellow-400/20 text-left hover:bg-yellow-400/20 transition-all">
                <span className="text-[6px] font-black uppercase tracking-widest block mb-0.5">Upgrade</span>
                <span className="text-[8px] font-bold opacity-70 leading-none truncate block">Infinite resonance.</span>
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 px-3 py-2 opacity-30 hover:opacity-100 transition-opacity font-black text-[8px] uppercase tracking-widest"><LogOut size={14} />Logout</Link>
          </div>
        </aside>

        {/* Mobile Sidebar (Left Rail) - Replaces Bottom Nav for visibility */}
        <nav className="lg:hidden w-16 h-full dark:bg-black/95 bg-white/95 backdrop-blur-3xl border-r dark:border-white/10 border-black/5 flex flex-col items-center py-6 gap-6 z-[100] shadow-[10px_0_30px_rgba(0,0,0,0.05)]">
          <div className="mb-4">
            <Radio className="text-yellow-400" size={24} strokeWidth={3} />
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
            return (
              <NavLink key={item.label} to={item.path} className="relative group p-3 transition-all">
                <item.icon size={22} className={isActive ? 'text-yellow-400' : 'dark:text-white text-black opacity-30 group-hover:opacity-100'} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 3 : 2} />
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full shadow-[2px_0_10px_rgba(250,204,21,0.5)]"></div>
                )}
                {item.badge && !isActive && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 text-black text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-md z-10">
                    {item.badge}
                  </div>
                )}
              </NavLink>
            );
          })}
          <div className="mt-auto flex flex-col items-center gap-6">
            <button 
              onClick={toggleTheme} 
              className={`p-3 rounded-xl transition-all ${isDark ? 'text-yellow-400' : 'bg-black text-white shadow-xl'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/dashboard/profile" className="w-8 h-8 rounded-lg overflow-hidden border-2 border-yellow-400 shadow-lg">
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=100" alt="Me" className="w-full h-full object-cover" />
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <header className="px-5 py-3 flex items-center justify-between border-b dark:border-white/5 border-black/5 shrink-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tighter dark:text-white text-black uppercase">AURA<span className="text-yellow-400">.</span></h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-40">
                <Globe size={10} />
                Node: <span className="text-yellow-400">Connected</span>
              </div>
              <button 
                onClick={toggleTheme} 
                className={`hidden lg:block p-2 rounded-lg transition-all ${isDark ? 'opacity-40 hover:opacity-100 dark:text-white' : 'bg-black text-white shadow-lg'}`}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-hidden dash-view bg-slate-50 dark:bg-black">
            <div className="max-w-4xl mx-auto h-full px-4 lg:px-6 relative">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </PremiumContext.Provider>
  );
};

export default DashboardLayout;
