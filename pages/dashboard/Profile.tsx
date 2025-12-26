
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Settings, Edit2, ShieldCheck, Star, Heart, MapPin, Briefcase, GraduationCap, Phone, Zap, Globe, Sparkles, Crown, Upload, Save, X, Info, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ThemeContext } from '../../App';
import { PremiumContext } from './DashboardLayout';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const { isPremium, openUpgrade } = useContext(PremiumContext);
  const [myData, setMyData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('aura_user_profile');
    const defaultData = {
      name: "Sarah",
      age: 26,
      phone: "+234 901 000 0000",
      role: "UX Designer",
      education: "Visual Arts Degree",
      location: "Lagos, Nigeria",
      intent: "Serious relationship",
      lookingFor: 'Men',
      traits: ["Creative", "Introverted", "Romantic"],
      weekend: "Exploring new places",
      drinks: "Sometimes",
      smokes: "No",
      values: ["Growth", "Honesty", "Loyalty"],
      languages: ["English", "French"],
      belief: "Spiritual",
      children: "Want someday",
      relocate: "Maybe",
      essentials: ["Music", "Travel", "Faith"],
      bio: "I love deep conversations, spontaneous trips, and people who can make me laugh. Looking for my partner in crime.",
      prompt: "Consistency and kindness are my love languages.",
      photos: [
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
      ]
    };

    if (savedData) {
      setMyData(JSON.parse(savedData));
      setEditForm(JSON.parse(savedData));
    } else {
      setMyData(defaultData);
      setEditForm(defaultData);
    }
  }, []);

  useEffect(() => {
    if (profileRef.current) {
      gsap.fromTo(profileRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [isEditing]);

  const handleSave = () => {
    setMyData(editForm);
    localStorage.setItem('aura_user_profile', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const toggleItem = (field: string, item: string) => {
    const current = editForm[field] || [];
    if (current.includes(item)) {
      setEditForm({ ...editForm, [field]: current.filter((i: string) => i !== item) });
    } else {
      setEditForm({ ...editForm, [field]: [...current, item] });
    }
  };

  if (!myData || !editForm) return null;

  return (
    <div ref={profileRef} className="p-4 lg:p-10 space-y-10 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase dark:text-white">
              {isEditing ? 'SYNC IDENTITY.' : 'PROFILE.'}
            </h2>
            {isPremium && (
              <div className="px-3 py-1 bg-yellow-400 text-black rounded-full flex items-center gap-2 shadow-lg">
                <Crown size={12} fill="currentColor" />
                <span className="text-[8px] font-black uppercase tracking-widest">Elite Member</span>
              </div>
            )}
         </div>
         <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <X size={20} />
                </button>
                <button onClick={handleSave} className="px-6 h-12 bg-yellow-400 text-black rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                  <Save size={16} /> Save Sync
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="w-12 h-12 bg-yellow-400 text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => navigate('/dashboard/settings')} className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all dark:text-white">
                  <Settings size={20} />
                </button>
              </>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Photos Column */}
        <div className="lg:col-span-5 space-y-8">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4 dark:text-white">Resonance Visuals</h4>
              <div className="grid grid-cols-2 gap-3">
                 <div className="aspect-[3/4] col-span-2 relative group rounded-[40px] overflow-hidden border-4 border-yellow-400 shadow-2xl bg-black/5">
                    <img src={myData.photos?.[0]} className="w-full h-full object-cover" />
                    <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-yellow-400 hover:text-black transition-all"><Upload size={16} /></button>
                 </div>
                 <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-xl border-2 dark:border-white/10 bg-black/5">
                    <img src={myData.photos?.[1]} className="w-full h-full object-cover" />
                    <button className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload size={16} className="text-white" /></button>
                 </div>
                 <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-xl border-2 dark:border-white/10 bg-black/5">
                    <img src={myData.photos?.[2]} className="w-full h-full object-cover" />
                    <button className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload size={16} className="text-white" /></button>
                 </div>
              </div>
           </div>

           <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2">
                 {isEditing ? (
                   <div className="flex items-center gap-2">
                     <input 
                       value={editForm.name} 
                       onChange={e => setEditForm({...editForm, name: e.target.value})} 
                       className="bg-transparent border-b-2 border-yellow-400 outline-none text-2xl font-black tracking-tighter dark:text-white text-center w-32"
                     />
                     <span className="text-2xl font-black">,</span>
                     <input 
                       type="number"
                       value={editForm.age} 
                       onChange={e => setEditForm({...editForm, age: parseInt(e.target.value)})} 
                       className="bg-transparent border-b-2 border-yellow-400 outline-none text-2xl font-black tracking-tighter dark:text-white text-center w-16"
                     />
                   </div>
                 ) : (
                   <h3 className="text-3xl font-black tracking-tighter dark:text-white">{myData.name}, {myData.age}</h3>
                 )}
                 <ShieldCheck size={24} className="text-yellow-400" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40 dark:text-white">Active Resonance Identity</p>
           </div>

           {!isPremium && !isEditing && (
             <div className="p-8 bg-yellow-400 rounded-[40px] shadow-xl shadow-yellow-400/20 relative overflow-hidden group">
                <Sparkles className="absolute -top-6 -right-6 text-black/10 scale-[2.5] group-hover:rotate-45 transition-transform duration-1000" />
                <div className="relative z-10">
                   <h4 className="text-2xl font-black text-black leading-tight">Elevate your reach.</h4>
                   <p className="text-black/60 text-[10px] font-bold mt-2 uppercase tracking-widest">Join Elite for unlimited resonance.</p>
                   <button onClick={openUpgrade} className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:scale-105 transition-all">Go Premium</button>
                </div>
             </div>
           )}
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-[40px] border border-black/5 dark:border-white/5 space-y-10 shadow-sm">
              
              {/* Bio Section */}
              <div className="space-y-4">
                 <div className="flex items-center gap-2 opacity-30">
                    <Info size={12} className="dark:text-white" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white">Soul Narrative</h4>
                 </div>
                 {isEditing ? (
                   <textarea 
                     rows={4} 
                     value={editForm.bio} 
                     onChange={e => setEditForm({...editForm, bio: e.target.value})} 
                     className="w-full p-6 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-[24px] outline-none focus:border-yellow-400 italic text-sm dark:text-white transition-all"
                   />
                 ) : (
                   <p className="text-xl italic font-light leading-snug dark:text-white">"{myData.bio}"</p>
                 )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 dark:text-white">Identity Node</h4>
                    <div className="space-y-4">
                       {isEditing ? (
                         <>
                           <div className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-xl border dark:border-white/5">
                             <Briefcase size={14} className="text-yellow-400" />
                             <input value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} placeholder="Role" className="bg-transparent outline-none text-xs font-bold dark:text-white w-full" />
                           </div>
                           <div className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-xl border dark:border-white/5">
                             <MapPin size={14} className="text-yellow-400" />
                             <input value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} placeholder="Location" className="bg-transparent outline-none text-xs font-bold dark:text-white w-full" />
                           </div>
                           <div className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-xl border dark:border-white/5">
                             <GraduationCap size={14} className="text-yellow-400" />
                             <input value={editForm.education} onChange={e => setEditForm({...editForm, education: e.target.value})} placeholder="Education" className="bg-transparent outline-none text-xs font-bold dark:text-white w-full" />
                           </div>
                         </>
                       ) : (
                         <>
                           <div className="flex items-center gap-3 text-sm font-bold opacity-70 dark:text-white"><Briefcase size={16} className="text-yellow-400" /> {myData.role}</div>
                           <div className="flex items-center gap-3 text-sm font-bold opacity-70 dark:text-white"><MapPin size={16} className="text-yellow-400" /> {myData.location}</div>
                           <div className="flex items-center gap-3 text-sm font-bold opacity-70 dark:text-white"><GraduationCap size={16} className="text-yellow-400" /> {myData.education}</div>
                         </>
                       )}
                    </div>
                 </div>
                 <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 dark:text-white">Sync Parameters</h4>
                    <div className="space-y-3">
                       {isEditing ? (
                         <select 
                           value={editForm.intent} 
                           onChange={e => setEditForm({...editForm, intent: e.target.value})} 
                           className="w-full p-4 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-xl outline-none font-black text-[10px] uppercase tracking-widest text-yellow-500"
                         >
                           {['Serious relationship', 'Marriage-minded', 'Casual discovery', 'Friendship orbit'].map(i => <option key={i} value={i}>{i}</option>)}
                         </select>
                       ) : (
                         <div className="text-sm font-black text-yellow-500 uppercase tracking-widest">💍 {myData.intent}</div>
                       )}
                       <div className="text-[10px] font-black uppercase dark:text-white/60 tracking-widest">Preference: {myData.lookingFor}</div>
                    </div>
                 </div>
              </div>

              {/* Vibe Spectrum Tags */}
              <div className="pt-10 border-t dark:border-white/10 border-black/5">
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-5 dark:text-white">Aura Traits</h4>
                 <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                      ['Funny', 'Calm', 'Adventurous', 'Romantic', 'Ambitious', 'Creative', 'Intellectual', 'Spiritual'].map(t => (
                        <button 
                          key={t} 
                          onClick={() => toggleItem('traits', t)} 
                          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${editForm.traits.includes(t) ? 'bg-yellow-400 border-yellow-400 text-black shadow-md' : 'border-black/10 dark:border-white/10 dark:text-white/40 opacity-50'}`}
                        >
                          {t}
                        </button>
                      ))
                    ) : (
                      (myData.traits || []).map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-yellow-400 text-black rounded-full text-[9px] font-black uppercase tracking-widest">{t}</span>
                      ))
                    )}
                 </div>
              </div>

              {/* Core Values */}
              <div className="pt-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-5 dark:text-white">Core Values</h4>
                 <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                      ['Honesty', 'Growth', 'Independence', 'Loyalty', 'Kindness', 'Ambition', 'Compassion'].map(v => (
                        <button 
                          key={v} 
                          onClick={() => toggleItem('values', v)} 
                          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${editForm.values.includes(v) ? 'bg-black dark:bg-white dark:text-black text-white' : 'border-black/10 dark:border-white/10 dark:text-white/40 opacity-50'}`}
                        >
                          {v}
                        </button>
                      ))
                    ) : (
                      (myData.values || []).map((v: string) => (
                        <span key={v} className="px-4 py-2 border dark:border-white/20 border-black/10 dark:text-white rounded-full text-[9px] font-black uppercase tracking-widest">{v}</span>
                      ))
                    )}
                 </div>
              </div>

              {/* Prompt Section */}
              <div className="p-8 bg-black dark:bg-zinc-800 text-white rounded-[40px] relative overflow-hidden group border dark:border-white/5">
                 <MessageSquare className="absolute top-4 right-4 text-yellow-400 opacity-20 group-hover:rotate-12 transition-all duration-1000" size={64} />
                 <h5 className="text-[8px] font-black uppercase tracking-[0.4em] opacity-50 mb-4 italic">Signal Pulse Prompt</h5>
                 {isEditing ? (
                   <input 
                    value={editForm.prompt} 
                    onChange={e => setEditForm({...editForm, prompt: e.target.value})} 
                    placeholder="Enter your resonance trigger..."
                    className="w-full bg-transparent border-b border-yellow-400/30 py-2 outline-none text-2xl font-black tracking-tighter italic text-yellow-400 placeholder:opacity-20"
                   />
                 ) : (
                   <p className="text-2xl font-black tracking-tighter leading-tight italic">"{myData.prompt}"</p>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
