
import React, { useContext } from 'react';
import { Heart, Sparkles, Shield, Crown } from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

const likes = [
  { name: 'Jane Doe', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', new: true },
  { name: 'Kemi O.', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400', new: false },
  { name: 'Sofia R.', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400', new: false },
];

const LikedYou: React.FC = () => {
  const { isPremium, openUpgrade } = useContext(PremiumContext);

  return (
    <div className="h-full overflow-y-auto no-scrollbar p-6 lg:p-12 space-y-12 pb-32">
      <div className="space-y-4">
        <h2 className="text-4xl lg:text-7xl font-black tracking-tighter">LIKED YOU.</h2>
        {!isPremium && (
          <div className="p-8 bg-yellow-400 text-black rounded-[40px] space-y-6 shadow-2xl shadow-yellow-400/20 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/5 blur-3xl rounded-full"></div>
             <div className="flex items-center gap-4 relative z-10">
                <Crown size={32} />
                <span className="font-black text-xs uppercase tracking-[0.4em]">Upgrade to Unlock</span>
             </div>
             <p className="text-lg font-bold opacity-80 leading-snug relative z-10">Multiple souls are currently vibrating on your frequency. Upgrade to Premium for <strong>$9.99/mo</strong> to reveal who is waiting for your resonance.</p>
             <button onClick={openUpgrade} className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase relative z-10 hover:scale-105 active:scale-95 transition-all">Go Premium Now</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {likes.map((l, i) => (
          <div key={i} className="group relative aspect-[4/5] rounded-[50px] overflow-hidden border-4 border-yellow-400/20 shadow-xl">
             <img src={l.img} alt="Locked" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isPremium ? 'grayscale group-hover:grayscale-0' : 'blur-3xl opacity-50 grayscale'}`} />
             
             {!isPremium ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                     <Heart size={40} fill="white" className="animate-pulse" />
                  </div>
                  {l.new && <span className="px-5 py-2 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">New Signal</span>}
               </div>
             ) : (
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h4 className="text-white font-black text-2xl tracking-tighter">{l.name}</h4>
                  <span className="text-yellow-400 text-[8px] font-black uppercase tracking-widest">Resonance Match</span>
               </div>
             )}
             
             <div className="absolute bottom-4 w-full px-4">
                 <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    {!isPremium && <div className="h-full bg-yellow-400/30 w-1/3"></div>}
                 </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedYou;
