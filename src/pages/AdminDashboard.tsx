import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Activity, Database, Search, ArrowUpRight, Plus, Edit2, Trash2, LayoutTemplate, FileText, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data States
  const [members, setMembers] = useState([
    { id: 1, name: 'Sarah Chen', role: 'UX/UI Designer', date: '2 hours ago', status: 'Approved', email: 'sarah@example.com' },
    { id: 2, name: 'Marcus Johnson', role: 'DeFi Strategist', date: '5 hours ago', status: 'Approved', email: 'marcus@example.com' },
    { id: 3, name: 'Elena Rodriguez', role: 'Frontend Developer', date: '1 day ago', status: 'Pending Review', email: 'elena@example.com' },
  ]);

  const [spotlight, setSpotlight] = useState({
    name: 'Sarah Chen',
    role: 'UX/UI Designer & Web3 Researcher',
    quote: 'Sarah secured a $5k grant after just 2 months of active contribution in TCC.',
    image: 'https://picsum.photos/seed/sarah/800/800?grayscale'
  });

  const [landingContent, setLandingContent] = useState({
    heroTitle: 'Web3 Community That Moves.',
    heroSubtitle: 'A decentralized platform for news, alpha, earning, and learning. Built for the next generation of builders and creators.',
    marquee: '+++ JOIN THE COMPASS +++ FIND ALPHA +++ EARN REWARDS +++ LEARN SKILLS +++'
  });

  const [forms, setForms] = useState([
    { id: 1, title: 'TCC Member Intake Form', responses: 1248, status: 'Active' },
    { id: 2, title: 'Web3 Lagos Registration', responses: 450, status: 'Active' },
    { id: 3, title: 'DeFi Hackathon Application', responses: 89, status: 'Draft' },
  ]);

  const [tutorials, setTutorials] = useState([
    { id: 1, title: 'Intro to Smart Contracts', level: 'Beginner', duration: '4 Weeks' },
    { id: 2, title: 'Advanced DeFi Mechanisms', level: 'Advanced', duration: '6 Weeks' },
  ]);

  const stats = [
    { label: 'Total Members', value: '1,248', change: '+12%', icon: Users },
    { label: 'Active Alphas', value: '24', change: '+3', icon: Shield },
    { label: 'Bounties Paid', value: '$45.2k', change: '+$12k', icon: Database },
    { label: 'Platform Engagement', value: '89%', change: '+5%', icon: Activity },
  ];

  // Handlers for mock updates
  const handleSpotlightUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Spotlight updated successfully!');
  };

  const handleLandingUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Landing page content updated successfully!');
  };

  return (
    <div className="min-h-screen pb-24 bg-brand-bg flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-brand-border bg-brand-surface pt-32 px-6 pb-12 flex flex-col">
        <div className="mb-12">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="font-sans font-black text-2xl uppercase tracking-tighter">Admin Portal</h2>
          <p className="font-mono text-xs text-brand-muted">Superuser Access</p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'members', label: 'Members', icon: Users },
            { id: 'spotlight', label: 'Spotlight', icon: Shield },
            { id: 'landing', label: 'Landing Page', icon: LayoutTemplate },
            { id: 'forms', label: 'Forms', icon: FileText },
            { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors text-left ${activeTab === tab.id ? 'bg-brand-text text-brand-bg' : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-32 px-6 lg:px-12">
        <header className="flex justify-between items-end mb-12 border-b border-brand-border pb-6">
          <div>
            <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input type="text" placeholder="Search platform..." className="bg-brand-surface border border-brand-border py-2 pl-10 pr-4 font-mono text-sm focus:outline-none focus:border-brand-accent text-brand-text" />
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="border border-brand-border bg-brand-surface p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon className="w-16 h-16" />
                  </div>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">{stat.label}</p>
                  <h3 className="font-sans font-black text-4xl mb-2">{stat.value}</h3>
                  <span className="font-mono text-xs text-green-500 bg-green-500/10 px-2 py-1">{stat.change}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="border border-brand-border bg-brand-surface">
              <div className="p-6 border-b border-brand-border flex justify-between items-center">
                <h3 className="font-sans font-black text-2xl uppercase tracking-tighter">Member Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-bg/50">
                      <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Name</th>
                      <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Email</th>
                      <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Role</th>
                      <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Status</th>
                      <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(user => (
                      <tr key={user.id} className="border-b border-brand-border hover:bg-brand-bg transition-colors">
                        <td className="p-4 font-sans font-bold">{user.name}</td>
                        <td className="p-4 font-mono text-sm text-brand-muted">{user.email}</td>
                        <td className="p-4 font-mono text-sm text-brand-muted">{user.role}</td>
                        <td className="p-4">
                          <span className={`font-mono text-xs px-2 py-1 uppercase tracking-widest ${user.status === 'Approved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="font-mono text-xs font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors flex items-center justify-end gap-1 w-full">
                            View Intake <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'spotlight' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <form onSubmit={handleSpotlightUpdate} className="border border-brand-border bg-brand-surface p-8 max-w-2xl">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Manage Spotlight</h3>
              <div className="space-y-6">
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Member Name</label>
                  <input type="text" value={spotlight.name} onChange={e => setSpotlight({...spotlight, name: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Role/Title</label>
                  <input type="text" value={spotlight.role} onChange={e => setSpotlight({...spotlight, role: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Spotlight Quote</label>
                  <textarea value={spotlight.quote} onChange={e => setSpotlight({...spotlight, quote: e.target.value})} rows={3} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Image URL</label>
                  <input type="text" value={spotlight.image} onChange={e => setSpotlight({...spotlight, image: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                </div>
                <button type="submit" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors w-full">
                  Update Spotlight
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'landing' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <form onSubmit={handleLandingUpdate} className="border border-brand-border bg-brand-surface p-8 max-w-2xl">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Landing Page Content</h3>
              <div className="space-y-6">
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Hero Title</label>
                  <textarea value={landingContent.heroTitle} onChange={e => setLandingContent({...landingContent, heroTitle: e.target.value})} rows={2} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Hero Subtitle</label>
                  <textarea value={landingContent.heroSubtitle} onChange={e => setLandingContent({...landingContent, heroSubtitle: e.target.value})} rows={3} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Marquee Text</label>
                  <input type="text" value={landingContent.marquee} onChange={e => setLandingContent({...landingContent, marquee: e.target.value})} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                </div>
                <button type="submit" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors w-full">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'forms' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter">Form Builder</h3>
              <button className="bg-brand-accent text-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create New Form
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map(form => (
                <div key={form.id} className="border border-brand-border bg-brand-surface p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`font-mono text-[10px] px-2 py-1 uppercase tracking-widest ${form.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {form.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-brand-muted hover:text-brand-text"><Edit2 className="w-4 h-4" /></button>
                      <button className="text-brand-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <h4 className="font-sans font-black text-xl uppercase tracking-tighter mb-2">{form.title}</h4>
                  <p className="font-mono text-sm text-brand-muted mb-6">{form.responses} Responses</p>
                  <button className="mt-auto border border-brand-border py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-brand-bg transition-colors">
                    View Submissions
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tutorials' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter">Training Program</h3>
              <button className="bg-brand-accent text-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Tutorial
              </button>
            </div>
            <div className="border border-brand-border bg-brand-surface">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-bg/50">
                    <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Course Title</th>
                    <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Level</th>
                    <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest">Duration</th>
                    <th className="p-4 font-mono text-xs text-brand-muted uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tutorials.map(course => (
                    <tr key={course.id} className="border-b border-brand-border hover:bg-brand-bg transition-colors">
                      <td className="p-4 font-sans font-bold">{course.title}</td>
                      <td className="p-4 font-mono text-sm text-brand-muted">{course.level}</td>
                      <td className="p-4 font-mono text-sm text-brand-muted">{course.duration}</td>
                      <td className="p-4 text-right flex justify-end gap-3">
                        <button className="text-brand-muted hover:text-brand-text"><Edit2 className="w-4 h-4" /></button>
                        <button className="text-brand-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
