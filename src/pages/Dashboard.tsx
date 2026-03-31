import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Settings, Bell, LogOut, Wallet, Activity, Briefcase, Mail, MapPin, Calendar, Code, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data from local storage (mocking backend)
    const storedData = localStorage.getItem('tcc_user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // If no data, redirect to onboarding
      navigate('/onboarding');
    }
  }, [navigate]);

  if (!userData) return null;

  // Mock user stats
  const userStats = {
    wallet: '0x71C...9A23',
    balance: '4.25 ETH',
    reputation: 98,
  };

  return (
    <div className="min-h-screen pb-24 bg-brand-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-brand-border bg-brand-surface pt-32 px-6 pb-12 flex flex-col">
        <div className="mb-12">
          <div className="w-16 h-16 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-sans font-black text-2xl uppercase tracking-tighter break-words">{userData.fullName}</h2>
          <p className="font-mono text-xs text-brand-muted mt-1">{userData.currentStatus}</p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === 'overview' ? 'bg-brand-accent text-black' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
          >
            <Activity className="w-4 h-4" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === 'profile' ? 'bg-brand-accent text-black' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
          >
            <User className="w-4 h-4" /> My Profile
          </button>
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === 'wallet' ? 'bg-brand-accent text-black' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
          >
            <Wallet className="w-4 h-4" /> Wallet
          </button>
          <button 
            onClick={() => setActiveTab('gigs')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === 'gigs' ? 'bg-brand-accent text-black' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
          >
            <Briefcase className="w-4 h-4" /> My Gigs
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === 'settings' ? 'bg-brand-accent text-black' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <button 
          onClick={() => {
            localStorage.removeItem('tcc_user_data');
            navigate('/');
          }}
          className="flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors mt-auto"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-32 px-6 lg:px-12">
        <header className="flex justify-between items-end mb-12 border-b border-brand-border pb-6">
          <div>
            <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter">
              {activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="border border-brand-border bg-brand-surface p-6">
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Connected Wallet</p>
              <h3 className="font-mono font-bold text-xl text-brand-accent">{userStats.wallet}</h3>
            </div>
            <div className="border border-brand-border bg-brand-surface p-6">
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Total Balance</p>
              <h3 className="font-sans font-black text-3xl">{userStats.balance}</h3>
            </div>
            <div className="border border-brand-border bg-brand-surface p-6">
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Reputation Score</p>
              <h3 className="font-sans font-black text-3xl text-brand-accent">{userStats.reputation}/100</h3>
            </div>
            
            <div className="md:col-span-3 border border-brand-border bg-brand-surface p-6 mt-6">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-brand-border pb-4">
                  <div>
                    <p className="font-mono text-sm font-bold">Completed Onboarding</p>
                    <p className="font-mono text-xs text-brand-muted">Joined The Compass Community</p>
                  </div>
                  <span className="font-mono text-sm text-brand-accent">Just now</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="border border-brand-border bg-brand-surface p-8">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6 border-b border-brand-border pb-4">Personal Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-brand-muted mt-1" />
                  <div>
                    <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">Email</p>
                    <p className="font-mono text-sm">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-muted mt-1" />
                  <div>
                    <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">Location</p>
                    <p className="font-mono text-sm">{userData.state}, {userData.country}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-brand-muted mt-1" />
                  <div>
                    <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">Web3 Journey Started</p>
                    <p className="font-mono text-sm">{userData.startDateWeb3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-brand-border bg-brand-surface p-8">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6 border-b border-brand-border pb-4">Skills & Expertise</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-3">Core Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill: string) => (
                      <span key={skill} className="bg-brand-bg border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Skill Level</p>
                  <div className="w-full bg-brand-bg h-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-brand-accent" style={{ width: `${(userData.skillLevel / 5) * 100}%` }} />
                  </div>
                  <p className="font-mono text-xs mt-2 text-right">{userData.skillLevel} / 5</p>
                </div>
                {userData.tools && (
                  <div>
                    <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Tools</p>
                    <p className="font-mono text-sm">{userData.tools}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 border border-brand-border bg-brand-surface p-8">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6 border-b border-brand-border pb-4">Contributions & Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-3">Willing to Contribute To</p>
                  <ul className="list-disc list-inside font-mono text-sm space-y-2">
                    {userData.contributions.map((c: string) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Expectations</p>
                  <p className="font-mono text-sm text-brand-muted leading-relaxed">{userData.expectations}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other tabs can be mocked similarly */}
        {activeTab !== 'overview' && activeTab !== 'profile' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-brand-border bg-brand-surface p-12 flex flex-col items-center justify-center text-center h-64"
          >
            <p className="font-mono text-brand-muted uppercase tracking-widest mb-4">Module in Development</p>
            <h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-brand-accent">
              Coming Soon
            </h3>
          </motion.div>
        )}
      </main>
    </div>
  );
}
