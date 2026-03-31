import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Shield, 
  Activity, 
  Database, 
  Search, 
  ArrowUpRight, 
  Plus, 
  Edit2, 
  Trash2, 
  LayoutTemplate, 
  FileText, 
  BookOpen, 
  Settings, 
  Bell, 
  MessageSquare, 
  Briefcase, 
  Zap, 
  MapPin,
  Megaphone,
  Layout,
  Type,
  HelpCircle,
  FolderOpen,
  Star,
  ListRestart,
  CloudLightning,
  CloudOff,
  Lock
} from 'lucide-react';
import { supabase, useSupabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('vision');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Platform Editorial & Settings
  const [platformSettings, setPlatformSettings] = useState(() => {
    return JSON.parse(localStorage.getItem('compass_hub_settings') || '{"toaster":true, "intelBell":true}');
  });

  const [heroContent, setHeroContent] = useState(() => {
    return JSON.parse(localStorage.getItem('compass_hero_content') || '{"title":"Web3 Community That Moves.", "desc":"A decentralized platform for news, alpha, earning, and learning. Built for the next generation of builders and creators."}');
  });

  const [spotlightContent, setSpotlightContent] = useState(() => {
    return JSON.parse(localStorage.getItem('compass_spotlight_content') || '{"name":"Sarah Chen", "role":"UX/UI Designer & Web3 Researcher", "quote":"Sarah secured a $5k grant after just 2 months of active contribution in TCC.", "img":"https://picsum.photos/seed/sarah/800/800?grayscale"}');
  });

  const [marqueeText, setMarqueeText] = useState(() => {
    const s = JSON.parse(localStorage.getItem('compass_marquee_settings') || '{"text":"+++ JOIN THE COMPASS +++ FIND ALPHA +++ EARN REWARDS +++ LEARN SKILLS +++"}');
    return s.text;
  });

  const [toasterMessages, setToasterMessages] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('compass_toaster_messages') || '[]');
  });

  // Database States
  const [projects, setProjects] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_projects') || '[]'));
  const [faqs, setFaqs] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_faqs') || '[]'));
  const [comparisons, setComparisons] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_comparison_rows') || '[]'));
  const [services, setServices] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_service_cards') || '[]'));
  
  const [members, setMembers] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_members') || '[]'));
  const [alphas, setAlphas] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_alpha') || '[]'));
  const [bounties, setBounties] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_bounties') || '[]'));
  const [blogs, setBlogs] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_blogs') || '[]'));
  const [announcements, setAnnouncements] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_announcements') || '[]'));
  const [gigs, setGigs] = useState<any[]>(() => JSON.parse(localStorage.getItem('compass_global_gigs') || '[]'));
  
  // New Posting States
  const [newProject, setNewProject] = useState({ title: '', desc: '', img: '', thumb: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newComp, setNewComp] = useState({ label: '', legacy: '', paid: '', compass: '' });
  const [newService, setNewService] = useState({ title: '', hover: '', desc: '', link: '/dashboard' });
  const [newToasterMsg, setNewToasterMsg] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', type: 'SYSTEM', time: 'Just Now', read: false });
  const [newAlpha, setNewAlpha] = useState({ title: '', category: 'DEFI', signal: 'HIGH', content: '', author: 'Admin' });
  const [newBounty, setNewBounty] = useState({ title: '', reward: '', company: '', description: '', requirements: '' });
  const [newGig, setNewGig] = useState({ title: '', budget: '', type: 'Contract', postedBy: 'Admin', skills: '' });

  // Load from Supabase on start
  useEffect(() => {
    const fetchSync = async () => {
       if (useSupabase) {
          try {
             const { data: profileData } = await supabase.from('profiles').select('*');
             if (profileData) setMembers(profileData);
             
             const { data: configData } = await supabase.from('platform_config').select('*');
             if (configData) {
                configData.forEach(item => {
                   if (item.id === 'compass_hero_content') setHeroContent(item.content);
                   if (item.id === 'compass_spotlight_content') setSpotlightContent(item.content);
                   if (item.id === 'compass_marquee_settings') setMarqueeText(item.content.text);
                   if (item.id === 'compass_toaster_messages') setToasterMessages(item.content);
                });
             }
          } catch (err) { console.error('Admin Load Sync Error:', err); }
       }
    };
    fetchSync();
  }, []);

  // Sync utilities
  const syncStorage = async (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));

    if (useSupabase) {
      try {
        await supabase
          .from('platform_config')
          .upsert({ id: key, content: data, updated_at: new Date().toISOString() });
      } catch (err) {
        console.error('Supabase Vision Sync Error:', err);
      }
    }
  };

  const publishContent = async (type: string, data: any) => {
    const keyMap: { [key: string]: string } = {
      project: 'compass_global_projects',
      faq: 'compass_global_faqs',
      comp: 'compass_comparison_rows',
      service: 'compass_service_cards',
      alpha: 'compass_global_alpha',
      bounty: 'compass_global_bounties',
      announcement: 'compass_global_announcements',
      gig: 'compass_global_gigs'
    };
    const key = keyMap[type];
    const currentList = JSON.parse(localStorage.getItem(key) || '[]');
    const newList = [{ id: Date.now(), ...data, date: 'Just Now' }, ...currentList];
    
    // Local Update
    localStorage.setItem(key, JSON.stringify(newList));
    window.dispatchEvent(new Event('storage'));
    
    // Update states
    if (type === 'project') setProjects(newList);
    if (type === 'faq') setFaqs(newList);
    if (type === 'comp') setComparisons(newList);
    if (type === 'service') setServices(newList);
    if (type === 'alpha') setAlphas(newList);
    if (type === 'bounty') setBounties(newList);
    if (type === 'announcement') setAnnouncements(newList);
    if (type === 'gig') setGigs(newList);

    // Supabase Update
    if (useSupabase) {
       try {
         await supabase
           .from('alpha_bounties_gigs')
           .insert({ 
             type: type.toUpperCase(), 
             title: data.title || data.question || data.label || 'SYSTEM_SIGNAL',
             payload: data, 
             is_live: true 
           });
       } catch (err) {
         console.error('Supabase Signal Sync Error:', err);
       }
    }
    
    alert(`${type} published and broadcasted!`);
  };

  const deleteItem = (key: string, id: number, setter: any) => {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = list.filter((i: any) => i.id !== id);
    setter(filtered);
    syncStorage(key, filtered);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-accent)_0%,_transparent_70%)] opacity-10" />
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-brand-surface border border-brand-border p-12 relative z-10">
          <div className="flex flex-col items-center mb-10 text-center">
             <div className="w-16 h-16 bg-brand-accent flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,0,0.3)]">
                <Shield className="w-8 h-8 text-black" />
             </div>
             <h1 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Governance Hub</h1>
             <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.3em] mt-2">Protocol Access Required // Enter Command</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); if (adminPass === 'COMPASS') { setIsAuthenticated(true); } else { setLoginError('Invalid Governance Protocol'); } }} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-brand-muted uppercase tracking-widest ml-4">Command Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="Protocol Key..." className="w-full bg-brand-bg border border-brand-border p-4 pl-12 font-mono text-sm focus:border-brand-accent outline-none text-white transition-all uppercase" />
              </div>
            </div>
            {loginError && <p className="font-mono text-[10px] text-red-500 uppercase tracking-widest text-center">{loginError}</p>}
            <button type="submit" className="w-full py-5 bg-brand-accent text-black font-mono text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,0,0.2)] hover:bg-white transition-all transform active:scale-95">Verify Authority</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-full flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="border border-brand-border bg-brand-surface p-6">
            <h2 className="font-sans font-black text-xl uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-accent" /> Command Hub
            </h2>
            <nav className="flex flex-col gap-1">
              {[
                { id: 'vision', label: 'Editorial Vision', icon: Settings },
                { id: 'members', label: 'Member Registry', icon: Users },
                { id: 'review-marketplace', label: 'Marketplace Queue', icon: Database },
                { id: 'review-blogs', label: 'Blog Queue', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-brand-accent text-black font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="border border-brand-border bg-brand-surface p-6">
             <h2 className="font-sans font-black text-xl uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-accent" /> Build Ecosystem
            </h2>
            <nav className="flex flex-col gap-1">
              {[
                { id: 'pub-alpha', label: 'Post Alpha', icon: Zap },
                { id: 'pub-bounty', label: 'Post Bounty', icon: Briefcase },
                { id: 'pub-gig', label: 'Post Gig', icon: LayoutTemplate },
                { id: 'pub-announcement', label: 'Broadcast Info', icon: Megaphone },
                { id: 'pub-project', label: 'Feature Project', icon: FolderOpen },
                { id: 'pub-faq', label: 'Manage FAQs', icon: HelpCircle },
                { id: 'pub-comp', label: 'Define Edge', icon: ListRestart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-brand-accent text-black font-bold' : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <button 
            onClick={() => { localStorage.removeItem('tcc_user_data'); window.location.href = '/'; }}
            className="w-full py-4 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-mono text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Terminated Admin Session
          </button>
        </aside>

        {/* Main Workspace */}
        <main className="flex-grow min-w-0">
          
        {activeTab === 'vision' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Members', value: members.length.toLocaleString(), color: 'text-brand-accent' },
                { label: 'Signal Velocity', value: (alphas.length + bounties.length).toString(), color: 'text-white' },
                { label: 'Platform Projects', value: projects.length.toString(), color: 'text-white' },
                { label: 'Market Gigs', value: gigs.length.toString(), color: 'text-white' },
              ].map((stat, i) => (
                <div key={i} className="border border-brand-border bg-brand-surface p-6">
                  <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest mb-2">{stat.label}</p>
                  <h3 className={`font-sans font-black text-4xl ${stat.color}`}>{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Editorial Suite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="border border-brand-border bg-brand-surface p-8">
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Layout className="w-6 h-6 text-brand-accent" /> Hero Master
                  </h3>
                  <div className="space-y-4">
                    <textarea value={heroContent.title} onChange={e => {
                      const n = {...heroContent, title: e.target.value};
                      setHeroContent(n); syncStorage('compass_hero_content', n);
                    }} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-xs focus:border-brand-accent outline-none min-h-[80px]" placeholder="Headline"/>
                    <textarea value={heroContent.desc} onChange={e => {
                      const n = {...heroContent, desc: e.target.value};
                      setHeroContent(n); syncStorage('compass_hero_content', n);
                    }} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-[10px] focus:border-brand-accent outline-none min-h-[80px]" placeholder="Description"/>
                  </div>
               </div>

               <div className="border border-brand-border bg-brand-surface p-8">
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Star className="w-6 h-6 text-brand-accent" /> Spotlight
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" value={spotlightContent.name} onChange={e => {
                        const n = {...spotlightContent, name: e.target.value};
                        setSpotlightContent(n); syncStorage('compass_spotlight_content', n);
                      }} className="w-full bg-brand-bg border border-brand-border p-2 font-mono text-[10px] outline-none" placeholder="Name"/>
                      <input type="text" value={spotlightContent.role} onChange={e => {
                        const n = {...spotlightContent, role: e.target.value};
                        setSpotlightContent(n); syncStorage('compass_spotlight_content', n);
                      }} className="w-full bg-brand-bg border border-brand-border p-2 font-mono text-[10px] outline-none" placeholder="Role"/>
                    </div>
                    <textarea value={spotlightContent.quote} onChange={e => {
                      const n = {...spotlightContent, quote: e.target.value};
                      setSpotlightContent(n); syncStorage('compass_spotlight_content', n);
                    }} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-[10px] outline-none min-h-[100px]" placeholder="Quote"/>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <RegistryTab 
              members={members} 
              onStatusChange={async (id: any, status: string) => {
                 const n = members.map((m: any, i: number) => (m.id === id || i === id) ? {...m, status} : m);
                 setMembers(n); localStorage.setItem('compass_global_members', JSON.stringify(n));
                 if (useSupabase) {
                    try {
                      await supabase.from('profiles').update({ status }).eq('id', id);
                    } catch (err) { console.error(err); }
                 }
              }} 
             />
          </motion.div>
        )}

        {/* ECOSYSTEM PUBLISH TOOLS */}
        {activeTab === 'pub-project' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-brand-border bg-brand-surface p-8">
             <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-8 border-b border-brand-border pb-4">Gallery Manager</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <input type="text" placeholder="Project Name" onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-sm outline-none"/>
                   <textarea placeholder="Narrative" onChange={e => setNewProject({...newProject, desc: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-xs outline-none min-h-[80px]"/>
                   <button onClick={() => publishContent('project', newProject)} className="w-full bg-brand-accent text-black py-4 font-mono text-xs font-bold uppercase tracking-widest">Publish to Gallery</button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar font-mono text-[10px]">
                   {projects.map(p => <div key={p.id} className="p-3 border border-brand-border bg-brand-bg uppercase">{p.title}</div>)}
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'pub-alpha' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-brand-border bg-brand-surface p-8">
             <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-8 border-b border-brand-border pb-4">Signal Transmitter</h3>
             <div className="space-y-4 max-w-xl">
                <input type="text" placeholder="Alpha Headline" onChange={e => setNewAlpha({...newAlpha, title: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-sm outline-none"/>
                <textarea placeholder="Technical Details" onChange={e => setNewAlpha({...newAlpha, content: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-3 font-mono text-xs outline-none min-h-[150px]"/>
                <button onClick={() => publishContent('alpha', newAlpha)} className="w-full bg-brand-accent text-black py-4 font-mono text-xs font-bold uppercase tracking-widest">Transmit Signal</button>
             </div>
          </motion.div>
        )}
        
        {/* ... Other publish forms can be restored if needed ... */}

        </main>
      </div>
    </div>
  );
}

function RegistryTab({ members, onStatusChange }: any) {
  // Privacy Shield: Securely scrub passwords from the display data
  const scrubData = (member: any) => {
    const scrubbed = { ...member };
    if (scrubbed.payload) {
      const { password, ...safePayload } = scrubbed.payload;
      scrubbed.payload = safePayload;
    }
    if (scrubbed.details) {
       const { password, ...safeDetails } = scrubbed.details;
       scrubbed.details = safeDetails;
    }
    delete scrubbed.password;
    return scrubbed;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-brand-border pb-4">
         <h3 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">Member Registry</h3>
         <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">{members.length} Identifiers Registered</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="py-4 font-mono text-[9px] text-brand-muted uppercase tracking-widest pl-4 underline">Member Identity</th>
              <th className="py-4 font-mono text-[9px] text-brand-muted uppercase tracking-widest underline">Intelligence Level</th>
              <th className="py-4 font-mono text-[9px] text-brand-muted uppercase tracking-widest underline">Active Signals</th>
              <th className="py-4 font-mono text-[9px] text-brand-muted uppercase tracking-widest underline">Governance</th>
            </tr>
          </thead>
          <tbody>
            {(members || []).map((m: any, i: number) => {
              const safeMember = scrubData(m);
              return (
                <tr key={m.id || i} className="border-b border-brand-border group hover:bg-brand-surface/30 transition-all">
                  <td className="py-6 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent font-black">
                        {(m.fullName || m.name)?.[0]}
                      </div>
                      <div>
                        <p className="font-sans font-bold text-sm uppercase text-white">{m.fullName || m.name}</p>
                        <p className="font-mono text-[8px] text-brand-muted uppercase tracking-tighter">{m.telegram || m.email || 'NO_HANDLE'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="font-mono text-[10px] text-brand-text uppercase px-2 py-1 bg-brand-bg border border-brand-border">{m.experience || m.details?.experience || 'Vetting Required'}</span>
                  </td>
                  <td className="py-6">
                    <div className="flex gap-1 flex-wrap">
                      {(m.signals || ['GENESIS', 'INTAKE_COMPLETE']).map((s: any, idx: number) => (
                        <span key={idx} className="font-mono text-[7px] px-1.5 py-0.5 border border-brand-muted/30 text-brand-muted uppercase font-bold tracking-widest">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 pr-4">
                    <select 
                      value={m.status || 'PENDING'} 
                      onChange={(e) => onStatusChange(m.id || i, e.target.value)}
                      className="bg-brand-bg border border-brand-border text-brand-text font-mono text-[9px] px-3 py-1.5 outline-none focus:border-brand-accent uppercase w-full"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
