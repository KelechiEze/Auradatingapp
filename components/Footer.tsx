
import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Youtube, Send, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-40 pb-12 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
             <Link to="/" className="flex items-center gap-2 group mb-10">
              <div className="bg-yellow-400 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Heart className="text-black fill-black" size={32} />
              </div>
              <span className="text-4xl font-black tracking-tighter text-white">
                AURA<span className="text-yellow-400">.</span>
              </span>
            </Link>
            <p className="text-white/40 text-xl max-w-md mb-12 leading-relaxed">
              The world's premier destination for global connection. Redefining intimacy for a borderless generation.
            </p>
            <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="interactive w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:-translate-y-2 transition-all duration-300">
                        <Icon size={24} />
                    </a>
                ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-yellow-400">Company</h5>
            <ul className="space-y-6">
                <li><Link to="/about" className="interactive text-white/40 hover:text-white transition-colors text-lg font-bold">Our Manifesto</Link></li>
                <li><Link to="/#how-it-works" className="interactive text-white/40 hover:text-white transition-colors text-lg font-bold">Resonance Tech</Link></li>
                <li><Link to="/#explore" className="interactive text-white/40 hover:text-white transition-colors text-lg font-bold">Global Orbit</Link></li>
                <li><Link to="/auth" className="interactive text-white/40 hover:text-yellow-400 transition-colors text-lg font-bold">Join Elite</Link></li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h5 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-yellow-400">The Frequency</h5>
            <p className="text-white/40 mb-8 font-bold">Subscribe to our newsletter for global love stories and exclusive event access.</p>
            <form className="relative group" onSubmit={e => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="your@aura.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 text-lg"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all">
                    <Send size={20} />
                </button>
            </form>
            <div className="flex items-center gap-4 mt-8 opacity-20">
                <Globe size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">Available in 14 Languages</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">© 2024 Aura Global</p>
                <a href="#" className="text-white/20 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">Privacy Sanctum</a>
                <a href="#" className="text-white/20 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">Safety Protocols</a>
            </div>
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
                Connect the world. <Heart size={10} className="text-yellow-400" fill="currentColor" /> One soul at a time.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
