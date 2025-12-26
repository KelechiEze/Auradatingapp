
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
        y: 100,
        opacity: 0,
        duration: 1.5,
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
      <section className="bg-yellow-400 py-6 overflow-hidden whitespace-nowrap border-y-4 border-black">
        <div className="flex gap-20 animate-[marquee_25s_linear_infinite]">
            {[1,2,3,4,5,6].map(i => (
                <span key={i} className="text-black text-2xl font-black uppercase tracking-tighter flex items-center gap-6">
                    Genuine Hearts <Sparkles size={20} /> Borderless Love <Sparkles size={20} /> Authentic Souls
                </span>
            ))}
        </div>
      </section>

      {/* The Aura Philosophy */}
      <section ref={philosophyRef} className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2 space-y-12">
                    <span className="phi-text text-yellow-400 font-bold uppercase tracking-[0.5em] text-xs block">The Philosophy</span>
                    <h2 className="phi-text text-5xl md:text-8xl font-black tracking-tighter leading-none">REJECT THE <br /><span className="text-white/20">SURFACE.</span></h2>
                    <p className="phi-text text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                        In a world of digital noise, Aura is the frequency of truth. We don't match you based on photos; we match you based on the <span className="text-white font-medium italic">Aura</span> you project into the world—your values, your energy, and your silent intentions.
                    </p>
                    <div className="phi-text pt-10">
                        <button className="interactive group flex items-center gap-4 text-xl font-bold">
                            <span className="border-b-2 border-yellow-400 pb-1">Read the Manifesto</span>
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                                <ArrowUpRight />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2 relative phi-text">
                    <div className="aspect-square rounded-[100px] bg-gradient-to-br from-yellow-400/20 to-transparent p-1">
                        <div className="w-full h-full rounded-[98px] overflow-hidden bg-black">
                             <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000" alt="Connection" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 border border-yellow-400/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                </div>
            </div>
        </div>
      </section>

      <Steps />

      {/* Bento Grid Features */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter">ENGINEERED <br />FOR <span className="text-yellow-500">TRUST.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 md:row-span-2 bg-black rounded-[40px] p-12 text-white flex flex-col justify-between overflow-hidden group relative">
                <div className="relative z-10">
                    <Shield className="text-yellow-400 mb-8" size={60} />
                    <h3 className="text-4xl font-black mb-6">Identity Aura™ Verification</h3>
                    <p className="text-white/50 text-xl max-w-md">Our multi-layered verification system ensures every soul you meet is verified, authentic, and present.</p>
                </div>
                <div className="absolute bottom-[-10%] right-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <Shield size={400} />
                </div>
            </div>
            <div className="bg-yellow-400 rounded-[40px] p-10 flex flex-col justify-between interactive group">
                <Zap size={48} className="group-hover:rotate-12 transition-transform" />
                <div>
                    <h3 className="text-2xl font-black mb-2">Real-Time Resonance</h3>
                    <p className="font-medium opacity-70 leading-tight">Instant connection alerts when a compatible soul enters your global orbit.</p>
                </div>
            </div>
            <div className="bg-black/5 rounded-[40px] p-10 flex flex-col justify-between interactive group border border-black/10">
                <Target size={48} className="group-hover:scale-110 transition-transform" />
                <div>
                    <h3 className="text-2xl font-black mb-2">Precision Matching</h3>
                    <p className="font-medium opacity-50 leading-tight">Advanced cognitive modeling to align values, goals, and global aspirations.</p>
                </div>
            </div>
            <div className="md:col-span-3 bg-black/5 rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-12 border border-black/10">
                <div className="flex-1">
                    <h3 className="text-4xl font-black mb-4">A Universe of Possibility.</h3>
                    <p className="text-xl opacity-60">Access exclusive global events, travel meetups, and cross-cultural workshops designed to bridge the world.</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-black text-yellow-400 flex items-center justify-center"><Infinity size={32} /></div>
                    <div className="px-8 py-4 bg-black text-white rounded-full font-bold flex items-center gap-2">EXPLORE EVENTS <ArrowUpRight /></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalMap />

      <Testimonials />

      {/* Final CTA */}
      <section className="py-40 px-6 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="text-7xl md:text-[140px] font-black text-black leading-[0.8] mb-16 tracking-tighter">LOVE IS <br />CLOSER THAN <br /><span className="italic font-light">YOU THINK.</span></h2>
            <button 
                onClick={() => navigate('/auth')}
                className="interactive bg-black text-white text-3xl md:text-5xl font-black px-20 py-10 rounded-full hover:scale-105 transition-all active:scale-95 flex items-center gap-8 mx-auto group shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            >
                JOIN THE ELITE
                <ArrowUpRight size={56} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
            </button>
            <div className="mt-20 flex justify-center items-center gap-10">
                <div className="h-px flex-1 bg-black/20"></div>
                <span className="text-black/40 font-black tracking-[0.5em] text-xs">TRUSTED BY 10M+ WORLDWIDE</span>
                <div className="h-px flex-1 bg-black/20"></div>
            </div>
        </div>
      </section>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
