import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowRight, Lock, User, AlertCircle } from 'lucide-react';
import { supabase, useSupabase } from '../lib/supabase';

export default function SignIn() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (useSupabase) {
      try {
        // We search profiles where telegram, email, or discord matches the identifier
        // and the payload contains the matching password
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .or(`telegram.eq.${identifier},email.eq.${identifier}`);

        if (fetchError) throw fetchError;

        if (data && data.length > 0) {
          const userProfile = data[0];
          // Check password in payload (In production, use Supabase Auth for real encryption)
          if (userProfile.payload?.password === password) {
            localStorage.setItem('tcc_user_data', JSON.stringify(userProfile.payload || userProfile));
            window.dispatchEvent(new Event('storage'));
            navigate('/dashboard');
            return;
          }
        }
        setError('Invalid handler or command key. Please verify your credentials.');
      } catch (err) {
        console.error('Sign In Error:', err);
        setError('Authentication failed. Please check your connection.');
      } finally {
        setLoading(false);
      }
    } else {
      // Local storage fallback for development
      const globalMembers = JSON.parse(localStorage.getItem('compass_global_members') || '[]');
      const match = globalMembers.find((m: any) => 
        (m.email === identifier || m.details?.telegram === identifier) && 
        (m.password === password || m.details?.password === password)
      );

      if (match) {
        localStorage.setItem('tcc_user_data', JSON.stringify(match.details || match));
        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard');
      } else {
        setError('Local identity not found. Please register first.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-accent)_0%,_transparent_70%)] opacity-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border border-brand-accent/10 rounded-full -mr-64 -mb-64" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-surface border border-brand-border p-12 relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-brand-accent flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,0,0.3)]">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Member Gateway</h1>
          <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.3em] mt-2">The Compass Community // Secure Access</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-500 font-mono text-[10px] uppercase tracking-widest"
          >
            <AlertCircle className="w-4 h-4" /> {error}
          </motion.div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest ml-4">Identity Handler (Email/Telegram)</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input 
                type="text" 
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="Enter Handler..." 
                className="w-full bg-brand-bg border border-brand-border p-4 pl-12 font-mono text-sm focus:border-brand-accent outline-none text-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest ml-4">Command Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Key..." 
                className="w-full bg-brand-bg border border-brand-border p-4 pl-12 font-mono text-sm focus:border-brand-accent outline-none text-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-accent text-black font-mono text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,0,0.2)] hover:bg-white transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-brand-border text-center">
          <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">New to the community?</p>
          <Link to="/onboarding" className="inline-block mt-4 text-brand-accent hover:text-white font-mono text-[10px] font-black uppercase tracking-widest transition-colors">
            Register Genesis Identity
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
