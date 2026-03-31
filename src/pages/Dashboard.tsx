import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Bell, 
  LogOut, 
  Wallet, 
  Activity, 
  Briefcase, 
  Mail, 
  MapPin, 
  Calendar, 
  Code, 
  Shield, 
  Check, 
  ArrowUpRight,
  GraduationCap,
  X
} from 'lucide-react';
import { supabase, useSupabase } from '../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [adminNotifications, setAdminNotifications] = useState<any[]>([]);
  const [isBellActive, setIsBellActive] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabName = params.get('tab');
    if (tabName) {
      setActiveTab(tabName);
    }
  }, [location.search]);

  useEffect(() => {
    const loadIntel = async () => {
      // announcements sync from Supabase
      if (useSupabase) {
        try {
          const { data } = await supabase
            .from('alpha_bounties_gigs')
            .select('*')
            .eq('type', 'ANNOUNCEMENT')
            .order('created_at', { ascending: false });
          
          if (data && data.length > 0) {
            setAdminNotifications(data.map(item => ({
              id: item.id,
              title: item.title,
              type: item.payload?.type || 'SYSTEM',
              time: 'JUST NOW',
              read: false
            })));
            
            const settings = JSON.parse(localStorage.getItem('compass_hub_settings') || '{"intelBell":true}');
            setIsBellActive(settings.intelBell);
            return;
          }
        } catch (err) {
          console.error('Dashboard Supabase fetch error:', err);
        }
      }

      const saved = JSON.parse(localStorage.getItem('compass_global_announcements') || '[]');
      if (saved.length > 0) {
        setAdminNotifications(saved);
      } else {
        setAdminNotifications([
          { title: 'New Tutorial: Advanced DeFi Auditing', type: 'ACADEMY', time: '1h ago', read: false },
          { title: 'Blog: The Rise of Layer 3 Networks', type: 'INSIGHT', time: '5h ago', read: false },
          { title: 'Protocol Alpha: Major Mainnet Deployment', type: 'CORE SIGNAL', time: '1d ago', read: true },
          { title: 'Community Call Recording: Genesis Event', type: 'RECAP', time: '2d ago', read: true },
        ]);
      }

      const settings = JSON.parse(localStorage.getItem('compass_hub_settings') || '{"intelBell":true}');
      setIsBellActive(settings.intelBell);
    };

    loadIntel();
    window.addEventListener('storage', loadIntel);
    return () => window.removeEventListener('storage', loadIntel);
  }, [useSupabase]);

  const hasUnread = adminNotifications.some(n => !n.read);

  useEffect(() => {
    const storedData = localStorage.getItem('tcc_user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate('/onboarding');
    }
  }, [navigate]);

  if (!userData) return null;

  const userStats = {
    wallet: '0x71C...9A23',
    balance: '4.25 ETH',
    reputation: 98,
  };

  return (
    <div className="min-h-screen pb-24 bg-brand-bg flex flex-col md:flex-row relative overflow-hidden pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-brand-border bg-brand-surface pt-8 px-6 pb-12 flex flex-col z-20">
        <nav className="flex flex-col gap-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <p className="font-mono text-[9px] text-brand-muted uppercase tracking-[0.3em] mb-4 mt-6 px-4 opacity-40">Main Hub</p>
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'overview' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <Activity className="w-4 h-4" /> Overview
          </button>
          
          <button onClick={() => setActiveTab('alpha')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'alpha' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <Shield className="w-4 h-4" /> Alpha Corner
          </button>

          <button onClick={() => setActiveTab('earning')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'earning' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <Briefcase className="w-4 h-4" /> Earning Ops
          </button>

          <button onClick={() => setActiveTab('training')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'training' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <GraduationCap className="w-4 h-4" /> Training
          </button>

          <button onClick={() => setActiveTab('market')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'market' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <Briefcase className="w-4 h-4" /> Marketplace
          </button>

          <button onClick={() => setActiveTab('activity')} className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'activity' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}>
            <Activity className="w-4 h-4" /> Activity
          </button>

          <button 
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border border-transparent ${activeTab === 'news' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'}`}
          >
            <Mail className="w-4 h-4" /> News Highlights
          </button>

          <div className="mt-8 pt-8 border-t border-brand-border/30">
            <button 
              onClick={() => {
                localStorage.removeItem('tcc_user_data');
                window.dispatchEvent(new Event('storage'));
                navigate('/signin');
              }}
              className="flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all w-full text-left"
            >
              <LogOut className="w-4 h-4" /> Sign Out Gateway
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-8 border-t border-brand-border px-4">
           <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-4 p-4 border transition-all hover:bg-brand-bg group ${activeTab === 'profile' ? 'bg-brand-bg border-brand-accent' : 'bg-brand-bg border-brand-border'}`}
           >
              <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-black font-black text-xl">
                 {userData.fullName?.[0]}
              </div>
              <div className="flex-1 min-w-0 text-left">
                 <p className="font-mono text-[10px] text-brand-text truncate font-bold uppercase">{userData.fullName}</p>
                 <p className="font-mono text-[8px] text-brand-muted truncate uppercase tracking-widest group-hover:text-brand-accent">{userData.experience || 'View Profile'}</p>
              </div>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-6 lg:px-12 py-8 overflow-y-auto z-10 custom-scrollbar">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-brand-border pb-8">
          <div>
            <h1 className="font-sans font-black text-4xl uppercase tracking-tighter text-white">Dashboard</h1>
            <p className="font-mono text-xs text-brand-muted mt-2 uppercase tracking-widest">Protocol Signal: <span className="text-brand-accent">Active // Locked</span></p>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsNotificationDrawerOpen(true)} className="relative w-12 h-12 flex items-center justify-center border border-brand-border bg-brand-surface hover:border-brand-accent transition-all group">
                <Bell className={`w-5 h-5 ${isBellActive && hasUnread ? 'text-brand-accent animate-pulse' : 'text-brand-muted group-hover:text-white'}`} />
                {isBellActive && hasUnread && <span className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-bg" />}
             </button>
             <button onClick={() => setActiveTab('settings')} className={`w-12 h-12 flex items-center justify-center border transition-all group ${activeTab === 'settings' ? 'bg-brand-accent border-brand-accent text-black' : 'border-brand-border bg-brand-surface hover:border-white'}`}>
                <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-black' : 'text-brand-muted group-hover:text-white'}`} />
             </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            {activeTab === 'overview' && <OverviewTab userData={userData} userStats={userStats} />}
            {activeTab === 'alpha' && <div className="p-12 border border-brand-border bg-brand-surface text-center font-mono text-[10px] text-brand-muted uppercase tracking-widest">Initializing Alpha Corner Module...</div>}
            {activeTab === 'earning' && <div className="p-12 border border-brand-border bg-brand-surface text-center font-mono text-[10px] text-brand-muted uppercase tracking-widest">Scanning Global Earning Opportunities...</div>}
            {activeTab === 'training' && <div className="p-12 border border-brand-border bg-brand-surface text-center font-mono text-[10px] text-brand-muted uppercase tracking-widest">Loading Training Curriculum...</div>}
            {activeTab === 'market' && <MarketplaceTab />}
            {activeTab === 'activity' && <div className="p-12 border border-brand-border bg-brand-surface text-center font-mono text-[10px] text-brand-muted uppercase tracking-widest">Scanning Global Activity Feed...</div>}
            {activeTab === 'news' && <div className="p-12 border border-brand-border bg-brand-surface text-center font-mono text-[10px] text-brand-muted uppercase tracking-widest">Receiving Protocol News Highlights...</div>}
            {activeTab === 'profile' && <ProfileTab userData={userData} />}
            {activeTab === 'settings' && <SettingsTab isBellActive={isBellActive} setIsBellActive={setIsBellActive} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isNotificationDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNotificationDrawerOpen(false)} className="fixed inset-0 bg-brand-bg/80 backdrop-blur-sm z-[80]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-surface border-l border-brand-border z-[90] p-12 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div>
                   <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-white">Intel Feed</h3>
                   <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mt-2">{isBellActive ? 'Live Signal: Receiving' : 'Signal Status: Off'}</p>
                </div>
                <button onClick={() => setIsNotificationDrawerOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                {adminNotifications.map((notif, i) => (
                  <div key={i} className={`p-6 border border-brand-border bg-brand-bg flex flex-col gap-3 group hover:border-brand-accent transition-all ${!notif.read ? 'border-l-4 border-l-brand-accent' : ''}`}>
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[8px] px-2 py-1 bg-brand-surface text-brand-accent uppercase tracking-widest border border-brand-border">{notif.type}</span>
                    </div>
                    <h4 className="font-sans font-black text-base uppercase tracking-tighter leading-tight text-white">{notif.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({ userData, userStats }: any) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Wallet, label: 'Wallet Balance', value: userStats.balance },
          { icon: Shield, label: 'Signal Status', value: 'High Fidelity' },
          { icon: Activity, label: 'Active Missions', value: '3 Active' },
        ].map((stat, i) => (
          <div key={i} className="p-8 border border-brand-border bg-brand-surface relative overflow-hidden group hover:border-brand-accent transition-all">
            <div className="absolute top-0 right-0 mt-4 mr-4 opacity-10"><stat.icon className="w-12 h-12" /></div>
            <p className="font-mono text-[9px] text-brand-muted uppercase tracking-[0.3em] mb-4">{stat.label}</p>
            <h3 className="font-sans font-black text-3xl text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-brand-border pb-4">
             <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-white">Genesis Mission</h3>
             <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest">65% Complete</span>
          </div>
          <div className="p-8 border border-brand-border bg-brand-surface space-y-6">
             <div className="w-full h-1.5 bg-brand-bg border border-brand-border overflow-hidden"><div className="h-full bg-brand-accent w-[65%]" /></div>
             <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">Complete your profile to unlock Tier 1 Alpha.</p>
             <button className="w-full py-4 bg-brand-accent text-black font-mono text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">Continue Mission <ArrowUpRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="space-y-6">
           <div className="flex justify-between items-end border-b border-brand-border pb-4">
              <h3 className="font-sans font-black text-xl uppercase tracking-tighter text-white">Signal Feed</h3>
           </div>
           <div className="space-y-2">
              {[{ title: 'DeFi Liquidity Alpha', cat: 'ALPHA' }, { title: 'NFT Grant Open', cat: 'BOUNTY' }].map((item, i) => (
                <div key={i} className="p-4 border border-brand-border bg-brand-surface flex items-center gap-4">
                  <div className="w-8 h-8 border border-brand-border bg-brand-bg flex items-center justify-center text-brand-accent font-mono text-[8px]">{item.cat[0]}</div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-tighter text-white">{item.title}</h4>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceTab() {
  const [gigs, setGigs] = useState<any[]>([]);
  useEffect(() => {
    const fetchMarket = async () => {
      if (useSupabase) {
        try {
          const { data } = await supabase.from('alpha_bounties_gigs').select('*').eq('type', 'GIG').eq('is_live', true);
          if (data) setGigs(data.map(g => g.payload));
        } catch (err) { console.error(err); }
      }
      if (!useSupabase || gigs.length === 0) {
        const saved = JSON.parse(localStorage.getItem('compass_global_gigs') || '[]');
        setGigs(saved.length > 0 ? saved : [{ title: 'Full-Stack DeFi Audit UI', budget: '$2,500', type: 'Contract', postedBy: 'Genesis Admin', skills: 'React, Solidity' }]);
      }
    };
    fetchMarket();
  }, [useSupabase]);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-brand-border pb-4">
         <h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Gigs & Opportunities</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {gigs.map((gig, i) => (
           <div key={i} className="p-8 border border-brand-border bg-brand-surface flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                 <span className="font-mono text-[8px] px-2 py-1 bg-brand-bg text-brand-accent uppercase tracking-widest border border-brand-border">{gig.type}</span>
                 <span className="font-sans font-black text-lg text-white">{gig.budget}</span>
              </div>
              <h4 className="font-sans font-black text-xl uppercase tracking-tighter text-white mb-4 leading-tight">{gig.title}</h4>
              <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-6 italic">Requires: {gig.skills}</p>
              <div className="mt-auto pt-6 border-t border-brand-border/30 flex justify-between items-center">
                 <span className="font-mono text-[8px] text-brand-muted uppercase">By {gig.postedBy}</span>
                 <button className="font-mono text-[10px] font-black uppercase text-brand-accent">Inquire</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

function ProfileTab({ userData }: { userData: any }) {
  return (
    <div className="space-y-12">
       <div className="border-b border-brand-border pb-4"><h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Profile</h3></div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="p-8 border border-brand-border bg-brand-surface space-y-6">
             <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-black font-black text-3xl">{userData.fullName?.[0]}</div>
             <h4 className="font-sans font-black text-2xl uppercase text-white">{userData.fullName}</h4>
             <p className="font-mono text-xs text-brand-accent uppercase">{userData.experience || 'Builder'}</p>
          </div>
          <div className="lg:col-span-2 p-8 border border-brand-border bg-brand-bg space-y-8">
             <div className="grid grid-cols-2 gap-8">
                <div><label className="font-mono text-[9px] text-brand-muted uppercase">Telegram</label><p className="font-mono text-sm uppercase text-white">{userData.telegram}</p></div>
                <div><label className="font-mono text-[9px] text-brand-muted uppercase">Location</label><p className="font-mono text-sm uppercase text-white">{userData.country}</p></div>
             </div>
             <div><label className="font-mono text-[9px] text-brand-muted uppercase">Tools / Tech Stack</label><p className="font-mono text-sm uppercase text-white leading-relaxed">{userData.techStack || userData.tools || 'Web3 Suite'}</p></div>
          </div>
       </div>
    </div>
  );
}

function SettingsTab({ isBellActive, setIsBellActive }: { isBellActive: boolean, setIsBellActive: any }) {
  const toggleBell = () => {
    const newState = !isBellActive;
    setIsBellActive(newState);
    localStorage.setItem('compass_hub_settings', JSON.stringify({ intelBell: newState }));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-12">
       <div className="border-b border-brand-border pb-4"><h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Settings</h3></div>
       <div className="p-8 border border-brand-border bg-brand-surface flex items-center justify-between">
          <div>
             <h4 className="font-sans font-black text-xl uppercase text-white">Intelligence Bell</h4>
             <p className="font-mono text-[10px] text-brand-muted uppercase mt-2">Visual alerts for new signals.</p>
          </div>
          <button onClick={toggleBell} className={`w-14 h-8 rounded-full relative transition-all border ${isBellActive ? 'bg-brand-accent border-brand-accent' : 'bg-brand-bg border-brand-border'}`}>
             <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white transition-all ${isBellActive ? 'left-7' : 'left-1'}`} />
          </button>
       </div>
    </div>
  );
}
