import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { 
  ArrowRight, ArrowLeft, Heart, Sparkles, Shield, User, MapPin, Calendar, 
  Smile, Zap, MessageSquare, Briefcase, Globe, Star, Upload, Info, Navigation, Phone, X, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  { id: 7, title: "Visuals", subtitle: "Triple Presence", category: "MEDIA" },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [locLoading, setLocLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', phone: '', role: 'Visionary', education: '', location: '',
    intent: 'Serious relationship', commitment: 'Very important',
    lookingFor: 'Women', // Men, Women, Everyone
    ageRange: [18, 50],
    traits: [] as string[], weekend: 'Exploring', drinks: 'Sometimes', smokes: 'No',
    values: [] as string[], languages: [] as string[], belief: 'Spiritual',
    children: 'Want someday', relocate: 'Maybe',
    essentials: [] as string[], bio: '', prompt: 'Consistency and kindness.',
    photos: [] as string[], verified: false
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

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem('aura_user_profile', JSON.stringify(formData));
      navigate('/otp');
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
        // In a real app, use reverse geocoding. For now, mock.
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

  const handlePhotoUpload = (index: number) => {
    // Mock upload
    const mockUrls = [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    ];
    const newPhotos = [...formData.photos];
    newPhotos[index] = mockUrls[index % 3];
    updateField('photos', newPhotos);
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-20 pb-20 px-6 dark:bg-black bg-white transition-colors duration-700 flex flex-col items-center justify-center">
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

      <div ref={stepRef} className="max-w-2xl w-full bg-slate-50 dark:bg-zinc-900 p-12 rounded-[50px] border border-black/5 dark:border-white/10 shadow-2xl">
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
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-2">9. The Soul Narrative (Bio)</label>
                <textarea rows={5} value={formData.bio} onChange={e => updateField('bio', e.target.value)} placeholder="Describe your frequency..." className="w-full p-6 dark:bg-black bg-white border dark:border-white/10 border-black/5 rounded-3xl outline-none focus:border-yellow-400 italic text-lg dark:text-white" />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-10">
               <div className="space-y-6">
                 <label className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center block dark:text-white/40">10. Triple Resonance Presence (3 Photos Required)</label>
                 <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map(idx => (
                      <div key={idx} onClick={() => handlePhotoUpload(idx)} className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-dashed border-yellow-400/20 hover:border-yellow-400 transition-all cursor-pointer relative group bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-3">
                         {formData.photos[idx] ? (
                           <>
                             <img src={formData.photos[idx]} className="w-full h-full object-cover" />
                             <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black"><Sparkles size={12} /></div>
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
               <div className="p-8 bg-yellow-400/5 border border-yellow-400/10 rounded-[40px] text-center">
                  <Shield size={32} className="mx-auto text-yellow-400 mb-4" />
                  <h4 className="text-xl font-black tracking-tighter uppercase mb-4 dark:text-white">Aura Identity Verification</h4>
                  <button onClick={() => updateField('verified', true)} className={`px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-xl ${formData.verified ? 'bg-green-500 text-white' : 'bg-black dark:bg-white dark:text-black text-white'}`}>
                    {formData.verified ? "ID SYNCED ✓" : "ACTIVATE VIDEO ID"}
                  </button>
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
