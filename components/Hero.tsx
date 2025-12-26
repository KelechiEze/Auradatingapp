
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
          y: 100, 
          opacity: 0, 
          stagger: 0.05, 
          duration: 1, 
          skewY: 10 
        }, "-=0.4")
        .from('.hero-sub', { y: 20, opacity: 0, duration: 1 }, "-=0.6")
        .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.8 }, "-=0.8")
        .from('.hero-stats', { opacity: 0, duration: 1 }, "-=0.5");

      const handleParallax = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        gsap.to('.parallax-layer', { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleParallax);

      gsap.to('.glow-ball', {
        scale: 1.2,
        opacity: 0.4,
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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-ball absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full"></div>
        <div className="glow-ball absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/5 blur-[150px] rounded-full"></div>
        
        <div className="parallax-layer absolute inset-0 flex items-center justify-center opacity-10">
          <Globe size={800} strokeWidth={0.2} className="dark:text-white text-black animate-[spin_60s_linear_infinite]" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl text-center">
        <div className="hero-badge inline-flex items-center gap-2 dark:bg-white/5 bg-black/5 backdrop-blur-md border dark:border-white/10 border-black/10 px-6 py-2 rounded-full mb-10">
          <Sparkles className="text-yellow-400" size={16} />
          <span className="text-xs font-bold uppercase tracking-[0.3em] dark:text-white/80 text-black/80">The Future of Global Intimacy</span>
        </div>

        <h1 ref={headlineRef} className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.85] mb-10 overflow-hidden dark:text-white text-black">
          {splitText("DEEPER")}<br />
          <span className="text-yellow-400">{splitText("CONNECTIONS")}</span>
        </h1>

        <p className="hero-sub text-lg md:text-2xl dark:text-white/60 text-black/60 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
          Aura is a sanctuary for souls who seek more than a swipe. We transcend borders to find the resonance that exists between us all.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={() => navigate('/onboarding')}
            className="interactive group relative bg-yellow-400 text-black px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-4 overflow-hidden transition-all shadow-[0_20px_50px_rgba(250,204,21,0.2)]"
          >
            <span className="relative z-10">BEGIN THE JOURNEY</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <button 
            onClick={scrollToSection}
            className="interactive dark:text-white/60 text-black/60 hover:text-black dark:hover:text-white font-bold flex items-center gap-3 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
          >
            <Heart size={20} className="text-yellow-400" />
            LEARN THE PHILOSOPHY
          </button>
        </div>

        <div className="hero-stats mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 dark:text-white text-black">
           <div><div className="text-3xl font-black">12M+</div><div className="text-[10px] uppercase tracking-widest font-bold">Matches Made</div></div>
           <div><div className="text-3xl font-black">190+</div><div className="text-[10px] uppercase tracking-widest font-bold">Countries</div></div>
           <div><div className="text-3xl font-black">4.9/5</div><div className="text-[10px] uppercase tracking-widest font-bold">Soul Rating</div></div>
           <div><div className="text-3xl font-black">84%</div><div className="text-[10px] uppercase tracking-widest font-bold">Long Term</div></div>
        </div>
      </div>

      <button 
        onClick={scrollToSection}
        className="interactive absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold dark:text-white text-black">Scroll to Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-yellow-400 to-transparent flex justify-center">
            <ChevronDown className="text-yellow-400 mt-2 animate-bounce" size={20} />
        </div>
      </button>
    </section>
  );
};

export default Hero;
