
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UserCircle, Search, MessageCircle, Heart, ShieldCheck, Sparkles, Zap, Globe } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    title: "The Identity Aura",
    desc: "Create a soul-profile that captures your essence, not just your angles. Share your dreams, your frequency, and your global vision."
  },
  {
    icon: Sparkles,
    title: "Resonance Matching",
    desc: "Our engine bypasses the superficial, matching souls on deep-rooted values, emotional intelligence, and life-path compatibility."
  },
  {
    icon: MessageCircle,
    title: "Infinite Connection",
    desc: "Break boundaries with our bridge technology. Chat with native translation and cultural insights that make every word matter."
  },
  {
    icon: Heart,
    title: "Beyond the Digital",
    desc: "From virtual presence to physical reality. We facilitate global meetups and curated experiences for souls to unite in person."
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
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
      });

      gsap.from('.progress-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: true
        },
        scaleX: 0,
        transformOrigin: 'left'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-40 px-6 dark:bg-black bg-white transition-colors duration-700 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-xs block mb-4">The Journey</span>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter dark:text-white text-black leading-none">THE PATH TO <br /><span className="text-yellow-400">UNITY.</span></h2>
          </div>
          <p className="dark:text-white/40 text-black/50 max-w-sm text-xl leading-relaxed italic">
            "A connection without boundaries is a life without limits."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-[20%] left-0 w-full h-[2px] dark:bg-white/5 bg-black/5 z-0">
             <div className="progress-line h-full w-full bg-yellow-400/30"></div>
          </div>

          {steps.map((step, idx) => (
            <div key={idx} className="step-card group relative z-10 dark:bg-white/5 bg-slate-50 p-12 rounded-[50px] border dark:border-white/10 border-black/5 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-4">
              <div className="w-20 h-20 bg-yellow-400 rounded-[28px] flex items-center justify-center text-black mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-lg shadow-yellow-400/20">
                <step.icon size={36} />
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter leading-none">{step.title}</h3>
              <p className="dark:text-white/50 text-black/60 font-light leading-relaxed text-lg">{step.desc}</p>
              <div className="absolute top-10 right-10 text-6xl font-black dark:text-white/5 text-black/5 select-none pointer-events-none">0{idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
