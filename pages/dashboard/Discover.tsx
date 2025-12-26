
import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import gsap from 'gsap';
import { 
  Heart, X, Star, MapPin, ShieldCheck, Briefcase, Info, Send, 
  MessageSquare, Sparkles, Lock, Filter, ChevronLeft, ChevronRight, 
  User, GraduationCap, Compass, Zap, Wine, Moon, Baby, Globe, Shield,
  Crown, LockKeyhole
} from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

export const mockProfiles = [
  { 
    id: 1, name: "Ademilade", age: 35, role: "Owner", location: "Lagos, NG", intent: "Relationship", commitment: "High", 
    traits: ["Ambitious", "Calm", "Visionary"], bio: "Building empires and seeking deep connections. I value truth above all else.", 
    prompt: "Consistency is my love language.", verified: true, education: "Business Administration",
    gender: 'Man', lookingFor: 'Women', weekend: 'Networking', drinks: 'Socially', smokes: 'No',
    belief: 'Goal-oriented', children: 'Want someday', relocate: 'Always open',
    values: ["Growth", "Honesty", "Ambition"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"],
    compliments: ["Visionary!"] 
  },
  { 
    id: 2, name: "Sarah", age: 26, role: "UI Designer", location: "Abuja, NG", intent: "Serious", commitment: "High", 
    traits: ["Creative", "Romantic", "Thoughtful"], bio: "Quiet coffee and sketches. I'm looking for someone to share sunsets and Figma files with.", 
    prompt: "Authenticity wins every time.", verified: true, education: "Visual Arts",
    gender: 'Woman', lookingFor: 'Men', weekend: 'Exploring Art', drinks: 'Rarely', smokes: 'No',
    belief: 'Spiritual', children: 'Want someday', relocate: 'Maybe',
    values: ["Kindness", "Creativity", "Loyalty"],
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800"],
    compliments: ["Calming."] 
  },
  { 
    id: 3, name: "Elena", age: 28, role: "Artist", location: "Lisbon, PT", intent: "Relationship", traits: ["Romantic", "Free-spirited"], verified: true, 
    gender: 'Woman', lookingFor: 'Men', education: "Fine Arts", weekend: 'Painting', drinks: 'Wine lover', smokes: 'Socially',
    belief: 'Agnostic', children: 'Not sure', relocate: 'Yes', bio: "Painting the town red and seeking a muse who can keep up.", 
    prompt: "Art is long, life is short.",
    values: ["Independence", "Growth", "Passion"],
    img: "https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 4, name: "Marcus", age: 32, role: "Architect", location: "Berlin, DE", intent: "Serious", verified: true,
    gender: 'Man', lookingFor: 'Women', education: "MSc Architecture", bio: "Minimalist in design, maximalist in love. Let's build something lasting.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 5, name: "Yuki", age: 24, role: "Photographer", location: "Tokyo, JP", intent: "Casual", verified: true,
    gender: 'Woman', lookingFor: 'Everyone', education: "Tokyo Arts", bio: "Capturing moments between the neon lights. Seeking a subject who sees the world in raw colors.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 6, name: "Chloe", age: 27, role: "Sommelier", location: "Paris, FR", intent: "Relationship", verified: true,
    gender: 'Woman', lookingFor: 'Men', education: "Wine Academy", bio: "Life is too short for bad wine and shallow conversations.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 7, name: "David", age: 30, role: "Software Engineer", location: "New York, US", intent: "Serious", verified: true,
    gender: 'Man', lookingFor: 'Women', education: "MIT", bio: "Debugging code by day, exploring the concrete jungle by night. Looking for a co-founder for life.",
    img: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 8, name: "Amara", age: 29, role: "Yoga Instructor", location: "Bali, ID", intent: "Relationship", verified: true,
    gender: 'Woman', lookingFor: 'Everyone', education: "Global Wellness", bio: "Manifesting magic and seeking a soul to share sunrises with.",
    img: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 9, name: "Liam", age: 31, role: "Journalist", location: "London, UK", intent: "Casual", verified: false,
    gender: 'Man', lookingFor: 'Women', education: "Oxford", bio: "Chasing stories and good coffee. Always packed for the next adventure.",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 10, name: "Sofia", age: 25, role: "Fashion Stylist", location: "Milan, IT", intent: "Serious", verified: true,
    gender: 'Woman', lookingFor: 'Men', education: "Istituto Marangoni", bio: "Elegance is the only beauty that never fades. Let's create a timeless connection.",
    img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 11, name: "Arjun", age: 34, role: "Chef", location: "Mumbai, IN", intent: "Relationship", verified: true,
    gender: 'Man', lookingFor: 'Women', education: "Culinary Institute", bio: "Spicing up life, one dish at a time. Looking for someone to share my kitchen and my heart.",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 12, name: "Isabella", age: 28, role: "Marine Biologist", location: "Sydney, AU", intent: "Serious", verified: true,
    gender: 'Woman', lookingFor: 'Men', education: "University of Queensland", bio: "Deep sea explorer seeking a partner who isn't afraid of the deep end.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 13, name: "Noah", age: 26, role: "Musician", location: "Nashville, US", intent: "Relationship", verified: true,
    gender: 'Man', lookingFor: 'Everyone', education: "Belmont", bio: "Writing songs about places I've never been. Maybe you're the melody I've been looking for.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 14, name: "Mia", age: 23, role: "Grad Student", location: "Toronto, CA", intent: "Casual", verified: true,
    gender: 'Woman', lookingFor: 'Men', education: "UofT", bio: "Struggling with my thesis but winning at life. Let's grab a poutine and talk about nothing.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800"]
  },
  {
    id: 15, name: "Ethan", age: 33, role: "Creative Director", location: "San Francisco, US", intent: "Serious", verified: true,
    gender: 'Man', lookingFor: 'Women', education: "Berkeley", bio: "Thinking outside the box but looking for a home within someone's heart.",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800",
    photos: ["https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800"]
  }
];

export const ProfileDetailView = ({ profile }: { profile: any }) => {
  const [compliment, setCompliment] = useState('');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.img];

  const SectionTitle: React.FC<{ children: React.ReactNode, icon: any }> = ({ children, icon: Icon }) => (
    <div className="flex items-center gap-2 opacity-30 mb-3">
      <Icon size={12} />
      <span className="text-[8px] font-black uppercase tracking-widest dark:text-white">{children}</span>
    </div>
  );

  return (
    <div className="space-y-8 pb-48">
      {/* Photo Carousel */}
      <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden group shadow-2xl">
         <img src={photos[activePhotoIdx]} alt={profile.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
         
         <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div className="flex gap-2">
               {photos.map((_, i) => (
                 <div key={i} className={`h-1 rounded-full transition-all ${i === activePhotoIdx ? 'w-8 bg-yellow-400' : 'w-2 bg-white/30'}`} />
               ))}
            </div>
            <div className="flex gap-2">
               <button onClick={() => setActivePhotoIdx(p => Math.max(0, p-1))} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all"><ChevronLeft size={16} /></button>
               <button onClick={() => setActivePhotoIdx(p => Math.min(photos.length-1, p+1))} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all"><ChevronRight size={16} /></button>
            </div>
         </div>
      </div>

      {/* Narrative Section */}
      <div className="space-y-4">
        <SectionTitle icon={Info}>The Narrative</SectionTitle>
        <p className="text-xl md:text-2xl italic font-light dark:text-white text-black leading-snug">"{profile.bio || "Searching resonance..."}"</p>
        <div className="p-6 bg-black dark:bg-white text-white dark:text-black rounded-[20px] relative overflow-hidden group">
           <Sparkles className="absolute -top-3 -right-3 text-yellow-400 opacity-10 group-hover:scale-125 transition-transform" size={60} />
           <p className="text-lg font-black tracking-tighter leading-tight italic">"{profile.prompt || "Authenticity wins."}"</p>
        </div>
      </div>

      {/* Core Identity */}
      <div className="space-y-4">
        <SectionTitle icon={User}>Core Identity</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 border-black/5">
            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Professional Role</span>
            <div className="flex items-center gap-2 font-black text-xs dark:text-white">
              <Briefcase size={12} className="text-yellow-500" />
              {profile.role || "Soul"}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 border-black/5">
            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Education</span>
            <div className="flex items-center gap-2 font-black text-xs dark:text-white">
              <GraduationCap size={12} className="text-yellow-500" />
              {profile.education || "Global Origin"}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 border-black/5">
            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Intent Resonance</span>
            <p className="text-xs font-black text-yellow-500 uppercase">💍 {profile.intent}</p>
          </div>
          <div className="p-4 bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 border-black/5">
            <span className="text-[7px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Looking For</span>
            <p className="text-xs font-black uppercase dark:text-white">{profile.lookingFor || "Everyone"}</p>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="p-6 bg-yellow-400/5 border border-yellow-400/10 rounded-[20px] space-y-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <MessageSquare size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Resonance Pulse</span>
          </div>
          <div className="relative">
             <input value={compliment} onChange={(e) => setCompliment(e.target.value)} placeholder="Sync a compliment..." className="w-full bg-white dark:bg-zinc-800 border dark:border-white/10 rounded-xl py-4 px-5 focus:border-yellow-400 outline-none text-xs font-bold pr-14 transition-all dark:text-white" />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-400 text-black rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-all"><Send size={16} /></button>
          </div>
      </div>
    </div>
  );
};

const Discover: React.FC = () => {
  const { isPremium, openUpgrade } = useContext(PremiumContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showFilterLabel, setShowFilterLabel] = useState(false);
  const [filters, setFilters] = useState({
    ageRange: [18, 50],
    genderPref: 'Everyone'
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filterIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aura_user_profile');
    if (saved) {
      const data = JSON.parse(saved);
      setFilters(prev => ({
        ...prev,
        genderPref: data.lookingFor || 'Everyone',
        ageRange: data.ageRange || [18, 50]
      }));
    }

    // Toggle logic for the filter icon/text every 4 seconds
    const interval = setInterval(() => {
        setShowFilterLabel(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animation for the toggle
  useEffect(() => {
      if (filterIconRef.current) {
          gsap.fromTo(filterIconRef.current, 
            { opacity: 0, y: 5 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
      }
  }, [showFilterLabel]);

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(p => {
      const matchesGender = filters.genderPref === 'Everyone' || 
                           (filters.genderPref === 'Men' && p.gender === 'Man') ||
                           (filters.genderPref === 'Women' && p.gender === 'Woman');
      const matchesAge = p.age >= filters.ageRange[0] && p.age <= filters.ageRange[1];
      return matchesGender && matchesAge;
    });
  }, [filters]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= filteredProfiles.length) return;
    if (!isPremium && swipeCount >= 12) return;

    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    
    gsap.to(cardRef.current, {
      x: direction === 'left' ? -1000 : 1000,
      opacity: 0,
      rotate: direction === 'left' ? -15 : 15,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex(prev => prev + 1);
        setSwipeCount(prev => prev + 1);
        gsap.fromTo(cardRef.current, { x: 0, opacity: 0, rotate: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
      }
    });
  };

  const profile = filteredProfiles[currentIndex];
  const isLimitReached = !isPremium && swipeCount >= 12;

  if (isLimitReached) return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8 bg-white dark:bg-black">
      <div className="relative">
        <div className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(250,204,21,0.3)] animate-pulse">
          <LockKeyhole size={48} className="text-black" />
        </div>
        <div className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-black">
          <Crown size={20} />
        </div>
      </div>
      <div className="space-y-4 max-w-sm">
        <h2 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none dark:text-white">ORBITAL LIMIT REVEALED.</h2>
        <p className="text-sm font-bold opacity-60 uppercase tracking-widest dark:text-white/60">You have reached your swipe limit for the day. Upgrade to get more likes and find your global resonance.</p>
      </div>
      <div className="flex flex-col w-full gap-3 max-w-xs">
        <button onClick={openUpgrade} className="bg-yellow-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-yellow-400/20 active:scale-95 transition-all">Go Premium Now</button>
        <button onClick={() => window.location.reload()} className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity dark:text-white">Refresh Tomorrow</button>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 bg-yellow-400 rounded-xl flex items-center justify-center animate-bounce shadow-2xl shadow-yellow-400/20"><Heart size={40} className="text-black" /></div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase dark:text-white">OUT OF ORBIT.</h2>
        <p className="text-xs font-bold opacity-40 uppercase tracking-widest dark:text-white/40">Broaden your filters to find more souls.</p>
      </div>
      <button onClick={() => { setCurrentIndex(0); setSwipeCount(0); setShowFilters(true); }} className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">Adjust Filters</button>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative bg-white dark:bg-black overflow-hidden">
      {showFilters && (
        <div 
          className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-2xl p-8 flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => setShowFilters(false)}
        >
           <div 
            className="w-full max-w-sm space-y-10"
            onClick={(e) => e.stopPropagation()}
           >
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase">FILTERS<span className="text-yellow-400">.</span></h3>
                <button onClick={() => setShowFilters(false)} className="p-2 bg-white/10 rounded-full text-white"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Seeking Resonance From</label>
                 <div className="grid grid-cols-3 gap-2">
                    {['Men', 'Women', 'Everyone'].map(g => (
                      <button 
                        key={g} 
                        onClick={() => setFilters({...filters, genderPref: g})} 
                        className={`py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all ${filters.genderPref === g ? 'bg-yellow-400 text-black border-yellow-400' : 'text-white border-white/10'}`}
                      >
                        {g}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Frequency Range (Age)</label>
                   <span className="text-yellow-400 font-black text-xs">{filters.ageRange[1]}</span>
                 </div>
                 <input 
                   type="range" min="18" max="80" 
                   value={filters.ageRange[1]} 
                   onChange={e => setFilters({...filters, ageRange: [18, parseInt(e.target.value)]})}
                   className="w-full h-1.5 bg-white/10 accent-yellow-400 rounded-full" 
                 />
              </div>
              <button onClick={() => { setShowFilters(false); setCurrentIndex(0); }} className="w-full bg-yellow-400 text-black py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">Apply Resonance</button>
           </div>
        </div>
      )}

      <header className="px-5 py-3 flex items-center justify-between shrink-0 z-10 border-b dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
         <span className="text-[8px] font-black uppercase tracking-widest opacity-40 dark:text-white">Active Discovery • {swipeCount}/12 Pulse</span>
         <button 
            onClick={() => setShowFilters(true)} 
            className="flex items-center gap-2 p-2 px-3 bg-black/5 dark:bg-white/5 rounded-xl transition-all dark:text-white border dark:border-white/10 border-black/5 min-w-[44px] h-[40px] justify-center"
         >
            <div ref={filterIconRef} className="flex items-center gap-2">
                {showFilterLabel ? (
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-yellow-400">Age Filter</span>
                ) : (
                    <Filter size={18} />
                )}
            </div>
         </button>
      </header>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        <div ref={cardRef} className="max-w-xl mx-auto px-4 py-4 lg:py-6 space-y-6">
            <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden shadow-2xl border-2 dark:border-white/5">
              <img src={profile.img} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 space-y-3">
                 {profile.verified && (
                   <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 rounded-lg w-fit">
                       <ShieldCheck size={14} className="text-black" />
                       <span className="text-[8px] font-black text-black uppercase tracking-widest">Verified Identity</span>
                   </div>
                 )}
                 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">{profile.name}, {profile.age}</h2>
              </div>
            </div>
            <ProfileDetailView profile={profile} />
        </div>
      </div>

      {/* Fixed Action Buttons - Adjusted position for Mobile */}
      <div className="absolute bottom-32 md:bottom-12 left-0 w-full px-6 z-50">
          <div className="max-w-xs mx-auto flex items-center justify-center gap-6 pointer-events-auto">
              <button onClick={() => handleSwipe('left')} className="w-14 h-14 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-full flex items-center justify-center text-black dark:text-white shadow-2xl active:scale-90 transition-all hover:bg-red-500 hover:text-white"><X size={28} /></button>
              <button onClick={openUpgrade} className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-2xl relative active:scale-90 transition-all hover:scale-110"><Star size={32} fill="currentColor" />{!isPremium && <Lock size={10} className="absolute top-4 right-4 text-red-600" />}</button>
              <button onClick={() => handleSwipe('right')} className="w-14 h-14 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-full flex items-center justify-center text-black dark:text-white shadow-2xl active:scale-90 transition-all hover:bg-yellow-400 hover:text-black"><Heart size={28} fill="currentColor" /></button>
          </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-40"></div>
    </div>
  );
};

export default Discover;