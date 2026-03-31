import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, Activity, Plus } from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', memberOnly: true },
  { name: 'Alpha', path: '/alpha-corner' },
  { name: 'Earning', path: '/earning-opportunities' },
  { name: 'Market', path: '/skill-marketplace' },
  { name: 'News', path: '/news-highlights', memberOnly: true },
  { name: 'Activity', path: '/activities', memberOnly: true },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    setIsRegistered(!!localStorage.getItem('tcc_user_data'));
    const handleStorage = () => {
      setIsRegistered(!!localStorage.getItem('tcc_user_data'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });
  
  // High-fidelity Parallax: Slide up from behind as we scroll to the very end
  const footerY = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-[70] border-b border-brand-border bg-brand-bg/90 backdrop-blur-md">
        <div className="w-full px-6 lg:px-12 py-4 flex justify-between items-center relative">
          <Link to="/" className="font-sans font-black text-2xl tracking-tighter uppercase shrink-0">
            COMPASS
          </Link>
          
          {/* Main Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              if (link.memberOnly && !isRegistered) return null;
              
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    const targetPath = link.path.split('?')[0];
                    if (targetPath === '/skill-marketplace' || targetPath === '/') {
                      navigate(link.path);
                    } else {
                      navigate(isRegistered ? link.path : '/onboarding');
                    }
                  }}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:text-brand-accent ${
                    (location.pathname + location.search) === link.path ? 'text-brand-accent' : 'text-brand-muted'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-brand-accent transition-all group"
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
              <div className="flex flex-col gap-1.5 w-6 h-4 justify-center items-end">
                <span className={`h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6 group-hover:w-4'}`} />
                <span className={`h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-4 group-hover:w-6'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-brand-bg flex flex-col"
          >
            {/* Menu Header (Fake space for layout consistency) */}
            <div className="w-full px-6 lg:px-12 py-4 border-b border-brand-border opacity-0 pointer-events-none">
              <span className="font-sans font-black text-2xl tracking-tighter uppercase">COMPASS</span>
            </div>

            {/* Menu Content */}
            <div className="flex-1 w-full px-6 lg:px-12 py-16 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 h-full">
                
                {/* Primary Links */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.3em] mb-4 opacity-50">Navigation</span>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Alpha', path: '/dashboard?tab=alpha' },
                    { name: 'Earning', path: '/dashboard?tab=earning' },
                    { name: 'Market', path: '/skill-marketplace' },
                    { name: 'News', path: '/dashboard?tab=settings', memberOnly: true },
                    { name: 'Activity', path: '/dashboard?tab=overview', memberOnly: true },
                  ].map((link, idx) => {
                    if (link.memberOnly && !isRegistered) return null;
                    
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                        className="group flex items-center gap-6"
                      >
                        <button
                          onClick={() => {
                            const targetPath = link.path.split('?')[0];
                            if (targetPath === '/' || targetPath === '/skill-marketplace') {
                              navigate(link.path);
                            } else {
                              navigate(isRegistered ? link.path : '/onboarding');
                            }
                            setIsMobileMenuOpen(false);
                          }}
                          className={`font-sans font-black text-5xl sm:text-6xl text-left uppercase tracking-tighter transition-all duration-300 ${
                            (location.pathname + location.search) === link.path ? 'text-brand-accent' : 'text-brand-text hover:text-brand-accent'
                          }`}
                        >
                          {link.name}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Secondary Links & Dev Tools */}
                <div className="lg:col-span-3 flex flex-col gap-12 pt-4">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em] mb-6 block border-l-2 border-brand-accent pl-3">Contact</span>
                    <ul className="font-mono text-xs space-y-3 text-brand-muted uppercase tracking-widest">
                      <li><a href="mailto:hello@compass.community" className="hover:text-brand-accent transition-colors">hello@compass.community</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">Discord / Compass Global</a></li>
                    </ul>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <span className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em] mb-6 block border-l-2 border-brand-accent pl-3">Socials</span>
                    <ul className="font-mono text-xs space-y-3 text-brand-muted uppercase tracking-widest">
                      <li><a href="#" className="hover:text-brand-accent transition-colors">X // Twitter</a></li>
                      <li><a href="#" className="hover:text-brand-accent transition-colors">GitHub // Dev</a></li>
                    </ul>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-auto">
                    <p className="font-mono text-[8px] text-brand-muted uppercase tracking-[0.3em] mb-4">Ecosystem Integrity</p>
                    <div className="flex gap-4">
                      {isRegistered ? (
                         <button onClick={() => { localStorage.removeItem('tcc_user_data'); window.dispatchEvent(new Event('storage')); navigate('/signin'); }} className="px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-mono text-[9px] uppercase font-black transition-all">Sign Out HUB</button>
                      ) : (
                         <button onClick={() => navigate('/signin')} className="px-6 py-3 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-black font-mono text-[9px] uppercase font-black transition-all">Member Sign In</button>
                      )}
                      <button onClick={() => navigate('/admin')} className="px-6 py-3 border border-brand-border text-brand-text hover:bg-white hover:text-black font-mono text-[9px] uppercase font-black transition-all">Admin HUB</button>
                    </div>
                  </motion.div>
                </div>

                {/* Visual Accent */}
                <div className="lg:col-span-5 hidden lg:block h-full border-l border-brand-border pl-12">
                   <div className="w-full h-[500px] bg-brand-surface border border-brand-border relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                      <div className="absolute inset-x-8 bottom-8">
                        <span className="font-sans font-black text-7xl uppercase tracking-tighter opacity-10 group-hover:opacity-20 transition-opacity">COMPASS</span>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 bg-brand-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + location.search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* High-Fidelity Governance Footer with PARALLAX REVEAL */}
      <motion.footer 
        style={{ y: footerY }}
        className="sticky bottom-0 z-0 border-t border-brand-border bg-brand-bg relative overflow-hidden pt-32 pb-20"
      >
        {/* Background Architectural Text - HUGE */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full text-center select-none pointer-events-none z-0 opacity-[0.03] whitespace-nowrap">
          <span className="font-sans font-black text-[30vw] uppercase leading-none tracking-tighter">
            COMPASS
          </span>
        </div>

        <div className="w-full px-6 lg:px-12 relative z-10 max-w-full">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-24 items-start mb-32">
              {/* Left Column: Newsletter & Status */}
              <div className="lg:col-span-1 space-y-12">
                 <div className="space-y-6">
                    <h3 className="font-sans font-bold text-lg uppercase tracking-tighter text-white">Secure your signal.</h3>
                    <div className="flex flex-col gap-2">
                       <input type="text" placeholder="Name" className="w-full bg-brand-surface border border-brand-border p-3 font-mono text-[10px] outline-none focus:border-brand-accent text-white uppercase" />
                       <div className="flex">
                          <input type="email" placeholder="Email" className="flex-1 bg-brand-surface border border-brand-border p-3 font-mono text-[10px] outline-none focus:border-brand-accent text-white uppercase" />
                          <button className="bg-white text-black px-6 py-3 font-mono text-[9px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2">
                             Subscribe <Plus className="w-4 h-4" />
                          </button>
                       </div>
                       <p className="font-mono text-[8px] text-brand-muted uppercase tracking-widest mt-2 italic">Unsubscribe anytime from the hub.</p>
                    </div>
                 </div>

                 <div className="space-y-3 pt-6">
                    <div className="flex items-center gap-4">
                       <div className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse" />
                       <span className="font-mono text-[10px] text-brand-accent font-black uppercase tracking-[0.2em]">MISSION ACTIVE: JOIN THE HUB.</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-2.5 h-2.5 bg-brand-accent rounded-full opacity-50" />
                       <span className="font-mono text-[10px] text-brand-muted font-black uppercase tracking-[0.2em]">NEW ALPHA BROADCASTING.</span>
                    </div>
                 </div>
              </div>

              {/* Center Column: Navigation */}
              <div className="lg:col-span-2 flex flex-col items-center">
                 <nav className="flex flex-col items-center gap-4">
                    {['Home', 'Alpha', 'Earning', 'Market', 'About', 'Contact'].map(link => (
                       <button key={link} onClick={() => navigate(link === 'Home' ? '/' : link === 'Market' ? '/skill-marketplace' : '/dashboard')} className="font-mono text-[10px] text-brand-text hover:text-brand-accent uppercase tracking-[0.4em] transition-all py-1">
                          {link}
                       </button>
                    ))}
                 </nav>
              </div>

              {/* Right Column: Contact & Legal */}
              <div className="lg:col-span-1 space-y-12 lg:text-right">
                 <div className="space-y-3">
                    <a href="mailto:mission@compass.community" className="font-mono text-[10px] text-white hover:text-brand-accent uppercase tracking-widest block border-b border-brand-border/30 pb-2">mission@compass.community</a>
                    <a href="mailto:governance@compass.community" className="font-mono text-[10px] text-white hover:text-brand-accent uppercase tracking-widest block border-b border-brand-border/30 pb-2">governance@compass.community</a>
                 </div>
                 <div className="space-y-4 pt-4">
                    <div className="space-x-8">
                       <button className="font-mono text-[9px] text-brand-muted hover:text-white uppercase tracking-widest">Privacy Policy</button>
                       <button className="font-mono text-[9px] text-brand-muted hover:text-white uppercase tracking-widest">Legal Notice</button>
                    </div>
                    <div className="flex justify-start lg:justify-end gap-3">
                       <div className="bg-brand-surface border border-brand-border px-2 py-1 flex items-center gap-2">
                          <div className="w-4 h-4 border border-brand-accent/30 text-brand-muted flex items-center justify-center font-mono text-[7px] uppercase">G</div>
                          <span className="font-mono text-[8px] text-brand-muted uppercase">Grid Toggle</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-center gap-3 pt-16 border-t border-brand-border/30">
              <span className="font-sans font-black text-xs uppercase tracking-widest text-brand-muted">© 2026 THE COMPASS HUB</span>
              <p className="font-mono text-[9px] text-brand-muted uppercase tracking-[0.5em] italic">Let the Hub handle it.</p>
           </div>
        </div>
      </motion.footer>

      {/* Social Proof Toaster */}
      <SocialProofToaster />
    </div>
  );
}

function SocialProofToaster() {
  const [currentToast, setCurrentToast] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('compass_hub_settings') || '{"toaster":true}');
    return settings.toaster;
  });

  useEffect(() => {
    const syncToasts = () => {
      const settings = JSON.parse(localStorage.getItem('compass_hub_settings') || '{"toaster":true}');
      setIsActive(settings.toaster);
      
      const savedToasts = JSON.parse(localStorage.getItem('compass_toaster_messages') || '[]');
      if (savedToasts.length > 0) {
        setToasts(savedToasts);
      } else {
        setToasts([
          "Verified Talent @0xb2... just joined the Marketplace",
          "3 new members onboarded to the Hub",
          "New Alpha Signal: L2 Airdrop strategy published",
          "Bounty Completed: @creativ_x earned 1,200 USDC",
          "Admin added new 'Smart Contract' tutorial to Academy"
        ]);
      }
    };
    
    syncToasts();
    window.addEventListener('storage', syncToasts);
    return () => window.removeEventListener('storage', syncToasts);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    
    // Initial delay
    const setup = setTimeout(() => {
      const interval = setInterval(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 5000);
        setCurrentToast((prev) => (prev + 1) % toasts.length);
      }, 15000);
      return () => clearInterval(interval);
    }, 5000);
    
    return () => clearTimeout(setup);
  }, [toasts.length, isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          className="fixed bottom-8 left-8 z-[100] bg-brand-bg border border-brand-accent p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(255,234,0,0.1)] max-w-xs"
        >
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shrink-0" />
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] leading-relaxed text-brand-text">
            {toasts[currentToast]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
