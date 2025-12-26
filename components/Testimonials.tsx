
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const stories = [
  {
    name: "Oliver & Maya",
    from: "London to Tokyo",
    story: "We were 6,000 miles apart, but Aura made us feel like we were in the same room. Six months later, I'm moving to Japan to start our next chapter!",
    img: "https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Carlos & Elena",
    from: "Madrid to Lisbon",
    story: "It started with a simple 'Shared Interest' prompt about obscure jazz. Now we share a life and a record collection that connects our souls.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Liam & Sophia",
    from: "New York to Paris",
    story: "Authenticity is rare in dating. Aura's focus on deep resonance led me to the woman of my dreams in the City of Light. Forever grateful.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Amara & Kofi",
    from: "Lagos to Berlin",
    story: "I never thought my soulmate would be halfway across the continent. Aura's cultural intelligence made our first meeting effortless.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Jade & Chen",
    from: "Vancouver to Shanghai",
    story: "The translation tools are a game changer. We connected through art when words were hard. Now, words aren't needed at all.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state to avoid flicker
      gsap.set('.story-card', { opacity: 0, x: 50 });

      gsap.to('.story-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="py-40 px-6 dark:bg-black bg-slate-50 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter dark:text-white text-black leading-none mb-4">
              SUCCESS <br /><span className="text-yellow-400">STORIES.</span>
            </h2>
            <p className="dark:text-white/40 text-black/40 text-xl font-light">Join thousands of souls who found their resonance.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
                onClick={() => scroll('left')}
                className="interactive w-16 h-16 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white text-black dark:hover:bg-white hover:bg-black hover:text-white dark:hover:text-black transition-all"
                aria-label="Previous story"
            >
                <ChevronLeft size={32} />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="interactive w-16 h-16 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white text-black dark:hover:bg-white hover:bg-black hover:text-white dark:hover:text-black transition-all"
                aria-label="Next story"
            >
                <ChevronRight size={32} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-10 overflow-x-auto pb-12 snap-x no-scrollbar">
          {stories.map((s, i) => (
            <div key={i} className="story-card min-w-[320px] md:min-w-[500px] snap-center dark:bg-white/5 bg-white rounded-[50px] p-12 border dark:border-white/10 border-black/5 hover:border-yellow-400 transition-all group shadow-xl shadow-black/5 dark:shadow-none">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-yellow-400 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-3xl font-black tracking-tighter dark:text-white text-black">{s.name}</h4>
                  <p className="text-yellow-400 font-black text-xs tracking-[0.3em] uppercase mt-1">{s.from}</p>
                </div>
              </div>
              <Quote className="dark:text-white/10 text-black/5 mb-6" size={60} />
              <p className="text-2xl leading-snug dark:text-white/70 text-black/70 italic font-light">"{s.story}"</p>
              
              <div className="mt-10 flex items-center gap-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Heart size={16} fill="currentColor" />
                 <span className="text-xs font-black tracking-widest uppercase">Verified Connection</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
