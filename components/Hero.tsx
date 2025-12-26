
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Heart, Globe, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.8 })
        .from('.char', { 
          y: 40, 
          opacity: 0, 
          stagger: 0.05, 
          duration: 1, 
          skewY: 5 
        }, "-=0.4")
        .from('.hero-sub', { y: 20, opacity: 0, duration: 1 }, "-=0.6")
        .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.8")
        .from('.hero-stats', { opacity: 0, duration: 1 }, "-=0.5");

      const handleParallax = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.parallax-layer', { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleParallax);

      gsap.to('.glow-ball', {
        scale: 1.1,
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  const scrollToSection = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-12 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-ball absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-yellow-400/10 blur-[60px] rounded-full"></div>
        <div className="glow-ball absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-yellow-400/5 blur-[80px] rounded-full"></div>
        
        <div className="parallax-layer absolute inset-0 flex items-center justify-center opacity-5">
          <Globe size={400} strokeWidth={0.2} className="dark:text-white text-black animate-[spin_60s_linear_infinite]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <div className="hero-badge inline-flex items-center gap-2 dark:bg-white/5 bg-black/5 backdrop-blur-md border dark:border-white/10 border-black/10 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="text-yellow-400" size={12} />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] dark:text-white/80 text-black/80">The Future of Intimacy</span>
        </div>

        <h1 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-4 overflow-hidden dark:text-white text-black">
          {splitText("DEEPER")}<br />
          <span className="text-yellow-400">{splitText("CONNECTIONS")}</span>
        </h1>

        <p className="hero-sub text-sm md:text-base dark:text-white/60 text-black/60 max-w-xl mx-auto mb-8 leading-relaxed font-light">
          Aura is a sanctuary for souls who seek more than a swipe. We transcend borders to find resonance that exists between us all.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/auth', { state: { register: true } })}
            className="interactive group relative bg-yellow-400 text-black px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-3 overflow-hidden transition-all shadow-lg"
          >
            <span className="relative z-10 uppercase tracking-widest text-xs">BEGIN JOURNEY</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={scrollToSection}
            className="interactive dark:text-white/60 text-black/60 hover:text-black dark:hover:text-white text-xs font-bold flex items-center gap-2 transition-colors border-b border-transparent hover:border-yellow-400 pb-0.5"
          >
            <Heart size={14} className="text-yellow-400" />
            PHILOSOPHY
          </button>
        </div>

        <div className="hero-stats mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 dark:text-white text-black">
           <div><div className="text-xl font-black">12M+</div><div className="text-[7px] uppercase tracking-widest font-bold">Matches</div></div>
           <div><div className="text-xl font-black">190+</div><div className="text-[7px] uppercase tracking-widest font-bold">Countries</div></div>
           <div><div className="text-xl font-black">4.9/5</div><div className="text-[7px] uppercase tracking-widest font-bold">Rating</div></div>
           <div><div className="text-xl font-black">84%</div><div className="text-[7px] uppercase tracking-widest font-bold">Success</div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;