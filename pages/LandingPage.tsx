
import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Steps from '../components/Steps';
import GlobalMap from '../components/GlobalMap';
import Testimonials from '../components/Testimonials';
import gsap from 'gsap';
import { ArrowUpRight, Shield, Zap, Target, Infinity, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const philosophyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.to('body', { opacity: 1, duration: 1 });
    
    const ctx = gsap.context(() => {
      gsap.from('.phi-text', {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
      });
    }, philosophyRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      <Hero />
      
      {/* Marquee */}
      <section className="bg-yellow-400 py-3 overflow-hidden whitespace-nowrap border-y-2 border-black">
        <div className="flex gap-12 animate-[marquee_25s_linear_infinite]">
            {[1,2,3,4,5,6].map(i => (
                <span key={i} className="text-black text-lg font-black uppercase tracking-tighter flex items-center gap-3">
                    Genuine Hearts <Sparkles size={14} /> Borderless Love <Sparkles size={14} /> Authentic Souls
                </span>
            ))}
        </div>
      </section>

      {/* The Aura Philosophy */}
      <section ref={philosophyRef} className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2 space-y-6">
                    <span className="phi-text text-yellow-400 font-bold uppercase tracking-[0.5em] text-[9px] block">The Philosophy</span>
                    <h2 className="phi-text text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase text-white">REJECT THE <span className="text-white/20">SURFACE.</span></h2>
                    <p className="phi-text text-base md:text-lg text-white/50 font-light leading-relaxed">
                        In a world of digital noise, Aura is the frequency of truth. We don't match you based on photos; we match you based on the <span className="text-white font-medium italic">Aura</span> you project into the world—your values, your energy, and your silent intentions.
                    </p>
                    <div className="phi-text pt-4">
                        <button className="interactive group flex items-center gap-2 text-base font-bold text-white">
                            <span className="border-b border-yellow-400 pb-0.5">Read Manifesto</span>
                            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                                <ArrowUpRight size={16} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2 relative phi-text">
                    <div className="aspect-video rounded-[40px] bg-gradient-to-br from-yellow-400/20 to-transparent p-0.5">
                        <div className="w-full h-full rounded-[38px] overflow-hidden bg-black">
                             <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000" alt="Connection" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Steps />

      {/* Bento Grid Features */}
      <section className="py-16 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">ENGINEERED <br />FOR <span className="text-yellow-500">TRUST.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <div className="md:col-span-2 md:row-span-2 bg-black rounded-[32px] p-6 text-white flex flex-col justify-between overflow-hidden group relative">
                <div className="relative z-10">
                    <Shield className="text-yellow-400 mb-4" size={32} />
                    <h3 className="text-2xl font-black mb-3">Identity Aura™</h3>
                    <p className="text-white/50 text-base max-w-sm">Every soul you meet is verified, authentic, and present.</p>
                </div>
                <div className="absolute bottom-[-10%] right-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <Shield size={200} />
                </div>
            </div>
            <div className="bg-yellow-400 rounded-[32px] p-6 flex flex-col justify-between interactive group">
                <Zap size={28} className="group-hover:rotate-12 transition-transform" />
                <div>
                    <h3 className="text-lg font-black mb-0.5 uppercase tracking-tight">Real-Time Sync</h3>
                    <p className="text-[10px] font-bold opacity-70 leading-tight uppercase">Instant global alerts.</p>
                </div>
            </div>
            <div className="bg-black/5 rounded-[32px] p-6 flex flex-col justify-between interactive group border border-black/10">
                <Target size={28} className="group-hover:scale-110 transition-transform" />
                <div>
                    <h3 className="text-lg font-black mb-0.5 uppercase tracking-tight">Precision Match</h3>
                    <p className="text-[10px] font-bold opacity-50 leading-tight uppercase">Cognitive alignment.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalMap />

      <Testimonials />

      {/* Final CTA */}
      <section className="py-20 px-6 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black leading-[0.9] mb-8 tracking-tighter uppercase">LOVE IS <br />CLOSER THAN <br /><span className="italic font-light">YOU THINK.</span></h2>
            <button 
                onClick={() => navigate('/auth')}
                className="interactive bg-black text-white text-xl md:text-2xl font-black px-10 py-5 rounded-full hover:scale-105 transition-all active:scale-95 flex items-center gap-3 mx-auto group shadow-2xl"
            >
                JOIN THE ELITE
                <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
            <div className="mt-12 flex justify-center items-center gap-4">
                <div className="h-px flex-1 bg-black/10"></div>
                <span className="text-black/30 font-black tracking-[0.4em] text-[7px]">10M+ WORLDWIDE</span>
                <div className="h-px flex-1 bg-black/10"></div>
            </div>
        </div>
      </section>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
