
import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import gsap from 'gsap';
import { 
  Heart, X, Star, MapPin, ShieldCheck, Briefcase, Info, Send, 
  MessageSquare, Sparkles, Lock, Filter, ChevronLeft, ChevronRight, 
  User, GraduationCap, Compass, Zap, Wine, Moon, Baby, Globe, Shield,
  Crown, LockKeyhole, RotateCcw
} from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

export const mockProfiles = [
  { id: 1, name: "Ademilade", age: 35, role: "Owner", location: "Lagos, NG", intent: "Relationship", verified: true, gender: 'Man', education: "Business Admin", bio: "Building empires and seeking deep connections.", prompt: "Consistency is my love language.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Sarah", age: 26, role: "UI Designer", location: "Abuja, NG", intent: "Serious", verified: true, gender: 'Woman', education: "Visual Arts", bio: "Quiet coffee and sketches.", prompt: "Authenticity wins every time.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Elena", age: 28, role: "Artist", location: "Lisbon, PT", intent: "Relationship", verified: true, gender: 'Woman', education: "Fine Arts", bio: "Painting the town red.", prompt: "Art is long, life is short.", img: "https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Marcus", age: 32, role: "Architect", location: "Berlin, DE", intent: "Serious", verified: true, gender: 'Man', education: "MSc Architecture", bio: "Minimalist in design.", prompt: "Build something lasting.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Yuki", age: 24, role: "Photographer", location: "Tokyo, JP", intent: "Casual", verified: true, gender: 'Woman', education: "Tokyo Arts", bio: "Neon lights and raw colors.", prompt: "Capture the moment.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Chloe", age: 27, role: "Sommelier", location: "Paris, FR", intent: "Relationship", verified: true, gender: 'Woman', education: "Wine Academy", bio: "Life is too short for bad wine.", prompt: "Savor every sip.", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "David", age: 30, role: "Software Engineer", location: "New York, US", intent: "Serious", verified: true, gender: 'Man', education: "MIT", bio: "Debugging code by day.", prompt: "Find the co-founder for life.", img: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Amara", age: 29, role: "Yoga Instructor", location: "Bali, ID", intent: "Relationship", verified: true, gender: 'Woman', education: "Wellness", bio: "Manifesting magic.", prompt: "Share the sunrise.", img: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Liam", age: 31, role: "Journalist", location: "London, UK", intent: "Casual", verified: false, gender: 'Man', education: "Oxford", bio: "Chasing stories and good coffee.", prompt: "Adventure awaits.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Sofia", age: 25, role: "Stylist", location: "Milan, IT", intent: "Serious", verified: true, gender: 'Woman', education: "Fashion", bio: "Elegance is beauty.", prompt: "Timeless connection.", img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "Arjun", age: 34, role: "Chef", location: "Mumbai, IN", intent: "Relationship", verified: true, gender: 'Man', education: "Culinary", bio: "Spicing up life.", prompt: "Share my heart and kitchen.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "Isabella", age: 28, role: "Marine Biologist", location: "Sydney, AU", intent: "Serious", verified: true, gender: 'Woman', education: "UofQ", bio: "Deep sea explorer.", prompt: "The deep end is better.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Noah", age: 26, role: "Musician", location: "Nashville, US", intent: "Relationship", verified: true, gender: 'Man', education: "Belmont", bio: "Melody in the making.", prompt: "You are the song.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
  { id: 14, name: "Mia", age: 23, role: "Grad Student", location: "Toronto, CA", intent: "Casual", verified: true, gender: 'Woman', education: "UofT", bio: "Winning at life.", prompt: "Let's grab a poutine.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Ethan", age: 33, role: "Director", location: "San Francisco, US", intent: "Serious", verified: true, gender: 'Man', education: "Berkeley", bio: "Outside the box.", prompt: "A home in your heart.", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "Kemi", age: 27, role: "Founder", location: "Lagos, NG", intent: "Serious", verified: true, gender: 'Woman', education: "Unilag", bio: "Building big things.", prompt: "Next big move.", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800" },
  { id: 17, name: "Tunde", age: 29, role: "Doctor", location: "Ibadan, NG", intent: "Relationship", verified: true, gender: 'Man', education: "UCH", bio: "Saving lives.", prompt: "Finding my own.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  { id: 18, name: "Zoe", age: 25, role: "Dancer", location: "Los Angeles, US", intent: "Relationship", verified: true, gender: 'Woman', education: "Juilliard", bio: "Movement is life.", prompt: "Dance with me.", img: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?auto=format&fit=crop&q=80&w=800" },
  { id: 19, name: "Leo", age: 30, role: "Barista", location: "Melbourne, AU", intent: "Casual", verified: true, gender: 'Man', education: "Creative Writing", bio: "Better beans, better vibes.", prompt: "Coffee and chats.", img: "https://images.unsplash.com/photo-1533227268408-a77469e79c71?auto=format&fit=crop&q=80&w=800" },
  { id: 20, name: "Aria", age: 26, role: "Writer", location: "Edinburgh, UK", intent: "Relationship", verified: true, gender: 'Woman', education: "Literature", bio: "Worlds in words.", prompt: "Our story starts here.", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800" },
  { id: 21, name: "Kai", age: 28, role: "Surfer", location: "Cape Town, ZA", intent: "Casual", verified: true, gender: 'Man', education: "Env Science", bio: "Chasing the perfect wave.", prompt: "Let's dive in.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { id: 22, name: "Nora", age: 29, role: "Pilot", location: "Dubai, AE", intent: "Serious", verified: true, gender: 'Woman', education: "Aviation Academy", bio: "Always in the clouds.", prompt: "High frequency connection.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" },
  { id: 23, name: "Omar", age: 31, role: "Gamer", location: "Seoul, KR", intent: "Casual", verified: true, gender: 'Man', education: "Computer Science", bio: "Leveling up in life.", prompt: "Co-op partner wanted.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" },
  { id: 24, name: "Lila", age: 27, role: "Florist", location: "Amsterdam, NL", intent: "Relationship", verified: true, gender: 'Woman', education: "Botany", bio: "Bloom where you are planted.", prompt: "Growth is essential.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800" },
  { id: 25, name: "Finn", age: 32, role: "Woodworker", location: "Oslo, NO", intent: "Serious", verified: true, gender: 'Man', education: "Craftsmanship", bio: "Crafting beauty from wood.", prompt: "Hands-on connection.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
  { id: 26, name: "Hana", age: 24, role: "Tattoo Artist", location: "Berlin, DE", intent: "Relationship", verified: true, gender: 'Woman', education: "Fine Arts", bio: "Art on skin.", prompt: "Ink our future.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
  { id: 27, name: "Silas", age: 35, role: "Venture Capitalist", location: "Singapore, SG", intent: "Serious", verified: true, gender: 'Man', education: "MBA", bio: "Investing in greatness.", prompt: "Deep ROI on love.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  { id: 28, name: "Mila", age: 25, role: "DJ", location: "Ibiza, ES", intent: "Casual", verified: true, gender: 'Woman', education: "Music Theory", bio: "Beats and rhythm.", prompt: "Sync our frequency.", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800" },
  { id: 29, name: "Jude", age: 30, role: "Farmer", location: "Tuscany, IT", intent: "Serious", verified: true, gender: 'Man', education: "Agriculture", bio: "Rooted in nature.", prompt: "Simple life, deep love.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { id: 30, name: "Sasha", age: 28, role: "Baker", location: "Vienna, AT", intent: "Relationship", verified: true, gender: 'Woman', education: "Culinary Arts", bio: "Sweetest things in life.", prompt: "Knead more love.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" }
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

      <div className="space-y-4">
        <SectionTitle icon={Info}>The Narrative</SectionTitle>
        <p className="text-xl md:text-2xl italic font-light dark:text-white text-black leading-snug">"{profile.bio || "Searching resonance..."}"</p>
        <div className="p-6 bg-black dark:bg-white text-white dark:text-black rounded-[20px] relative overflow-hidden group">
           <Sparkles className="absolute -top-3 -right-3 text-yellow-400 opacity-10 group-hover:scale-125 transition-transform" size={60} />
           <p className="text-lg font-black tracking-tighter leading-tight italic">"{profile.prompt || "Authenticity wins."}"</p>
        </div>
      </div>

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

  // Touch State
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const deltaX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const isVerticalScroll = useRef<boolean>(false);

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

    const interval = setInterval(() => {
        setShowFilterLabel(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
    if (!isPremium && swipeCount >= 12) return;
    if (currentIndex >= filteredProfiles.length) return;

    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    
    gsap.to(cardRef.current, {
      x: direction === 'left' ? -1000 : 1000,
      opacity: 0,
      rotate: direction === 'left' ? -25 : 25,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        const nextIdx = currentIndex + 1;
        const nextSwipeCount = swipeCount + 1;
        
        setCurrentIndex(nextIdx);
        setSwipeCount(nextSwipeCount);
        
        if (isPremium || nextSwipeCount < 12) {
          gsap.set(cardRef.current, { x: 0, rotate: 0, opacity: 0, scale: 0.95 });
          gsap.to(cardRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' });
        }
        gsap.set(['.swipe-overlay-like', '.swipe-overlay-nope'], { opacity: 0 });
      }
    });
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current || (!isPremium && swipeCount >= 12)) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
    isVerticalScroll.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current || !cardRef.current || isVerticalScroll.current) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const dX = currentX - touchStartX.current;
    const dY = currentY - touchStartY.current;

    // AXIS DETECTION: If moving vertically more than horizontally, it's a scroll
    if (!isVerticalScroll.current && Math.abs(dY) > Math.abs(dX) && Math.abs(dY) > 10) {
      isVerticalScroll.current = true;
      isSwiping.current = false;
      return;
    }

    if (isSwiping.current) {
      deltaX.current = dX;
      const rotate = deltaX.current * 0.05;
      gsap.set(cardRef.current, { x: deltaX.current, rotate: rotate });

      const opacity = Math.min(Math.abs(deltaX.current) / 100, 1);
      if (deltaX.current > 0) {
        gsap.set('.swipe-overlay-like', { opacity: opacity });
        gsap.set('.swipe-overlay-nope', { opacity: 0 });
      } else {
        gsap.set('.swipe-overlay-nope', { opacity: opacity });
        gsap.set('.swipe-overlay-like', { opacity: 0 });
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current || isVerticalScroll.current) return;
    isSwiping.current = false;
    touchStartX.current = null;
    touchStartY.current = null;

    const threshold = 100;
    if (deltaX.current > threshold) {
      handleSwipe('right');
    } else if (deltaX.current < -threshold) {
      handleSwipe('left');
    } else {
      gsap.to(cardRef.current, { x: 0, rotate: 0, duration: 0.3, ease: 'elastic.out(1, 0.7)' });
      gsap.to(['.swipe-overlay-like', '.swipe-overlay-nope'], { opacity: 0, duration: 0.3 });
    }
    deltaX.current = 0;
  };

  const profile = filteredProfiles[currentIndex];
  const isLimitReached = !isPremium && swipeCount >= 12;

  if (isLimitReached) return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8 bg-white dark:bg-black animate-in fade-in duration-500">
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
      <button onClick={() => { setCurrentIndex(0); setShowFilters(true); }} className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">Adjust Filters</button>
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
        <div 
          ref={cardRef} 
          className="max-w-xl mx-auto px-4 py-4 lg:py-6 space-y-6 relative touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden shadow-2xl border-2 dark:border-white/5 pointer-events-none">
              <img src={profile.img} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Swipe Overlays */}
              <div className="swipe-overlay-like absolute inset-0 bg-green-500/40 flex items-center justify-center opacity-0 transition-opacity">
                 <div className="px-8 py-4 border-8 border-green-500 rounded-3xl rotate-[-20deg]">
                    <span className="text-5xl font-black text-green-500 uppercase tracking-tighter">LIKE</span>
                 </div>
              </div>
              <div className="swipe-overlay-nope absolute inset-0 bg-red-500/40 flex items-center justify-center opacity-0 transition-opacity">
                 <div className="px-8 py-4 border-8 border-red-500 rounded-3xl rotate-[20deg]">
                    <span className="text-5xl font-black text-red-500 uppercase tracking-tighter">NOPE</span>
                 </div>
              </div>

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