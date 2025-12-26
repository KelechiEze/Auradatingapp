
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart, Globe, Users, ShieldCheck, Sparkles, MessageCircle, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.reveal-trigger',
          start: 'top 80%'
        }
      });

      gsap.to('.float-img', {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white pt-40 selection:bg-yellow-400 selection:text-black">
      {/* Intro Hero */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-6 py-2 rounded-full mb-10 border border-yellow-400/20">
            <Heart size={16} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Our Manifesto</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12 reveal-trigger reveal">
          BORN FOR <br /><span className="text-yellow-400">DEPTH.</span>
        </h1>
        <p className="text-2xl md:text-4xl text-white/40 leading-tight reveal">
          In a digital landscape filled with surface-level echoes, Aura was created to amplify the <span className="text-white italic">soul's frequency.</span>
        </p>
      </section>

      {/* Narrative Section */}
      <section className="px-6 py-40 bg-white text-black rounded-[100px] z-10 relative">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-10">
                    <h2 className="text-6xl font-black tracking-tighter leading-none reveal">NOT JUST <br />ANOTHER <span className="text-yellow-500">APP.</span></h2>
                    <p className="text-xl text-black/60 leading-relaxed reveal">
                        The current dating paradigm is broken. It prioritizes the visual over the spiritual, the immediate over the eternal. We believe that true connection happens in the spaces between words, in shared values, and in a global outlook that sees no borders.
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-10 reveal">
                        <div className="p-8 bg-black/5 rounded-[40px] border border-black/5 hover:border-yellow-400 transition-colors">
                            <Star className="text-yellow-500 mb-4" />
                            <h4 className="font-black text-xl mb-2">Soul-First</h4>
                            <p className="text-sm opacity-50">Focusing on psychological and spiritual alignment above all.</p>
                        </div>
                        <div className="p-8 bg-black/5 rounded-[40px] border border-black/5 hover:border-yellow-400 transition-colors">
                            <Globe className="text-yellow-500 mb-4" />
                            <h4 className="font-black text-xl mb-2">World-Wide</h4>
                            <p className="text-sm opacity-50">Bridging cultures through shared human experience.</p>
                        </div>
                    </div>
                </div>
                <div className="relative reveal">
                    <div className="float-img relative z-10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
                        <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000" alt="Culture" className="w-full aspect-[4/5] object-cover" />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-black/5 rounded-[60px] -z-10 translate-x-4 translate-y-4"></div>
                    <div className="absolute top-1/2 -right-12 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                        <MessageCircle size={32} className="text-black" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* The Pillars */}
      <section className="px-6 py-40">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 reveal">THE PILLARS OF <br /><span className="text-white/20">OUR SANCTUARY.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: ShieldCheck, title: "RADICAL SAFETY", desc: "Aura uses military-grade identity verification and behavioral AI to ensure every interaction is safe, respectful, and genuine." },
                    { icon: Sparkles, title: "SOUL MATCHING", desc: "Our Resonance Engine uses deep psychological mapping to connect you with souls who vibrate at your specific frequency." },
                    { icon: Users, title: "GLOBAL CITIZENS", desc: "We are a community of world-travelers, dreamers, and global thinkers. We celebrate the beauty of cross-cultural love." }
                ].map((pillar, i) => (
                    <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[50px] hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-700 reveal">
                        <pillar.icon size={60} className="text-yellow-400 group-hover:text-black mb-10 transition-colors" />
                        <h3 className="text-3xl font-black mb-6 group-hover:text-black">{pillar.title}</h3>
                        <p className="text-white/40 group-hover:text-black/70 leading-relaxed text-lg">{pillar.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="px-6 py-40 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-12 flex items-center justify-center text-black">
                  <Sparkles size={40} />
              </div>
              <blockquote className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic mb-12 reveal">
                  "We didn't build an app for swiping. We built a bridge for the brave souls who know their person is out there, somewhere on this beautiful planet."
              </blockquote>
              <div className="reveal">
                  <h5 className="text-xl font-bold uppercase tracking-widest text-yellow-400">Julian Saint-Clair</h5>
                  <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-black mt-2">Visionary & Founder</p>
              </div>
          </div>
      </section>
    </div>
  );
};

export default AboutPage;
