
import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { Heart, X, Star, MapPin, ShieldCheck, Briefcase, GraduationCap, ChevronDown, Info, Send, MessageSquare, Quote, Sparkles, Crown, Lock } from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

export const mockProfiles = [
  {
    id: 1,
    name: "Ademilade",
    age: 35,
    role: "Business Owner",
    education: "Oou 2017",
    location: "Lagos, Nigeria",
    phone: "+234 800...",
    intent: "Serious relationship",
    commitment: "Very important",
    traits: ["Ambitious", "Calm", "Funny"],
    weekend: "Exploring new places",
    drinks: "Sometimes",
    smokes: "No",
    values: ["Growth", "Honesty", "Family"],
    languages: ["English", "Yoruba"],
    belief: "Christian",
    children: "Want someday",
    relocate: "Yes",
    essentials: ["Music", "Travel", "Faith"],
    bio: "I love deep conversations, spontaneous trips, and people who can make me laugh. Building empires and looking for a partner in crime.",
    prompt: "Consistency and kindness.",
    verified: true,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    compliments: ["Always brings the best energy to meetings!", "Truly a visionary."]
  },
  {
    id: 2,
    name: "Sarah",
    age: 26,
    role: "UI Designer",
    education: "Unilag 2019",
    location: "Abuja, Nigeria",
    phone: "+234 901...",
    intent: "Serious relationship",
    commitment: "Very important",
    traits: ["Creative", "Introverted", "Romantic"],
    weekend: "Staying in & relaxing",
    drinks: "No",
    smokes: "No",
    values: ["Kindness", "Honesty", "Loyalty"],
    languages: ["English", "French"],
    belief: "Spiritual",
    children: "Not sure",
    relocate: "Maybe",
    essentials: ["Art", "Books", "Family"],
    bio: "Looking for a soul that resonates. I enjoy quiet coffee shops, sketching, and talking about the universe.",
    prompt: "Authenticity and patience.",
    verified: true,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    compliments: ["Her eye for detail is unmatched.", "A very calming presence."]
  },
  { id: 3, name: "Chinedu", age: 29, role: "Tech Lead", location: "Lagos", intent: "Marriage-minded", traits: ["Funny", "Smart"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", compliments: [], values: ["Growth"], languages: ["English"], essentials: ["Tech"], bio: "Coding the future.", prompt: "Clean code." },
  { id: 4, name: "Amara", age: 24, role: "Artist", location: "Enugu", intent: "Something casual", traits: ["Creative", "Wild"], img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800", compliments: ["Best colors ever!"], values: ["Freedom"], languages: ["English"], essentials: ["Paint"], bio: "Life is a canvas.", prompt: "Spontaneity." },
  { id: 5, name: "Tunde", age: 32, role: "Architect", location: "Lagos", intent: "Serious relationship", traits: ["Calm", "Focused"], img: "https://images.unsplash.com/photo-1492562080023-ab3dbdf9bbbd?auto=format&fit=crop&q=80&w=800", compliments: [], values: ["Loyalty"], languages: ["English"], essentials: ["Design"], bio: "Building foundations.", prompt: "Stability." },
  { id: 6, name: "Kemi", age: 27, role: "Chef", location: "Ibadan", intent: "Serious relationship", traits: ["Warm", "Funny"], img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800", compliments: ["Her Jollof is 10/10"], values: ["Family"], languages: ["English"], essentials: ["Spices"], bio: "Cooking with love.", prompt: "Good food." },
  { id: 7, name: "David", age: 30, role: "Musician", location: "Jos", intent: "Something casual", traits: ["Creative", "Romantic"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800", compliments: ["Soulful voice."], values: ["Harmony"], languages: ["English"], essentials: ["Guitar"], bio: "Vibrating on high frequencies.", prompt: "Rhythm." },
  { id: 8, name: "Zainab", age: 25, role: "Lawyer", location: "Kano", intent: "Marriage-minded", traits: ["Smart", "Ambitious"], img: "https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?auto=format&fit=crop&q=80&w=800", compliments: [], values: ["Justice"], languages: ["English", "Hausa"], essentials: ["Books"], bio: "Seeking balance.", prompt: "Truth." },
  { id: 9, name: "Ife", age: 28, role: "Photographer", location: "Lagos", intent: "Serious relationship", traits: ["Creative", "Outgoing"], img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800", compliments: ["Captured my best side."], values: ["Kindness"], languages: ["English"], essentials: ["Lens"], bio: "Every moment matters.", prompt: "A smile." },
  { id: 10, name: "Blessing", age: 23, role: "Student", location: "Benin City", intent: "Friendship", traits: ["Funny", "Calm"], img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800", compliments: [], values: ["Education"], languages: ["English"], essentials: ["Music"], bio: "Learning and growing.", prompt: "Humility." },
  { id: 11, name: "Emeka", age: 31, role: "Farmer", location: "Owerri", intent: "Serious relationship", traits: ["Hardworking", "Quiet"], img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800", compliments: ["Most reliable guy."], values: ["Land"], languages: ["English", "Igbo"], essentials: ["Nature"], bio: "Back to roots.", prompt: "Harvest." },
  { id: 12, name: "Yinka", age: 34, role: "Banker", location: "Lagos", intent: "Marriage-minded", traits: ["Focused", "Ambitious"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800", compliments: [], values: ["Trust"], languages: ["English"], essentials: ["Numbers"], bio: "Investing in us.", prompt: "Security." },
  { id: 13, name: "Funmi", age: 26, role: "Model", location: "Lagos", intent: "Something casual", traits: ["Outgoing", "Bold"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400", compliments: ["Absolute stunner."], values: ["Beauty"], languages: ["English"], essentials: ["Style"], bio: "Living out loud.", prompt: "Confidence." },
  { id: 14, name: "Segun", age: 33, role: "Doctor", location: "Abuja", intent: "Serious relationship", traits: ["Calm", "Smart"], img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=800", compliments: ["Best listener."], values: ["Health"], languages: ["English"], essentials: ["Care"], bio: "Healing hearts.", prompt: "Kindness." },
  { id: 15, name: "Titi", age: 24, role: "Dancer", location: "Lagos", intent: "Friendship", traits: ["Funny", "Energetic"], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800", compliments: ["Energy for days!"], values: ["Expression"], languages: ["English"], essentials: ["Beat"], bio: "Dancing through life.", prompt: "A good beat." },
  { id: 16, name: "Olamide", age: 29, role: "Writer", location: "Abeokuta", intent: "Serious relationship", traits: ["Introverted", "Smart"], img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800", compliments: [], values: ["Words"], languages: ["English", "Yoruba"], essentials: ["Pen"], bio: "Writing our story.", prompt: "A deep talk." },
  { id: 17, name: "Joshua", age: 27, role: "Athlete", location: "Lagos", intent: "Something casual", traits: ["Focused", "Funny"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800", compliments: ["Runs faster than time."], values: ["Speed"], languages: ["English"], essentials: ["Sneakers"], bio: "Never stop moving.", prompt: "The gym." },
  { id: 18, name: "Chioma", age: 28, role: "Fashionista", location: "Lagos", intent: "Serious relationship", traits: ["Bold", "Smart"], img: "https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f01?auto=format&fit=crop&w=800", compliments: ["Trendsetter."], values: ["Style"], languages: ["English"], essentials: ["Design"], bio: "Style is substance.", prompt: "Elegance." },
  { id: 19, name: "Damilola", age: 30, role: "Pilot", location: "Lagos", intent: "Marriage-minded", traits: ["Focused", "Adventurous"], img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800", compliments: [], values: ["Height"], languages: ["English"], essentials: ["Clouds"], bio: "Sky is the starting point.", prompt: "Freedom." },
  { id: 20, name: "Tobi", age: 25, role: "Gamer", location: "Abuja", intent: "Friendship", traits: ["Funny", "Smart"], img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800", compliments: ["Pro player!"], values: ["Strategy"], languages: ["English"], essentials: ["PC"], bio: "Leveling up.", prompt: "A win." }
];

export const ProfileDetailView = ({ profile }: { profile: any }) => {
  const [compliment, setCompliment] = useState('');
  const [localCompliments, setLocalCompliments] = useState<string[]>(profile.compliments || []);

  const handleSendCompliment = () => {
    if (!compliment.trim()) return;
    setLocalCompliments([compliment, ...localCompliments]);
    setCompliment('');
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 opacity-30">
          <Info size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Soul Biography</span>
        </div>
        <p className="text-2xl md:text-3xl italic font-light dark:text-white text-black leading-snug">
          "{profile.bio || "Searching for a global resonance and meaningful connection..."}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white dark:bg-white/5 rounded-[30px] border border-black/5 dark:border-white/10">
          <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-2">Intent</span>
          <p className="text-sm font-black text-yellow-500 uppercase">💍 {profile.intent || "Not specified"}</p>
        </div>
        <div className="p-6 bg-white dark:bg-white/5 rounded-[30px] border border-black/5 dark:border-white/10">
          <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-2">Commitment</span>
          <p className="text-sm font-black">{profile.commitment || "Very Important"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Personality Aura</span>
        <div className="flex flex-wrap gap-2">
           {(profile.traits || []).map((t: string) => (
             <span key={t} className="px-5 py-2.5 bg-yellow-400 text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-yellow-400/10">
               {t}
             </span>
           ))}
        </div>
      </div>

      <div className="p-8 bg-yellow-400/5 border border-yellow-400/20 rounded-[40px] space-y-6">
          <div className="flex items-center gap-3 text-yellow-400">
             <MessageSquare size={20} />
             <span className="text-xs font-black uppercase tracking-widest">Recommend this Soul</span>
          </div>
          <div className="relative group">
             <input 
                value={compliment}
                onChange={(e) => setCompliment(e.target.value)}
                placeholder="Write a public compliment..." 
                className="w-full bg-white dark:bg-black/50 border-2 dark:border-white/10 border-black/5 rounded-[24px] py-5 px-8 focus:border-yellow-400 outline-none text-base font-bold pr-20 transition-all" 
             />
             <button onClick={handleSendCompliment} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg">
                <Send size={20} />
             </button>
          </div>
          
          {localCompliments.length > 0 && (
            <div className="pt-4 space-y-4">
               <h5 className="text-[10px] font-black uppercase tracking-widest opacity-30">Community Echoes</h5>
               <div className="space-y-3">
                  {localCompliments.map((c, idx) => (
                    <div key={idx} className="p-5 bg-white dark:bg-white/5 rounded-[24px] flex gap-4 border border-black/5 dark:border-white/5 italic">
                       <Quote size={16} className="text-yellow-400 shrink-0" />
                       <p className="text-sm font-medium opacity-80">{c}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
      </div>

      <div className="p-10 bg-black dark:bg-white text-white dark:text-black rounded-[50px] relative overflow-hidden group">
         <Sparkles className="absolute -top-6 -right-6 text-yellow-400 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={120} />
         <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 block mb-4 italic">Inner Resonance</span>
         <p className="text-3xl font-black tracking-tighter leading-tight italic">
           "The quickest way to my heart is... {profile.prompt || "authenticity and shared dreams."}"
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4 border-t dark:border-white/10 border-black/10">
          {[
            { label: 'Role', val: profile.role },
            { label: 'Education', val: profile.education },
            { label: 'Beliefs', val: profile.belief },
            { label: 'Location', val: profile.location },
            { label: 'Weekend Style', val: profile.weekend || "Exploring Cities" },
            { label: 'Languages', val: (profile.languages || ["English"]).join(', ') },
            { label: 'Children', val: profile.children || "Not Specified" },
            { label: 'Relocate', val: profile.relocate || "Open to it" },
            { label: 'Drinking', val: profile.drinks || "Sometimes" },
            { label: 'Smoking', val: profile.smokes || "No" },
            { label: 'Essentials', val: (profile.essentials || ["Music", "Travel"]).join(', ') },
            { label: 'Commitment', val: profile.commitment || "High" },
          ].map((item, idx) => (
            <div key={idx} className="group">
               <span className="text-[9px] font-black uppercase tracking-widest opacity-30 block mb-1 group-hover:text-yellow-400 transition-colors">{item.label}</span>
               <p className="text-base font-bold">{item.val || "..."}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const Discover: React.FC = () => {
  const { isPremium, openUpgrade } = useContext(PremiumContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [isGated, setIsGated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= mockProfiles.length) return;

    // Check limit for non-premium
    if (!isPremium && swipeCount >= 5) {
      setIsGated(true);
      return;
    }

    // Reset scroll before swipe
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;

    gsap.to(cardRef.current, {
      x: direction === 'left' ? -1000 : 1000,
      opacity: 0,
      rotate: direction === 'left' ? -40 : 40,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex(prev => prev + 1);
        setSwipeCount(prev => prev + 1);
        gsap.fromTo(cardRef.current, { x: 0, opacity: 0, rotate: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 });
      }
    });
  };

  if (isGated) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-10 animate-in zoom-in-95 duration-500">
        <div className="w-40 h-40 bg-yellow-400 text-black rounded-[60px] flex items-center justify-center shadow-2xl shadow-yellow-400/30">
            <Crown size={80} />
        </div>
        <div className="space-y-4">
          <h2 className="text-6xl font-black tracking-tighter leading-none uppercase">SIGNAL REACHED.</h2>
          <p className="opacity-40 text-xl max-w-sm mx-auto">Free orbit limit reached. Upgrade to Premium for infinite global resonance and soul connections.</p>
        </div>
        <button 
          onClick={openUpgrade}
          className="bg-yellow-400 text-black px-12 py-6 rounded-[30px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-yellow-400/30 hover:scale-105 active:scale-95 transition-all"
        >
          Unlock Infinite Soul
        </button>
        <button onClick={() => setIsGated(false)} className="text-[10px] font-black uppercase tracking-widest opacity-30">Maybe Later</button>
      </div>
    );
  }

  const profile = mockProfiles[currentIndex];

  if (currentIndex >= mockProfiles.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-10">
        <div className="w-40 h-40 bg-yellow-400 rounded-[60px] flex items-center justify-center animate-bounce shadow-2xl shadow-yellow-400/20">
            <Heart size={80} className="text-black fill-black" />
        </div>
        <div className="space-y-4">
          <h2 className="text-6xl font-black tracking-tighter leading-none">GLOBAL REACH.</h2>
          <p className="opacity-40 text-xl max-w-sm mx-auto">You've reached the end of your current orbit. New souls join every minute.</p>
        </div>
        <button onClick={() => setCurrentIndex(0)} className="interactive bg-black dark:bg-white text-white dark:text-black px-12 py-6 rounded-[30px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl">Reset Resonance</button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full flex flex-col relative bg-white dark:bg-black overflow-hidden">
      
      {/* SCROLLABLE PROFILE VIEW */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div ref={cardRef} className="max-w-3xl mx-auto px-4 md:px-8 py-4 lg:py-12 space-y-8">
            
            {/* HERO IMAGE CARD */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full rounded-[60px] overflow-hidden shadow-2xl group border-4 border-yellow-400/20">
              <img src={profile.img} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-8 right-8">
                 <div className="p-4 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 text-yellow-400">
                   <ShieldCheck size={24} />
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 space-y-4">
                 <div className="flex items-center gap-3 px-4 py-2 bg-yellow-400 rounded-2xl w-fit shadow-xl">
                     <ShieldCheck size={18} className="text-black" />
                     <span className="text-xs font-black text-black uppercase tracking-widest">Resonance Verified</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{profile.name}, {profile.age}</h2>
                 <div className="flex flex-wrap gap-6 text-white/80 font-bold text-lg">
                   <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"><MapPin size={20} className="text-yellow-400" /> {profile.location}</div>
                   <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"><Briefcase size={20} className="text-yellow-400" /> {profile.role || "Soul"}</div>
                 </div>
              </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="flex flex-col items-center gap-2 opacity-30 animate-pulse py-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll for resonance details</span>
               <ChevronDown size={20} />
            </div>

            {/* DETAILED INFO SECTION */}
            <ProfileDetailView profile={profile} />
        </div>
      </div>

      {/* FLOATING ACTION BAR - STAYS FIXED AT BOTTOM */}
      <div className="absolute bottom-8 left-0 w-full px-8 pointer-events-none z-50">
          <div className="max-w-sm mx-auto flex items-center justify-center gap-8 pointer-events-auto">
              <button 
                onClick={() => handleSwipe('left')} 
                className="interactive w-20 h-20 bg-white dark:bg-white/10 border-4 border-black/5 dark:border-white/10 rounded-full flex items-center justify-center dark:text-white text-black hover:bg-black hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <X size={36} />
              </button>
              
              <button onClick={() => !isPremium ? openUpgrade() : null} className="interactive w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:scale-110 shadow-[0_25px_60px_rgba(250,204,21,0.4)] transition-all relative">
                <Star size={40} fill="currentColor" />
                {!isPremium && <Lock size={12} className="absolute top-4 right-4 text-red-500" />}
              </button>
              
              <button 
                onClick={() => handleSwipe('right')} 
                className="interactive w-20 h-20 bg-white dark:bg-white/10 border-4 border-black/5 dark:border-white/10 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-yellow-400 hover:text-black transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <Heart size={36} fill="currentColor" />
              </button>
          </div>
      </div>

      {/* GRADIENT FADE OVER ACTION BAR */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-40"></div>
    </div>
  );
};

export default Discover;
