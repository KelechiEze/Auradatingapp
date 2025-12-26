
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UserCircle, Search, MessageCircle, Heart, ShieldCheck, Sparkles, Zap, Globe } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    title: "The Identity Aura",
    desc: "Create a soul-profile that captures your essence, not just your angles. Share your dreams and frequency."
  },
  {
    icon: Sparkles,
    title: "Resonance Matching",
    desc: "Our engine bypasses the superficial, matching souls on deep-rooted values and life-path compatibility."
  },
  {
    icon: MessageCircle,
    title: "Infinite Connection",
    desc: "Break boundaries with our bridge technology. Chat with native translation and cultural insights."
  },
  {
    icon: Heart,
    title: "Beyond the Digital",
    desc: "From virtual presence to physical reality. We facilitate global meetups and curated experiences."
  }
];

const Steps: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 px-6 dark:bg-black bg-white transition-colors duration-700 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-yellow-400 font-black uppercase tracking-[0.3em] text-[8px] block mb-1.5">The Journey</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter dark:text-white text-black leading-none uppercase">THE PATH TO <span className="text-yellow-400">UNITY.</span></h2>
          </div>
          <p className="dark:text-white/40 text-black/50 max-w-sm text-sm leading-relaxed italic">
            "A connection without boundaries is a life without limits."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card group relative z-10 dark:bg-white/5 bg-slate-50 p-6 rounded-[30px] border dark:border-white/10 border-black/5 hover:border-yellow-400 transition-all duration-500">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform shadow-md shadow-yellow-400/10">
                <step.icon size={22} />
              </div>
              <h3 className="text-lg font-black mb-2 tracking-tighter leading-tight">{step.title}</h3>
              <p className="dark:text-white/50 text-black/60 font-light leading-relaxed text-xs">{step.desc}</p>
              <div className="absolute top-4 right-4 text-2xl font-black dark:text-white/5 text-black/5 select-none pointer-events-none">0{idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
