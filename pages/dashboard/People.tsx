
import React, { useState } from 'react';
import { Search, Filter, MapPin, X, ShieldCheck, Briefcase } from 'lucide-react';
import { mockProfiles, ProfileDetailView } from './Discover';

const People: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  return (
    <div className="h-full overflow-y-auto no-scrollbar p-6 lg:p-12 space-y-8 relative">
      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-3xl p-0 lg:p-12 overflow-y-auto no-scrollbar scroll-smooth animate-in fade-in duration-500"
          onClick={() => setSelectedProfile(null)}
        >
           <div 
            className="max-w-4xl mx-auto bg-white dark:bg-black lg:rounded-[60px] relative shadow-2xl border dark:border-white/10 border-black/5"
            onClick={(e) => e.stopPropagation()}
           >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProfile(null)}
                className="fixed lg:absolute top-8 right-8 z-[60] w-14 h-14 bg-yellow-400 text-black rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col">
                 {/* Hero Header (Image) */}
                 <div className="relative aspect-[3/4] md:aspect-[16/10] w-full overflow-hidden">
                    <img src={selectedProfile.img} alt={selectedProfile.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 space-y-4">
                       <div className="flex items-center gap-3 px-4 py-2 bg-yellow-400 rounded-xl w-fit">
                          <ShieldCheck size={18} className="text-black" />
                          <span className="text-[10px] font-black text-black uppercase tracking-widest">Verified Resonance</span>
                       </div>
                       <h2 className="text-7xl font-black text-white tracking-tighter leading-none">{selectedProfile.name}, {selectedProfile.age}</h2>
                       <div className="flex gap-4 text-white/70 font-bold text-lg">
                          <div className="flex items-center gap-2"><MapPin size={20} className="text-yellow-400" /> {selectedProfile.location}</div>
                          <div className="flex items-center gap-2"><Briefcase size={20} className="text-yellow-400" /> {selectedProfile.role || "Soul"}</div>
                       </div>
                    </div>
                 </div>

                 {/* Detail Body */}
                 <div className="p-12 lg:p-20">
                    <ProfileDetailView profile={selectedProfile} />
                 </div>
              </div>
           </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-4xl lg:text-7xl font-black tracking-tighter">PEOPLE.</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20" size={18} />
             <input placeholder="Search souls..." className="w-full py-5 pl-16 pr-6 dark:bg-white/5 bg-slate-100 rounded-[30px] outline-none focus:border-yellow-400 border border-transparent transition-all font-bold" />
          </div>
          <button className="w-16 h-16 dark:bg-white/5 bg-slate-100 rounded-[30px] flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all">
             <Filter size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 pb-32">
        {mockProfiles.map((u, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedProfile(u)}
            className="group relative aspect-[4/5] rounded-[50px] overflow-hidden shadow-lg shadow-black/5 hover:scale-[1.05] transition-all cursor-pointer border-2 border-transparent hover:border-yellow-400"
          >
             <img src={u.img} alt={u.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
             
             {u.verified && (
               <div className="absolute top-6 right-6 p-2.5 bg-yellow-400 text-black rounded-2xl scale-0 group-hover:scale-100 transition-transform shadow-xl">
                  <ShieldCheck size={20} />
               </div>
             )}

             <div className="absolute bottom-8 left-8">
                <h3 className="text-white font-black text-2xl tracking-tight leading-none mb-1">{u.name}</h3>
                <div className="flex items-center gap-1 text-white/60 text-[10px] font-black uppercase tracking-widest">
                   <MapPin size={12} className="text-yellow-400" />
                   {u.location}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
