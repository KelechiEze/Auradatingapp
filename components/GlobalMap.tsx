
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, MapPin, Sparkles } from 'lucide-react';

const profiles = [
  { name: 'Elena', country: 'Brazil', img: 'https://picsum.photos/id/64/400/400', top: '25%', left: '30%' },
  { name: 'Kenji', country: 'Japan', img: 'https://picsum.photos/id/65/400/400', top: '35%', left: '80%' },
  { name: 'Sarah', country: 'UK', img: 'https://picsum.photos/id/66/400/400', top: '15%', left: '48%' },
  { name: 'Mateo', country: 'Spain', img: 'https://picsum.photos/id/67/400/400', top: '22%', left: '42%' },
  { name: 'Aisha', country: 'Kenya', img: 'https://picsum.photos/id/68/400/400', top: '55%', left: '55%' },
  { name: 'Liam', country: 'Australia', img: 'https://picsum.photos/id/91/400/400', top: '75%', left: '85%' },
];

const GlobalMap: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-dot', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out(2)'
      });

      // Animate SVG path drawing
      gsap.from('.map-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        },
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
        duration: 3,
        ease: 'power2.inOut',
        stagger: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="explore" ref={containerRef} className="py-40 px-6 bg-white text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20 items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-6 bg-yellow-500/5 px-4 py-1 rounded-full">
               <Globe size={18} />
               <span className="font-black uppercase tracking-[0.3em] text-[10px]">Real-Time Global Resonance</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">THE WORLD <br /> <span className="text-yellow-500">IS YOURS.</span></h2>
          </div>
          <p className="text-black/50 max-w-md text-xl leading-relaxed pb-2">
            Distance is a construct. Our proprietary resonance mapping technology bridges thousands of miles in a heartbeat.
          </p>
        </div>

        <div className="relative aspect-[21/9] w-full bg-black rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-8 border-black">
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>

          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
             {/* Dynamic lines connecting dots (Simplified conceptual paths) */}
             <path className="map-line" d="M 30% 25% Q 40% 10% 48% 15%" stroke="#FACC15" fill="none" strokeWidth="2" strokeDasharray="5,5" />
             <path className="map-line" d="M 48% 15% Q 65% 5% 80% 35%" stroke="#FACC15" fill="none" strokeWidth="2" strokeDasharray="5,5" />
             <path className="map-line" d="M 30% 25% Q 40% 40% 55% 55%" stroke="#FACC15" fill="none" strokeWidth="2" strokeDasharray="5,5" />
             <path className="map-line" d="M 55% 55% Q 70% 65% 85% 75%" stroke="#FACC15" fill="none" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
          
          {profiles.map((p, i) => (
            <div 
              key={i}
              className="profile-dot absolute group cursor-pointer z-10"
              style={{ top: p.top, left: p.left }}
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-[30px] border-4 border-yellow-400 bg-black shadow-2xl overflow-hidden transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                
                {/* Aura Pulse */}
                <div className="absolute inset-0 bg-yellow-400 rounded-[30px] animate-ping opacity-10 group-hover:opacity-40 transition-opacity -z-10"></div>
                
                {/* Tooltip Card */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 bg-white text-black p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0 w-48 shadow-2xl border border-black/5">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-black text-sm">{p.name}</span>
                   </div>
                   <p className="text-[10px] text-black/40 uppercase font-bold tracking-widest mb-3">{p.country}</p>
                   <div className="flex items-center justify-between">
                       <div className="flex -space-x-1">
                           {[1,2,3].map(j => <div key={j} className="w-4 h-4 rounded-full bg-yellow-400 border border-white" />)}
                       </div>
                       <Sparkles size={12} className="text-yellow-500" />
                   </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute top-12 left-12 p-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] hidden lg:block">
              <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs font-black tracking-widest uppercase">Global Activity</span>
                  </div>
                  <div className="text-5xl font-black mb-2">1,248,392</div>
                  <p className="text-white/40 text-sm">Souls connected in the last 24h</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
