
import React, { useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, User, Menu, X, Sun, Moon, Radio } from 'lucide-react';
import gsap from 'gsap';
import { ThemeContext } from '../App';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Connect', path: '/#explore' },
    { name: 'How It Works', path: '/#how-it-works' },
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 dark:bg-black/80 bg-white/80 backdrop-blur-md border-b dark:border-white/10 border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group interactive">
          <div className="bg-yellow-400 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-yellow-400/20">
            <Radio className="text-black" size={24} strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tighter dark:text-white text-black">
            AURA<span className="text-yellow-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="interactive text-xs font-bold dark:text-white/60 text-black/60 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="interactive p-2 rounded-full dark:bg-white/5 bg-black/5 dark:text-white text-black hover:bg-yellow-400 hover:text-black transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link 
            to="/auth" 
            className="interactive bg-yellow-400 text-black px-6 py-2.5 rounded-xl font-black text-sm tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-2"
          >
            <User size={16} />
            JOIN ELITE
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme} 
              className="p-2 dark:text-white text-black"
              aria-label="Toggle Theme"
            >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
                className="text-yellow-400"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full dark:bg-black bg-white border-b dark:border-white/10 border-black/5 p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-300">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black tracking-tighter dark:text-white text-black hover:text-yellow-400"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/auth" 
            onClick={() => setIsOpen(false)}
            className="bg-yellow-400 text-black text-center py-5 rounded-2xl font-black text-xl shadow-xl shadow-yellow-400/20"
          >
            JOIN NOW
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
