
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
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [activePhotoEditIdx, setActivePhotoEditIdx] = useState<number | null>(null);

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
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
      ]
    };

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure photos are present even if quota was hit
        if (!parsed.photos || parsed.photos.length === 0) {
          parsed.photos = defaultData.photos;
        }
        setMyData(parsed);
        setEditForm(parsed);
      } catch (e) {
        setMyData(defaultData);
        setEditForm(defaultData);
      }
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

  const triggerPhotoUpload = (idx: number) => {
    setActivePhotoEditIdx(idx);
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activePhotoEditIdx !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Update both editForm and myData if necessary, or just sync back
        const newPhotos = [...(editForm.photos || [])];
        newPhotos[activePhotoEditIdx] = result;
        
        const updated = { ...editForm, photos: newPhotos };
        setEditForm(updated);
        setMyData(updated);
        localStorage.setItem('aura_user_profile', JSON.stringify(updated));
        setActivePhotoEditIdx(null);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!myData || !editForm) return null;

  return (
    <div ref={profileRef} className="h-full overflow-y-auto no-scrollbar p-4 lg:p-10 space-y-10 pb-32 max-w-5xl mx-auto">
      <input 
        type="file" 
        ref={photoInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handlePhotoChange} 
      />

      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase dark:text-white text-black">
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
                <button onClick={() => navigate('/dashboard/settings')} className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all dark:text-white text-black">
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
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4 dark:text-white text-black">Resonance Visuals</h4>
              <div className="grid grid-cols-2 gap-3">
                 {myData.photos?.slice(0, 4).map((photo: string, idx: number) => (
                   <div key={idx} onClick={() => triggerPhotoUpload(idx)} className="aspect-square relative group rounded-2xl overflow-hidden shadow-xl border-2 dark:border-white/10 border-black/5 bg-black/5 cursor-pointer">
                      <img src={photo} className="w-full h-full object-cover" alt={`Resonance ${idx + 1}`} />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload size={20} className="text-yellow-400 mb-2" />
                        <span className="text-[7px] font-black uppercase text-white">Change Visual</span>
                      </div>
                   </div>
                 ))}
                 {[...Array(Math.max(0, 4 - (myData.photos?.length || 0)))].map((_, idx) => {
                    const realIdx = (myData.photos?.length || 0) + idx;
                    return (
                      <div key={`empty-${idx}`} onClick={() => triggerPhotoUpload(realIdx)} className="aspect-square rounded-2xl border-2 border-dashed border-yellow-400/20 bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 transition-all">
                         <Upload size={16} className="opacity-20 text-yellow-400 mb-2" />
                         <span className="text-[6px] font-black uppercase opacity-20">Add Signal</span>
                      </div>
                    );
                 })}
              </div>
           </div>

           {!isPremium && !isEditing && (
             <div className="p-8 bg-yellow-400 rounded-2xl shadow-xl shadow-yellow-400/20 relative overflow-hidden group">
                <Sparkles className="absolute -top-6 -right-6 text-black opacity-10 scale-[3] group-hover:rotate-45 transition-transform duration-1000" />
                <div className="relative z-10">
                   <h4 className="text-2xl font-black text-black leading-tight">Elevate your reach.</h4>
                   <p className="text-black/60 text-[10px] font-bold mt-2 uppercase tracking-widest">Join Elite for unlimited resonance.</p>
                   <button onClick={openUpgrade} className="mt-6 w-full bg-black text-white py-4 rounded-xl font-black text-[10px] tracking-widest uppercase hover:scale-105 transition-all">Go Premium</button>
                </div>
             </div>
           )}
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-2xl border border-black/5 dark:border-white/5 space-y-10 shadow-sm">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 opacity-30">
                    <Info size={12} className="dark:text-white text-black" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white text-black">Soul Narrative</h4>
                 </div>
                 {isEditing ? (
                   <textarea 
                     rows={4} 
                     value={editForm.bio} 
                     onChange={e => setEditForm({...editForm, bio: e.target.value})} 
                     className="w-full p-6 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl outline-none focus:border-yellow-400 italic text-sm dark:text-white transition-all"
                   />
                 ) : (
                   <p className="text-xl italic font-light leading-snug dark:text-white text-black">"{myData.bio}"</p>
                 )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 dark:text-white text-black">Identity Node</h4>
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
                         </>
                       ) : (
                         <>
                           <div className="flex items-center gap-3 text-sm font-bold opacity-70 dark:text-white text-black"><Briefcase size={16} className="text-yellow-400" /> {myData.role}</div>
                           <div className="flex items-center gap-3 text-sm font-bold opacity-70 dark:text-white text-black"><MapPin size={16} className="text-yellow-400" /> {myData.location}</div>
                         </>
                       )}
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-black dark:bg-zinc-800 text-white rounded-2xl relative overflow-hidden group border dark:border-white/5">
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