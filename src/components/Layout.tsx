import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'FEATURES', path: '/#features' },
  { name: 'DASHBOARD', path: '/dashboard' },
  { name: 'ABOUT', path: '/#about' },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text selection:bg-brand-accent selection:text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-brand-border bg-brand-bg/90 backdrop-blur-md">
        <div className="w-full px-6 lg:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sans font-black text-2xl tracking-tighter uppercase">COMPASS</span>
          </Link>

          {/* Menu Toggle (Centered) */}
          <button
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-sm uppercase tracking-widest hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Menu
            <div className="flex flex-col gap-1.5">
              <span className="w-6 h-px bg-current"></span>
              <span className="w-6 h-px bg-current"></span>
            </div>
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button className="bg-brand-accent text-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Connect Wallet
            </button>
            <button className="bg-brand-accent text-black border-l border-black/20 px-4 py-3 hover:bg-white transition-colors">
              +
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-bg pt-24 px-4"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-sans font-black text-4xl uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              <button className="mt-8 flex items-center justify-center gap-2 bg-brand-text text-brand-bg px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest">
                Connect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Minimal Footer */}
      <footer className="border-t border-brand-border py-8 mt-20 w-full">
        <div className="w-full px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-xl tracking-tighter uppercase">COMPASS</span>
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest ml-4">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-brand-muted hover:text-brand-text uppercase tracking-widest transition-colors">Twitter</a>
            <a href="#" className="font-mono text-xs text-brand-muted hover:text-brand-text uppercase tracking-widest transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
