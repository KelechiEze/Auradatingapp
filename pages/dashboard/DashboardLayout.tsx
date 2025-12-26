
import React, { useEffect, useContext, useMemo, useState, createContext, useRef } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { Heart, Users, Star, MessageSquare, User, Sparkles, LogOut, Settings, Globe, Radio, X, Check, Zap, Crown, Shield } from 'lucide-react';
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
      features: ['150 Daily Resonance Pulses', 'See who Liked You', 'Standard Global Range']
    },
    { 
      id: 'semi', 
      name: 'Atmospheric', 
      price: '$49.99', 
      period: '/ 6 mo', 
      desc: 'High frequency', 
      popular: true,
      swipes: '500 Swipes / Day',
      features: ['500 Daily Resonance Pulses', 'See who Liked You', 'Priority Global Node', '10 Monthly Soul Gifts']
    },
    { 
      id: 'annual', 
      name: 'Infinite Soul', 
      price: '$79.99', 
      period: '/ yr', 
      desc: 'Ultimate reach',
      swipes: '1000-2000 Swipes / Day',
      features: ['1000-2000 Daily Resonance Pulses', 'Infinite Soul Mapping', 'Instant Sync Priority', 'Unlimited Soul Gifts', 'Concierge Support']
    },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];

  return (
    <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10">
      <div 
        ref={modalContainerRef} 
        className="w-full max-w-3xl bg-white dark:bg-black rounded-[40px] md:rounded-[60px] max-h-[90vh] overflow-y-auto no-scrollbar border dark:border-white/10 border-black/5 shadow-2xl relative"
      >
        <div className="p-8 lg:p-16">
          <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all z-50">
            <X size={24} />
          </button>

          <div className="text-center space-y-6 mb-12">
            <div className="w-20 h-20 bg-yellow-400 text-black rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-yellow-400/30 ring-8 ring-yellow-400/10">
              <Crown size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">UPGRADE <br />FREQUENCIES.</h2>
              <p className="text-black/40 dark:text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">Select your resonance level in USD</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {plans.map((plan) => (
              <button 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-[32px] border-2 transition-all text-left relative flex flex-col justify-between h-full ${selectedPlan === plan.id ? 'border-yellow-400 bg-yellow-400/5' : 'border-black/5 dark:border-white/5 opacity-60 hover:opacity-100'}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Popular</span>
                )}
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest mb-2">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-black">{plan.price}</span>
                    <span className="text-[10px] font-bold opacity-40">{plan.period}</span>
                  </div>
                </div>
                <p className="text-[9px] font-medium opacity-40 leading-tight mt-4">{plan.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[40px] border border-black/5 dark:border-white/10 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-yellow-400" size={20} />
              <h3 className="text-xs font-black uppercase tracking-[0.3em]">{currentPlan.name} Benefits</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="flex items-center gap-4 text-sm font-bold text-yellow-500">
                <div className="w-5 h-5 bg-yellow-400/20 rounded-full flex items-center justify-center shrink-0">
                  <Star size={12} fill="currentColor" />
                </div>
                {currentPlan.swipes}
              </div>
              {currentPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold opacity-70">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => { alert('Transaction initiated for ' + currentPlan.price); onClose(); }}
              className="w-full bg-yellow-400 text-black py-7 rounded-3xl font-black text-xl tracking-widest uppercase shadow-2xl shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              SYNC {currentPlan.name.split(' ')[0]} NOW
            </button>
            <div className="flex items-center justify-center gap-4 opacity-20">
              <Shield size={12} />
              <span className="text-[8px] font-black uppercase tracking-widest">Secure USD Transaction • Encrypted Gate</span>
            </div>
          </div>
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

  const unreadCount = 3;

  const navItems = useMemo(() => [
    { label: 'Discover', icon: Heart, path: '/dashboard' },
    { label: 'People', icon: Users, path: '/dashboard/people' },
    { label: 'Liked You', icon: Star, path: '/dashboard/liked' },
    { label: 'Profile', icon: User, path: '/dashboard/profile' },
    { label: 'Chats', icon: MessageSquare, path: '/dashboard/chats', badge: unreadCount },
  ], [unreadCount]);

  useEffect(() => {
    gsap.fromTo('.dash-view', 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [location.pathname]);

  const value = {
    isPremium,
    openUpgrade: () => setShowUpgrade(true),
  };

  return (
    <PremiumContext.Provider value={value}>
      <div className="flex h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
        
        <aside className="hidden lg:flex flex-col w-80 border-r dark:border-white/10 border-black/5 p-8 shrink-0 bg-slate-50 dark:bg-black">
          <div className="mb-12 flex items-center gap-3">
            <div className="bg-yellow-400 p-2.5 rounded-2xl shadow-lg shadow-yellow-400/20">
              <Radio className="text-black" size={24} strokeWidth={3} />
            </div>
            <span className="text-3xl font-black tracking-tighter dark:text-white text-black">AURA<span className="text-yellow-400">.</span></span>
          </div>

          <nav className="flex-1 space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
              return (
                <NavLink 
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest relative ${isActive ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'opacity-40 hover:opacity-100 dark:text-white text-black hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <item.icon size={20} fill={isActive ? "currentColor" : "none"} />
                  {item.label}
                  {item.badge && !isActive && (
                    <div className="absolute right-4 w-6 h-6 bg-yellow-400 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-white dark:border-black">
                      {item.badge}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t dark:border-white/5 border-black/5 space-y-4">
            <Link 
              to="/dashboard/settings"
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest ${location.pathname === '/dashboard/settings' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'opacity-40 hover:opacity-100 dark:text-white text-black'}`}
            >
              <Settings size={20} />
              Settings
            </Link>
            
            {!isPremium && (
              <div className="p-6 bg-yellow-400/10 rounded-3xl border border-yellow-400/20">
                <div className="flex items-center gap-2 mb-2 text-yellow-400">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Aura Premium</span>
                </div>
                <p className="text-xs font-bold opacity-60 leading-relaxed mb-4">Unlimited resonance pulses.</p>
                <button onClick={() => setShowUpgrade(true)} className="w-full bg-yellow-400 text-black py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-yellow-400/20 hover:scale-105 transition-all">Upgrade Frequency</button>
              </div>
            )}
            
            <Link to="/" className="flex items-center gap-4 px-6 py-3 opacity-30 hover:opacity-100 transition-opacity font-black text-xs uppercase tracking-widest">
              <LogOut size={18} />
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <header className="px-6 py-4 lg:py-8 flex items-center justify-between border-b dark:border-white/5 border-black/5 shrink-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            <div className="lg:hidden flex items-center gap-2">
              <Radio className="text-yellow-400" size={24} strokeWidth={3} />
              <h1 className="text-2xl font-black tracking-tighter dark:text-white text-black">AURA<span className="text-yellow-400">.</span></h1>
            </div>
            <div className="hidden lg:block">
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-40">
                  <Globe size={14} />
                  Global Node: <span className="text-yellow-400">Active</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 dark:text-white text-black opacity-40 hover:opacity-100 transition-opacity">
                {isDark ? <Sparkles size={20} /> : <Crown size={20} />}
              </button>
              <Link to="/dashboard/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
                <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=100" alt="Me" className="w-full h-full object-cover" />
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar dash-view">
            <div className="max-w-5xl mx-auto h-full">
              <Outlet />
            </div>
          </div>

          <nav className="lg:hidden shrink-0 h-24 dark:bg-black/90 bg-white/90 backdrop-blur-2xl border-t dark:border-white/10 border-black/5 px-4 flex items-center justify-around z-30">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
              return (
                <NavLink 
                  key={item.label}
                  to={item.path}
                  className="flex flex-col items-center gap-1 group relative py-2"
                >
                  <div className={`relative transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'opacity-40'}`}>
                    <item.icon 
                      size={24} 
                      className={isActive ? 'text-yellow-400' : 'dark:text-white text-black'} 
                      fill={isActive ? "currentColor" : "none"}
                      strokeWidth={isActive ? 3 : 2}
                    />
                    {isActive && <div className="absolute -inset-2 bg-yellow-400/20 blur-lg rounded-full -z-10"></div>}
                    {item.badge && !isActive && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-black text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-black animate-pulse">
                        {item.badge}
                      </div>
                    )}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-yellow-400 opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </PremiumContext.Provider>
  );
};

export default DashboardLayout;
