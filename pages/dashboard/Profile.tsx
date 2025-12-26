
import React, { useContext, useEffect, useState } from 'react';
import { Settings, Edit2, ShieldCheck, Star, Heart, MapPin, Briefcase, GraduationCap, Phone, Zap, Globe, Sparkles, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { PremiumContext } from './DashboardLayout';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const { isPremium, openUpgrade } = useContext(PremiumContext);
  const [myData, setMyData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('aura_user_profile');
    if (savedData) {
      setMyData(JSON.parse(savedData));
    } else {
      setMyData({
        name: "Sarah",
        age: 26,
        phone: "+234 901 000 0000",
        role: "UX Designer",
        education: "Unilag 2019",
        location: "Lagos, Nigeria",
        intent: "Serious relationship",
        commitment: "Very important",
        traits: ["Creative", "Introverted", "Romantic"],
        weekend: "Exploring new places",
        drinks: "Sometimes",
        smokes: "No",
        values: ["Growth", "Honesty", "Family"],
        languages: ["English", "French", "Yoruba"],
        belief: "Spiritual",
        children: "Want someday",
        relocate: "Maybe",
        essentials: ["Music", "Travel", "Faith"],
        bio: "I love deep conversations, spontaneous trips, and people who can make me laugh. Looking for my partner in crime.",
        prompt: "Consistency and kindness."
      });
    }
  }, []);

  if (!myData) return null;

  return (
    <div className="p-6 lg:p-12 space-y-12 pb-32">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">PROFILE.</h2>
            {isPremium && (
              <div className="px-4 py-1.5 bg-yellow-400 text-black rounded-full flex items-center gap-2 shadow-lg shadow-yellow-400/20">
                <Crown size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Signal</span>
              </div>
            )}
         </div>
         <div className="flex gap-4">
           <button 
             onClick={() => navigate('/dashboard/settings')}
             className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
           >
             <Settings size={24} />
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT PANEL */}
        <div className="lg:col-span-5 space-y-8">
           <div className="relative group">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-4 border-yellow-400 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                 <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800" alt="Me" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black text-white dark:bg-white dark:text-black px-10 py-5 rounded-[24px] font-black text-xs tracking-widest uppercase flex items-center gap-3 shadow-2xl hover:scale-110 active:scale-95 transition-all">
                 <Edit2 size={16} />
                 Edit Presence
              </button>
           </div>

           <div className="pt-8 text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                 <h3 className="text-4xl font-black tracking-tighter">{myData.name}{myData.age ? `, ${myData.age}` : ''}</h3>
                 <ShieldCheck size={32} className="text-yellow-400" />
              </div>
              <p className="opacity-40 font-black uppercase tracking-[0.4em] text-[10px]">Frequency Verified Member</p>
           </div>

           {!isPremium && (
             <div className="p-8 bg-yellow-400 rounded-[40px] space-y-4 shadow-xl shadow-yellow-400/20 relative overflow-hidden group">
                <Sparkles className="absolute -top-6 -right-6 text-black/10 scale-[2.5] group-hover:rotate-45 transition-transform duration-1000" />
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2 text-black">
                      <Crown size={20} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Aura Elite</span>
                   </div>
                   <h4 className="text-2xl font-black text-black leading-tight">Elevate your resonance globally.</h4>
                   <p className="text-black/60 text-xs font-bold mt-2">Unlock unlimited pulses and call signals for $9.99/mo.</p>
                   <button 
                     onClick={openUpgrade}
                     className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                   >
                     Upgrade Now
                   </button>
                </div>
             </div>
           )}

           <div className="grid grid-cols-3 gap-4">
               <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[40px] text-center space-y-2 border border-black/5 dark:border-white/10 group hover:border-yellow-400 transition-colors">
                  <Heart size={20} className="mx-auto text-yellow-400" fill="currentColor" />
                  <div className="text-2xl font-black tracking-tighter">1.2k</div>
                  <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Resonances</div>
               </div>
               <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[40px] text-center space-y-2 border border-black/5 dark:border-white/10 group hover:border-yellow-400 transition-colors">
                  <Zap size={20} className="mx-auto text-yellow-400" fill="currentColor" />
                  <div className="text-2xl font-black tracking-tighter">84%</div>
                  <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Match Strength</div>
               </div>
               <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[40px] text-center space-y-2 border border-black/5 dark:border-white/10 group hover:border-yellow-400 transition-colors">
                  <Globe size={20} className="mx-auto text-yellow-400" />
                  <div className="text-2xl font-black tracking-tighter">9k</div>
                  <div className="text-[8px] font-black opacity-30 uppercase tracking-widest">Orbit Range</div>
               </div>
           </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[40px] border border-black/5 dark:border-white/10 space-y-8">
              <div className="space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest opacity-40">The Narrative</h4>
                 <p className="text-2xl italic font-light leading-snug">"{myData.bio || "Sharing my soul through global resonance..."}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">Identity Resonance</h4>
                    <div className="space-y-3">
                       <div className="flex items-center gap-3 text-sm font-bold opacity-70"><Phone size={16} className="text-yellow-400" /> {myData.phone || "N/A"}</div>
                       <div className="flex items-center gap-3 text-sm font-bold opacity-70"><MapPin size={16} className="text-yellow-400" /> {myData.location || "Global"}</div>
                       <div className="flex items-center gap-3 text-sm font-bold opacity-70"><Briefcase size={16} className="text-yellow-400" /> {myData.role || "Soul"}</div>
                       <div className="flex items-center gap-3 text-sm font-bold opacity-70"><GraduationCap size={16} className="text-yellow-400" /> {myData.education || "Life Experience"}</div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">Intent & Future</h4>
                    <div className="space-y-3">
                       <div className="text-sm font-black text-yellow-500 uppercase">💍 {myData.intent}</div>
                       <div className="text-sm font-bold opacity-70">Commitment: {myData.commitment}</div>
                       <div className="text-sm font-bold opacity-70">Children: {myData.children}</div>
                       <div className="text-sm font-bold opacity-70">Relocation: {myData.relocate}</div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t dark:border-white/5 border-black/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">Vibe & Lifestyle</h4>
                    <div className="flex flex-wrap gap-2">
                       {(myData.traits || []).map((t: string) => <span key={t} className="px-3 py-1 bg-yellow-400 text-black rounded-full text-[8px] font-black uppercase tracking-widest">{t}</span>)}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">Values & Culture</h4>
                    <div className="flex flex-wrap gap-2">
                       {(myData.values || []).map((v: string) => <span key={v} className="px-3 py-1 border border-current rounded-full text-[8px] font-black uppercase tracking-widest">{v}</span>)}
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-black dark:bg-white text-white dark:text-black rounded-[40px] relative overflow-hidden group">
                 <Sparkles className="absolute top-4 right-4 text-yellow-400 opacity-20 group-hover:scale-150 transition-transform duration-1000" size={64} />
                 <h5 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3 italic">"The quickest way to my heart is..."</h5>
                 <p className="text-2xl font-black tracking-tighter leading-none italic">"{myData.prompt}"</p>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30">Essential Frequency</h4>
                 <div className="grid grid-cols-3 gap-2">
                    {(myData.essentials || ["Authenticity", "Adventure", "Respect"]).map((e: string) => (
                       <div key={e} className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 text-center text-[10px] font-black uppercase tracking-widest">{e}</div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
