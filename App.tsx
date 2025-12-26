
import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import Onboarding from './pages/Onboarding';
import OTPVerification from './pages/OTPVerification';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Discover from './pages/dashboard/Discover';
import People from './pages/dashboard/People';
import LikedYou from './pages/dashboard/LikedYou';
import Chats from './pages/dashboard/Chats';
import Profile from './pages/dashboard/Profile';
import SettingsPage from './pages/dashboard/Settings';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

interface LayoutManagerProps {
  children: React.ReactNode;
}

const LayoutManager: React.FC<LayoutManagerProps> = ({ children }) => {
  const location = useLocation();
  const { isDark } = useContext(ThemeContext);
  
  const path = location.pathname.toLowerCase();
  const isAuthOrOnboarding = path === '/auth' || path === '/onboarding' || path === '/otp';
  const isDashboard = path.startsWith('/dashboard');
  const isMinimal = isAuthOrOnboarding || isDashboard;

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen transition-colors duration-500 dark:bg-black bg-white dark:text-white text-black selection:bg-yellow-400 selection:text-black cursor-none">
      {!isMinimal && <Navbar />}
      <main className={isMinimal ? 'w-full min-h-screen' : ''}>
        {children}
      </main>
      {!isMinimal && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });
        gsap.to(followerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
        });
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .interactive')) {
        gsap.to(followerRef.current, { 
          scale: 3, 
          backgroundColor: 'rgba(250, 204, 21, 0.2)', 
          border: 'none' 
        });
        gsap.to(cursorRef.current, { scale: 0.5 });
      } else {
        gsap.to(followerRef.current, { 
          scale: 1, 
          backgroundColor: 'transparent', 
          border: isDark ? '1px solid rgba(250, 204, 21, 0.5)' : '1px solid rgba(0, 0, 0, 0.2)' 
        });
        gsap.to(cursorRef.current, { scale: 1 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
        <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-yellow-400/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[border-color] duration-500"></div>
        
        <LayoutManager>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Discover />} />
              <Route path="people" element={<People />} />
              <Route path="liked" element={<LikedYou />} />
              <Route path="chats" element={<Chats />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </LayoutManager>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
