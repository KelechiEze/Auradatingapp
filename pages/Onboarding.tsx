import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { 
  ArrowRight, ArrowLeft, Heart, Sparkles, Shield, User, MapPin, 
  Upload, Navigation, X, Loader2, GraduationCap, Info, MessageSquare
} from 'lucide-react';
import { ThemeContext } from '../App';

type Step = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
};

const STEPS: Step[] = [
  { id: 1, title: "Identity", subtitle: "The Foundation", category: "BASIC" },
  { id: 2, title: "Intent", subtitle: "Relationship Goals", category: "GOALS" },
  { id: 3, title: "Resonance", subtitle: "Your Aura Preferences", category: "ORBIT" },
  { id: 4, title: "Personality", subtitle: "Lifestyle & Vibe", category: "VIBE" },
  { id: 5, title: "Values", subtitle: "Beliefs & Principles", category: "VALUES" },
  { id: 6, title: "Expression", subtitle: "Personal Aura", category: "AURA" },
  { id: 7, title: "Visuals", subtitle: "Quad Presence", category: "MEDIA" },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [locLoading, setLocLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [activeUploadIdx, setActiveUploadIdx] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', age: 25, dob: '', gender: 'Man', phone: '', role: 'Visionary', education: '', location: '',
    intent: 'Serious relationship', commitment: 'Very important',
    lookingFor: 'Women', // Men, Women, Everyone
    ageRange: [18, 50],
    traits: [] as string[], weekend: 'Exploring', drinks: 'Sometimes', smokes: 'No',
    values: [] as string[], languages: [] as string[], belief: 'Spiritual',
    children: 'Want someday', relocate: 'Maybe',
    essentials: [] as string[], bio: '', prompt: '',
    photos: ['', '', '', ''], verified: true 
  });

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  useEffect(() => {
    gsap.fromTo(stepRef.current, 
      { x: 30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [currentStep]);

  useEffect(() => {
    if (isCreating && loadingRef.current) {
      gsap.fromTo(loadingRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [isCreating]);

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (formData.photos.filter(p => !!p).length < 4) {
        alert("Please upload all 4 images to synchronize your presence.");
        return;
      }
      
      // Simulated Account Creation - 8 Second Spinner
      setIsCreating(true);
      
      setTimeout(() => {
        // Save to localStorage before navigating
        localStorage.setItem('aura_user_profile', JSON.stringify(formData));
        navigate('/otp');
      }, 8000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/auth');
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMulti = (field: string, item: string) => {
    const current = (formData as any)[field] as string[];
    if (current.includes(item)) {
      updateField(field, current.filter(i => i !== item));
    } else {
      updateField(field, [...current, item]);
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateField('location', `Detected: Lagos, NG`);
        setLocLoading(false);
      },
      () => setLocLoading(false)
    );
  };

  const OptionBtn = ({ active, onClick, children }: any) => (
    <button
      onClick={onClick}
      className={`interactive px-8 py-5 rounded-2xl border transition-all text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-3 ${
        active 
          ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
          : 'dark:bg-white/5 bg-white dark:border-white/10 border-black/5 dark:text-white/60 text-black/60 hover:border-yellow-400'
      }`}
    >
      {children}
    </button>
  );

  const triggerUpload = (index: number) => {
    setActiveUploadIdx(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadIdx !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...formData.photos];
        newPhotos[activeUploadIdx] = reader.result as string;
        updateField('photos', newPhotos);
        setActiveUploadIdx(null);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isCreating) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black bg-white px-6">
        <div ref={loadingRef} className="max-w-md w-full text-center space-y-8">
           <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400/20 flex items-center justify-center">
                 <Loader2 className="text-yellow-400 animate-spin" size={48} />
              </div>
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
           </div>
           <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tighter uppercase dark:text-white leading-none">SYNCHRONIZING ORBIT.</h2>
              <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40 animate-pulse dark:text-white">Creating account for user...</p>
           </div>
           <div className="pt-10 flex flex-col gap-2">
              <div className="h-1 bg-yellow-400/10 rounded-full overflow-hidden w-48 mx-auto">
                 <div className="h-full bg-yellow-400 animate-[progress_3s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest opacity-20 dark:text-white">Initializing global resonance mapping</span>
           </div>
        </div>
        <style>{`
          @keyframes progress {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 50%; transform: translateX(0%); }
            100% { width: 0%; transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-20 pb-20 px-6 dark:bg-black bg-white transition-colors duration-700 flex flex-col items-center justify-center">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      <div className="max-w-4xl w-full mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="bg-yellow-400 p-2 rounded-xl shadow-lg">
                <Heart className="text-black fill-black" size={20} />
             </div>
             <div>
                <h1 className="text-xl font-black tracking-tighter dark:text-white text-black">AURA JOURNEY</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 dark:text-white text-black">Step {currentStep} of 7 • {STEPS[currentStep - 1].category}</p>
             </div>
          </div>
          <button onClick={() => navigate('/')} className="interactive text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity dark:text-white text-black">Abort Sync</button>
        </div>
        <div className="w-full h-1.5 bg-yellow-400/10 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 transition-all duration-700 ease-out" style={{ width: `${(currentStep / 7) * 100}%` }} />
        </div>
      </div>

      <div ref={stepRef} className="max-w-2xl w-full bg-slate-50 dark:bg-zinc-900 p-12 rounded-[24px] border border-black/5 dark:border-white/10 shadow-2xl">
        <div className="mb-10">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-none dark:text-white text-black">{STEPS[currentStep - 1].title}.</h2>
            <p className="dark:text-white/40 text-black/40 text-lg font-light italic">"{STEPS[currentStep - 1].subtitle}"</p>
        </div>

        <div className="space-y-10 min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">1. Essence Name</label>
                <input value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="E.g. Julian" className="w-full py-5 px-8 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">Age</label>
                  <input type="number" value={formData.age} onChange={e => updateField('age', parseInt(e.target.value))} className="w-full py-5 px-8 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg dark:text-white" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">Education</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 text-yellow-400" size={18} />
                    <input value={formData.education} onChange={e => updateField('education', e.target.value)} placeholder="Degree/Uni" className="w-full py-5 px-16 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg dark:text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">2. Identity Origin (Gender)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Man', 'Woman', 'Non-binary', 'Fluid'].map(g => (
                    <OptionBtn key={g} active={formData.gender === g} onClick={() => updateField('gender', g)}>{g}</OptionBtn>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">3. Primary Signal (Location)</label>
                <div className="relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-yellow-400" size={18} />
                  <input value={formData.location} onChange={e => updateField('location', e.target.value)} placeholder="City, Country" className="w-full py-5 px-16 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg dark:text-white" />
                  <button onClick={handleGeoLocation} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-yellow-400 text-black rounded-xl hover:scale-105 active:scale-95 transition-all"><Navigation size={16} /></button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">4. Connection Intent</label>
                <div className="grid grid-cols-1 gap-3">
                  {['Serious relationship', 'Marriage-minded', 'Casual discovery', 'Friendship orbit'].map(i => (
                    <OptionBtn key={i} active={formData.intent === i} onClick={() => updateField('intent', i)}>{i}</OptionBtn>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">5. Seeking Resonance From</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   {['Men', 'Women', 'Everyone'].map(pref => (
                     <OptionBtn key={pref} active={formData.lookingFor === pref} onClick={() => updateField('lookingFor', pref)}>{pref}</OptionBtn>
                   ))}
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">6. Ideal Frequency Range (Age)</label>
                <div className="p-8 bg-black/5 dark:bg-white/5 rounded-3xl space-y-4 border dark:border-white/5">
                   <div className="flex justify-between font-black text-sm dark:text-white">
                      <span>{formData.ageRange[0]}</span>
                      <span className="text-yellow-400 tracking-widest">YEARS</span>
                      <span>{formData.ageRange[1]}</span>
                   </div>
                   <input 
                     type="range" min="18" max="80" 
                     value={formData.ageRange[1]} 
                     onChange={e => updateField('ageRange', [18, parseInt(e.target.value)])}
                     className="w-full h-1.5 bg-yellow-400/20 accent-yellow-400 rounded-full" 
                   />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">7. Vibe Tags</label>
                <div className="flex flex-wrap gap-2">
                  {['Funny', 'Calm', 'Adventurous', 'Romantic', 'Ambitious', 'Introverted', 'Creative', 'Intellectual'].map(t => (
                    <button key={t} onClick={() => toggleMulti('traits', t)} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.traits.includes(t) ? 'bg-yellow-400 text-black' : 'bg-black/10 dark:bg-white/10 opacity-50 dark:text-white text-black'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">8. Role in the Orbit</label>
                <div className="grid grid-cols-2 gap-3">
                   {['Visionary', 'Creator', 'Explorer', 'Caregiver', 'Strategist'].map(role => (
                     <OptionBtn key={role} active={formData.role === role} onClick={() => updateField('role', role)}>{role}</OptionBtn>
                   ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 {['Honesty', 'Growth', 'Independence', 'Loyalty', 'Kindness', 'Ambition'].map(v => (
                   <button key={v} onClick={() => toggleMulti('values', v)} className={`p-5 rounded-2xl text-[10px] font-black uppercase border transition-all ${formData.values.includes(v) ? 'bg-yellow-400 border-yellow-400 text-black' : 'dark:border-white/10 border-black/5 dark:text-white/60 text-black/60'}`}>{v}</button>
                 ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 opacity-30">
                    <Info size={12} className="dark:text-white" />
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1">9. The Soul Narrative (Bio)</label>
                  </div>
                  <textarea rows={4} value={formData.bio} onChange={e => updateField('bio', e.target.value)} placeholder="Describe your frequency..." className="w-full p-6 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-[24px] outline-none focus:border-yellow-400 italic text-lg dark:text-white" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 opacity-30">
                    <MessageSquare size={12} className="dark:text-white" />
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1">10. Resonance Trigger (Prompt)</label>
                  </div>
                  <input value={formData.prompt} onChange={e => updateField('prompt', e.target.value)} placeholder="What starts a deep conversation for you?" className="w-full py-5 px-8 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-2xl focus:border-yellow-400 outline-none font-bold text-lg dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-10">
               <div className="space-y-6">
                 <label className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center block dark:text-white/40">11. Quad Presence Presence (4 Gallery Photos Required)</label>
                 <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map(idx => (
                      <div key={idx} onClick={() => triggerUpload(idx)} className="aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-yellow-400/20 hover:border-yellow-400 transition-all cursor-pointer relative group bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-3">
                         {formData.photos[idx] ? (
                           <>
                             <img src={formData.photos[idx]} className="w-full h-full object-cover" />
                             <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-lg"><Sparkles size={12} /></div>
                           </>
                         ) : (
                           <>
                             <Upload size={24} className="opacity-20 text-yellow-400" />
                             <span className="text-[7px] font-black uppercase opacity-20 dark:text-white">Upload {idx + 1}</span>
                           </>
                         )}
                      </div>
                    ))}
                 </div>
               </div>
               <div className="p-6 bg-yellow-400/5 border border-yellow-400/10 rounded-2xl text-center">
                  <Shield size={24} className="mx-auto text-yellow-400 mb-3" />
                  <p className="text-[10px] font-black tracking-widest uppercase dark:text-white">Identity Secured via Global Encryption</p>
               </div>
            </div>
          )}
        </div>

        <div className="mt-16 flex items-center justify-between">
            <button onClick={handleBack} className="interactive flex items-center gap-2 font-black text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-all dark:text-white text-black">
                <ArrowLeft size={16} /> Previous
            </button>
            <button onClick={handleNext} className="interactive bg-yellow-400 text-black px-12 py-5 rounded-2xl font-black text-sm tracking-[0.2em] flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-yellow-400/20">
                {currentStep === 7 ? "ENTER THE ORBIT" : "SYNC NEXT"}
                <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
